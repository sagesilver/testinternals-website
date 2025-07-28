import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase-config.js'
import Header from './Header'
import Footer from './Footer'
import DarkVeil from './DarkVeil'

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Check if user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'testinternals@gmail.com') {
        // User is authenticated and has the correct email
        localStorage.setItem('adminAuthenticated', 'true')
        localStorage.setItem('adminUsername', user.displayName || user.email)
        navigate('/admin/dashboard')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      
      // Check if the user has the correct email
      if (result.user.email === 'testinternals@gmail.com') {
        localStorage.setItem('adminAuthenticated', 'true')
        localStorage.setItem('adminUsername', result.user.displayName || result.user.email)
        navigate('/admin/dashboard')
      } else {
        // Sign out the user if they don't have the correct email
        await auth.signOut()
        setError('Access Denied: Only authorised admins allowed.')
      }
    } catch (error) {
      console.error('Login error:', error)
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Login cancelled. Please try again.')
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site and try again.')
      } else {
        setError('Login failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
      {/* Background - Purple Gradient with Dark Veil */}
      <div className="absolute inset-0 w-full h-full">
        <DarkVeil 
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={1}
        />
      </div>
      
      <Header />
      
      <main className="pt-20 relative z-10">
        <section className="min-h-screen flex items-center justify-center py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Admin Login
                  </h1>
                  <p className="text-gray-300">
                    Access the blog management interface
                  </p>
                </div>

                <div className="space-y-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-100 font-medium py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-800 mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <>
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Sign in with Google
                      </>
                    )}
                  </motion.button>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="text-center">
                    <Link to="/blog" className="text-gray-300 hover:text-white transition-colors duration-200">
                      ← Back to Blog
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default AdminLogin 
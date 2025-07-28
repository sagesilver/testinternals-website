import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase-config.js'
import Header from './Header'
import Footer from './Footer'
import DarkVeil from './DarkVeil'
import MailIcon from './MailIcon'
import { getAllBlogPosts } from '../utils/blogUtils'

const AdminDashboard = () => {
  const [posts, setPosts] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUsername, setAdminUsername] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Check Firebase authentication
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'testinternals@gmail.com') {
        setIsAuthenticated(true)
        setAdminUsername(user.displayName || user.email)
        // Load posts
        const allPosts = getAllBlogPosts()
        setPosts(allPosts)
      } else {
        // Clear any existing local storage
        localStorage.removeItem('adminAuthenticated')
        localStorage.removeItem('adminUsername')
        navigate('/admin/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('adminAuthenticated')
      localStorage.removeItem('adminUsername')
      navigate('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Still clear local storage and redirect even if Firebase logout fails
      localStorage.removeItem('adminAuthenticated')
      localStorage.removeItem('adminUsername')
      navigate('/admin/login')
    }
  }

  const handleDeletePost = (slug) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      // TODO: Implement actual deletion logic
      alert('Post deletion would be implemented here. For now, this is a demo.')
    }
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
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
        <section className="py-20">
          <div className="container-custom">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-300">
                    Welcome back, {adminUsername}. Manage your blog posts here.
                  </p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <Link
                    to="/admin/new-post"
                    className="btn-primary text-lg px-6 py-3"
                  >
                    + New Post
                  </Link>
                  <Link
                    to="/admin/newsletter"
                    className="btn-primary text-lg px-6 py-3 flex items-center gap-2"
                  >
                    <MailIcon width="20px" height="20px" />
                    Newsletter
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary text-lg px-6 py-3 border-red-500 text-red-300 hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Posts</p>
                    <p className="text-3xl font-bold text-white">{posts.length}</p>
                  </div>
                  <div className="text-4xl">📝</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Categories</p>
                    <p className="text-3xl font-bold text-white">
                      {new Set(posts.map(post => post.frontmatter.category)).size}
                    </p>
                  </div>
                  <div className="text-4xl">🏷️</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Tags</p>
                    <p className="text-3xl font-bold text-white">
                      {new Set(posts.flatMap(post => post.frontmatter.tags || [])).size}
                    </p>
                  </div>
                  <div className="text-4xl">🏷️</div>
                </div>
              </div>
            </motion.div>

            {/* Posts Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden"
            >
              <div className="p-6 border-b border-white/20">
                <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-medium">Title</th>
                      <th className="px-6 py-4 text-left text-white font-medium">Category</th>
                      <th className="px-6 py-4 text-left text-white font-medium">Date</th>
                      <th className="px-6 py-4 text-left text-white font-medium">Tags</th>
                      <th className="px-6 py-4 text-center text-white font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <motion.tr
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{post.frontmatter.title}</p>
                            <p className="text-gray-400 text-sm">{post.frontmatter.excerpt.substring(0, 60)}...</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm bg-primary-900/50 text-primary-300 px-3 py-1 rounded-full">
                            {post.frontmatter.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {post.frontmatter.date}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {post.frontmatter.tags?.slice(0, 2).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs bg-gray-800/80 text-gray-300 px-2 py-1 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                            {post.frontmatter.tags?.length > 2 && (
                              <span className="text-xs text-gray-500">+{post.frontmatter.tags.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              to={`/admin/edit/${post.slug}`}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeletePost(post.slug)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              Delete
                            </button>
                            <Link
                              to={`/blog/${post.slug}`}
                              className="text-gray-400 hover:text-gray-300 transition-colors"
                              target="_blank"
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/admin/new-post"
                className="btn-primary text-lg px-8 py-4 text-center"
              >
                Create New Post
              </Link>
              <Link
                to="/admin/newsletter"
                className="btn-primary text-lg px-8 py-4 text-center flex items-center justify-center gap-2"
              >
                <MailIcon width="20px" height="20px" />
                Manage Newsletter
              </Link>
              <Link
                to="/blog"
                className="btn-secondary text-lg px-8 py-4 text-center"
              >
                View Public Blog
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default AdminDashboard 
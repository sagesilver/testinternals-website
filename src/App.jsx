import { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import AISolutions from './components/AISolutions'
import TestUtilities from './components/TestUtilities'
import About from './components/About'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BlogIndex from './components/BlogIndex'
import BlogPost from './components/BlogPost'
import BlogManager from './components/BlogManager'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import AdminPostEditor from './components/AdminPostEditor'
import NewsletterAdmin from './components/NewsletterAdmin'
import { getBlogPostBySlug } from './utils/blogUtils'

// Move HomePage outside of App to prevent recreation on every render
const HomePage = ({ isScrolled }) => (
  <div className="min-h-screen bg-white">
    <Header isScrolled={isScrolled} />
    
    <main>
      <Hero />
      <Services />
      <AISolutions />
      <TestUtilities />
      <About />
      <Blog />
      <Contact />
    </main>
    
    <Footer />
  </div>
)

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50
          setIsScrolled(scrolled)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Memoize the HomePage to prevent unnecessary re-renders
  const memoizedHomePage = useMemo(() => <HomePage isScrolled={isScrolled} />, [isScrolled])

      return (
    <Router>
      <Routes>
        <Route path="/" element={memoizedHomePage} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/new" element={<BlogManager />} />
        <Route path="/blog/edit/:slug" element={<BlogManager />} />
        <Route 
          path="/blog/:slug" 
          element={<BlogPostWrapper />} 
        />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/new-post" element={<AdminPostEditor />} />
        <Route path="/admin/edit/:slug" element={<AdminPostEditor />} />
        <Route path="/admin/newsletter" element={<NewsletterAdmin />} />
      </Routes>
    </Router>
  )
}

function BlogPostWrapper() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)
  return <BlogPost post={post} />
}

export default App 
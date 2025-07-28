import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase-config.js'
import Header from './Header'
import Footer from './Footer'
import DarkVeil from './DarkVeil'
import { getAllBlogPosts, getBlogPostBySlug } from '../utils/blogUtils'

const AdminPostEditor = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'AI & Automation',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    featuredImage: '',
    tags: [],
    content: ''
  })

  const [newTag, setNewTag] = useState('')

  const categories = ['AI & Automation', 'Automation', 'Performance']
  const availableImages = [
    '/AI testing blog graphic.png',
    '/ai testing blog graphic 2.png', 
    '/ai testing blog graphic 3.png'
  ]

  useEffect(() => {
    // Check Firebase authentication
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'testinternals@gmail.com') {
        setIsAuthenticated(true)
        
        // If editing, load existing post data
        if (slug && slug !== 'new') {
          setIsEditing(true)
          const existingPost = getBlogPostBySlug(slug)
          if (existingPost) {
            setFormData({
              title: existingPost.frontmatter.title,
              excerpt: existingPost.frontmatter.excerpt,
              category: existingPost.frontmatter.category,
              date: existingPost.frontmatter.date,
              readTime: existingPost.frontmatter.readTime,
              featuredImage: existingPost.frontmatter.featuredImage || '',
              tags: existingPost.frontmatter.tags || [],
              content: existingPost.content
            })
          }
        }
      } else {
        navigate('/admin/login')
      }
    })

    return () => unsubscribe()
  }, [slug, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Implement actual save logic
    setTimeout(() => {
      alert(isEditing ? 'Post updated successfully!' : 'Post created successfully!')
      setIsLoading(false)
      navigate('/admin/dashboard')
    }, 1000)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      // TODO: Implement actual deletion logic
      alert('Post deleted successfully!')
      navigate('/admin/dashboard')
    }
  }

  if (!isAuthenticated) {
    return null
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
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {isEditing ? 'Edit Post' : 'Create New Post'}
                  </h1>
                  <p className="text-gray-300">
                    {isEditing ? 'Update your blog post content and metadata' : 'Create a new blog post with rich content'}
                  </p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                  {isEditing && (
                    <button
                      onClick={handleDelete}
                      className="btn-secondary text-lg px-6 py-3 border-red-500 text-red-300 hover:bg-red-500 hover:text-white"
                    >
                      Delete Post
                    </button>
                  )}
                  <Link
                    to="/admin/dashboard"
                    className="btn-secondary text-lg px-6 py-3"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-white font-medium mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter post title"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-white font-medium mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-white font-medium mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="readTime" className="block text-white font-medium mb-2">
                      Read Time
                    </label>
                    <input
                      type="text"
                      id="readTime"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="e.g., 5 min read"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-white font-medium mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm resize-none"
                    placeholder="Brief description of the post..."
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label htmlFor="featuredImage" className="block text-white font-medium mb-2">
                    Featured Image
                  </label>
                  <select
                    id="featuredImage"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
                  >
                    <option value="">No image</option>
                    {availableImages.map(image => (
                      <option key={image} value={image}>{image}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary-900/50 text-primary-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-primary-200 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="Add a tag..."
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-white font-medium mb-2">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={20}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm resize-none font-mono text-sm"
                    placeholder="Write your blog post content in Markdown format..."
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Use Markdown formatting for rich content. Supports headers, lists, links, code blocks, and more.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6 border-t border-white/20">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </div>
                    ) : (
                      isEditing ? 'Update Post' : 'Create Post'
                    )}
                  </motion.button>
                  
                  <Link
                    to="/admin/dashboard"
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default AdminPostEditor 
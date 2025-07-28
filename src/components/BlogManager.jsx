import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import DarkVeil from './DarkVeil';
import { getAllBlogPosts, getBlogPostBySlug, generateSlug } from '../utils/blogUtils';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'TestInternals Team',
    category: 'Testing',
    tags: [],
    featuredImage: '📝'
  });
  const [newTag, setNewTag] = useState('');
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const allPosts = getAllBlogPosts();
    setPosts(allPosts);

    if (slug && slug !== 'new') {
      const post = getBlogPostBySlug(slug);
      if (post) {
        setCurrentPost({
          title: post.frontmatter.title,
          excerpt: post.frontmatter.excerpt,
          content: post.content,
          author: post.frontmatter.author,
          category: post.frontmatter.category,
          tags: post.frontmatter.tags || [],
          featuredImage: post.frontmatter.featuredImage || '📝'
        });
        setIsEditing(true);
      }
    }
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !currentPost.tags.includes(newTag.trim())) {
      setCurrentPost(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setCurrentPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const postSlug = isEditing ? slug : generateSlug(currentPost.title);
    const postData = {
      ...currentPost,
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.ceil(currentPost.content.split(/\s+/).length / 200)} min read`
    };

    // In a real implementation, this would save to a file or API
    // For now, we'll just navigate back to the blog
    console.log('Saving post:', { slug: postSlug, ...postData });
    
    // Simulate save
    alert(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
    navigate('/blog');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      // In a real implementation, this would delete the file or API call
      console.log('Deleting post:', slug);
      alert('Post deleted successfully!');
      navigate('/blog');
    }
  };

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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900/80 to-blue-900/80 text-white py-16 backdrop-blur-sm">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h1>
              <p className="text-xl text-gray-200">
                {isEditing ? 'Update your blog post content and metadata' : 'Share your insights with the testing community'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={currentPost.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Enter the blog post title..."
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={currentPost.excerpt}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Brief description of the blog post..."
                  />
                </div>

                {/* Author */}
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={currentPost.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Author name..."
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={currentPost.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white"
                  >
                    <option value="Testing">Testing</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Automation">Automation</option>
                    <option value="Performance">Performance</option>
                    <option value="Security">Security</option>
                    <option value="Best Practices">Best Practices</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {currentPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-900/50 text-blue-300 border border-blue-700"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-blue-400 hover:text-blue-300"
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
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1 px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                      placeholder="Add a tag..."
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Featured Image */}
                <div>
                  <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-300 mb-2">
                    Featured Image (Emoji)
                  </label>
                  <input
                    type="text"
                    id="featuredImage"
                    name="featuredImage"
                    value={currentPost.featuredImage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                    placeholder="📝"
                  />
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                    Content (Markdown) *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={currentPost.content}
                    onChange={handleInputChange}
                    required
                    rows={20}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400 font-mono text-sm"
                    placeholder="# Your blog post content in Markdown format...

## Introduction
Start your blog post here...

## Main Content
Add your main content here...

## Conclusion
Wrap up your post here..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
                  <button
                    type="submit"
                    className="btn-primary text-lg px-8 py-4"
                  >
                    {isEditing ? 'Update Post' : 'Create Post'}
                  </button>
                  
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="btn-secondary text-lg px-8 py-4 bg-red-600 hover:bg-red-700"
                    >
                      Delete Post
                    </button>
                  )}
                  
                  <Link
                    to="/blog"
                    className="btn-secondary text-lg px-8 py-4 text-center"
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
  );
};

export default BlogManager; 
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SpotlightCard from './SpotlightCard';
import Header from './Header';
import Footer from './Footer';
import DarkVeil from './DarkVeil';
import NewsletterSignup from './NewsletterSignup';
import { getAllBlogPosts, getAllCategories, getAllTags } from '../utils/blogUtils';

const BlogIndex = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const allPosts = getAllBlogPosts();
    const allCategories = getAllCategories();
    const allTags = getAllTags();
    
    setPosts(allPosts);
    setFilteredPosts(allPosts);
    setCategories(allCategories);
    setTags(allTags);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.frontmatter.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.frontmatter.tags && post.frontmatter.tags.includes(selectedTag)
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.frontmatter.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.frontmatter.tags && post.frontmatter.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, selectedTag, searchTerm]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTag('');
    setSearchTerm('');
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
        <section className="bg-gradient-to-br from-gray-900/80 to-blue-900/80 text-white py-20 backdrop-blur-sm">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Latest Insights
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Stay updated with the latest trends, best practices, and insights in software testing and quality assurance
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-gray-900/50 backdrop-blur-sm">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
                             {/* Categories */}
               <div className="flex flex-wrap gap-2">
                 <span className="text-sm font-medium text-gray-300">Categories:</span>
                 <button
                   onClick={() => setSelectedCategory('')}
                   className={`text-sm px-3 py-1 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                     selectedCategory === '' 
                       ? 'bg-sky-900/90 text-sky-200 shadow-lg shadow-sky-400/30 border border-sky-400/40' 
                       : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:shadow-lg hover:shadow-gray-500/20 border border-gray-600/30'
                   }`}
                 >
                   All
                 </button>
                 {categories.map((category) => {
                   const categoryColors = {
                     'AI & Automation': 'bg-emerald-900/90 text-emerald-200 shadow-lg shadow-emerald-400/30 border border-emerald-400/40',
                     'Automation': 'bg-violet-900/90 text-violet-200 shadow-lg shadow-violet-400/30 border border-violet-400/40',
                     'Performance': 'bg-sky-900/90 text-sky-200 shadow-lg shadow-sky-400/30 border border-sky-400/40'
                   };
                   const colorClass = categoryColors[category] || 'bg-cyan-900/90 text-cyan-200 shadow-lg shadow-cyan-400/30 border border-cyan-400/40';
                   
                   return (
                     <button
                       key={category}
                       onClick={() => setSelectedCategory(category)}
                       className={`text-sm px-3 py-1 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                         selectedCategory === category 
                           ? colorClass
                           : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:shadow-lg hover:shadow-gray-500/20 border border-gray-600/30'
                       }`}
                     >
                       {category}
                     </button>
                   );
                 })}
               </div>

               {/* Tags */}
               <div className="flex flex-wrap gap-2">
                 <span className="text-sm font-medium text-gray-300">Tags:</span>
                 <button
                   onClick={() => setSelectedTag('')}
                   className={`text-sm px-3 py-1 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                     selectedTag === '' 
                       ? 'bg-amber-900/90 text-amber-200 shadow-lg shadow-amber-400/30 border border-amber-400/40' 
                       : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:shadow-lg hover:shadow-gray-500/20 border border-gray-600/30'
                   }`}
                 >
                   All
                 </button>
                 {tags.slice(0, 5).map((tag) => {
                   const tagColorMap = {
                     'AI': 'bg-emerald-900/90 text-emerald-200 shadow-lg shadow-emerald-400/30 border border-emerald-400/40',
                     'Testing': 'bg-cyan-900/90 text-cyan-200 shadow-lg shadow-cyan-400/30 border border-cyan-400/40',
                     'Automation': 'bg-violet-900/90 text-violet-200 shadow-lg shadow-violet-400/30 border border-violet-400/40',
                     'Quality Assurance': 'bg-rose-900/90 text-rose-200 shadow-lg shadow-rose-400/30 border border-rose-400/40',
                     'Frameworks': 'bg-amber-900/90 text-amber-200 shadow-lg shadow-amber-400/30 border border-amber-400/40',
                     'Best Practices': 'bg-indigo-900/90 text-indigo-200 shadow-lg shadow-indigo-400/30 border border-indigo-400/40',
                     'Scalability': 'bg-fuchsia-900/90 text-fuchsia-200 shadow-lg shadow-fuchsia-400/30 border border-fuchsia-400/40',
                     'Performance': 'bg-sky-900/90 text-sky-200 shadow-lg shadow-sky-400/30 border border-sky-400/40',
                     'Cloud': 'bg-orange-900/90 text-orange-200 shadow-lg shadow-orange-400/30 border border-orange-400/40'
                   };
                   const colorClass = tagColorMap[tag] || 'bg-cyan-900/90 text-cyan-200 shadow-lg shadow-cyan-400/30 border border-cyan-400/40';
                   
                   return (
                     <button
                       key={tag}
                       onClick={() => setSelectedTag(tag)}
                       className={`text-sm px-3 py-1 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                         selectedTag === tag 
                           ? colorClass
                           : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:shadow-lg hover:shadow-gray-500/20 border border-gray-600/30'
                       }`}
                     >
                       #{tag}
                     </button>
                   );
                 })}
               </div>

              {/* Clear Filters */}
              {(selectedCategory || selectedTag || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-400 hover:text-blue-300 underline"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
          <div className="container-custom">
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  No posts found
                </h3>
                <p className="text-gray-300 mb-6">
                  Try adjusting your search terms or filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-8"
                >
                  <p className="text-gray-300">
                    Showing {filteredPosts.length} of {posts.length} posts
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      className="group"
                    >
                      <Link to={`/blog/${post.slug}`}>
                        <SpotlightCard 
                          className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800/50 overflow-hidden h-full"
                          spotlightColor="rgba(90, 67, 128, 0.5)"
                        >
                          {/* Image Placeholder */}
                          <div className="h-48 bg-gradient-to-br from-primary-900/50 to-blue-900/50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                            {post.frontmatter.featuredImage && post.frontmatter.featuredImage.startsWith('/') ? (
                              <img 
                                src={post.frontmatter.featuredImage} 
                                alt={post.frontmatter.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <span>{post.frontmatter.featuredImage || '📝'}</span>
                            )}
                          </div>
                          
                          <div className="p-6 flex-1 flex flex-col">
                            {/* Meta */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-primary-300 bg-primary-900/30 px-3 py-1 rounded-full">
                                {post.frontmatter.category}
                              </span>
                              <span className="text-sm text-gray-400">{post.frontmatter.readTime}</span>
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300 line-clamp-2 flex-1">
                              {post.frontmatter.title}
                            </h3>
                            
                            {/* Excerpt */}
                            <p className="text-gray-200 mb-4 line-clamp-3">
                              {post.frontmatter.excerpt}
                            </p>
                            
                            {/* Date and Tags */}
                            <div className="mt-auto">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">{post.frontmatter.date}</span>
                                <span className="text-primary-400 font-medium group-hover:text-primary-300 transition-colors duration-200">
                                  Read More →
                                </span>
                              </div>
                              
                              {/* Tags */}
                              {post.frontmatter.tags && (
                                <div className="flex flex-wrap gap-2">
                                  {post.frontmatter.tags.slice(0, 3).map((tag, tagIndex) => {
                                    // Create unique color combinations based on tag content
                                    const tagColorMap = {
                                      'AI': 'bg-emerald-900/90 text-emerald-200 shadow-lg shadow-emerald-400/30 border border-emerald-400/40',
                                      'Testing': 'bg-cyan-900/90 text-cyan-200 shadow-lg shadow-cyan-400/30 border border-cyan-400/40',
                                      'Automation': 'bg-violet-900/90 text-violet-200 shadow-lg shadow-violet-400/30 border border-violet-400/40',
                                      'Quality Assurance': 'bg-rose-900/90 text-rose-200 shadow-lg shadow-rose-400/30 border border-rose-400/40',
                                      'Frameworks': 'bg-amber-900/90 text-amber-200 shadow-lg shadow-amber-400/30 border border-amber-400/40',
                                      'Best Practices': 'bg-indigo-900/90 text-indigo-200 shadow-lg shadow-indigo-400/30 border border-indigo-400/40',
                                      'Scalability': 'bg-fuchsia-900/90 text-fuchsia-200 shadow-lg shadow-fuchsia-400/30 border border-fuchsia-400/40',
                                      'Performance': 'bg-sky-900/90 text-sky-200 shadow-lg shadow-sky-400/30 border border-sky-400/40',
                                      'Cloud': 'bg-orange-900/90 text-orange-200 shadow-lg shadow-orange-400/30 border border-orange-400/40'
                                    };
                                    
                                    const colorClass = tagColorMap[tag] || [
                                      'bg-emerald-900/90 text-emerald-200 shadow-lg shadow-emerald-400/30 border border-emerald-400/40',
                                      'bg-cyan-900/90 text-cyan-200 shadow-lg shadow-cyan-400/30 border border-cyan-400/40',
                                      'bg-violet-900/90 text-violet-200 shadow-lg shadow-violet-400/30 border border-violet-400/40',
                                      'bg-rose-900/90 text-rose-200 shadow-lg shadow-rose-400/30 border border-rose-400/40',
                                      'bg-amber-900/90 text-amber-200 shadow-lg shadow-amber-400/30 border border-amber-400/40',
                                      'bg-indigo-900/90 text-indigo-200 shadow-lg shadow-indigo-400/30 border border-indigo-400/40',
                                      'bg-fuchsia-900/90 text-fuchsia-200 shadow-lg shadow-fuchsia-400/30 border border-fuchsia-400/40',
                                      'bg-sky-900/90 text-sky-200 shadow-lg shadow-sky-400/30 border border-sky-400/40',
                                      'bg-orange-900/90 text-orange-200 shadow-lg shadow-orange-400/30 border border-orange-400/40'
                                    ][tagIndex % 9];
                                    
                                    return (
                                      <span
                                        key={tagIndex}
                                        className={`text-xs px-3 py-1 rounded-full font-medium ${colorClass} transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-2xl`}
                                      >
                                        #{tag}
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </SpotlightCard>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gray-900/50 backdrop-blur-sm py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center max-w-2xl mx-auto"
            >
              <SpotlightCard 
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
                spotlightColor="rgba(90, 67, 128, 0.5)"
              >
                <NewsletterSignup />
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <button 
                    onClick={() => window.location.href = '/#contact'} 
                    className="btn-primary text-lg px-8 py-4"
                  >
                    Contact Us
                  </button>
                  <Link to="/" className="btn-secondary text-lg px-8 py-4">
                    Back to Home
                  </Link>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogIndex; 
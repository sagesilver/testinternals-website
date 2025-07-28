import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SpotlightCard from './SpotlightCard'
import NewsletterSignup from './NewsletterSignup'
import { getRecentBlogPosts } from '../utils/blogUtils'
import { useEffect, useState } from 'react'

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    const recentPosts = getRecentBlogPosts(3)
    setBlogPosts(recentPosts)
  }, [])

  return (
    <section id="blog" className="section-padding" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Stay updated with the latest trends, best practices, and insights in software testing and quality assurance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`}>
                <SpotlightCard 
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800/50 overflow-hidden"
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
                  
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-blue-300 bg-blue-900/50 px-3 py-1 rounded-full shadow-lg shadow-blue-500/20 border border-blue-500/30">
                        {post.frontmatter.category}
                      </span>
                      <span className="text-sm text-gray-400">{post.frontmatter.readTime}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300 line-clamp-2">
                      {post.frontmatter.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-200 mb-4 line-clamp-3">
                      {post.frontmatter.excerpt}
                    </p>
                    
                                         {/* Tags */}
                     {post.frontmatter.tags && (
                       <div className="flex flex-wrap gap-2 mb-4">
                         {post.frontmatter.tags.slice(0, 2).map((tag, tagIndex) => {
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
                    
                    {/* Date */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{post.frontmatter.date}</span>
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="text-primary-400 font-medium group-hover:text-primary-300 transition-colors duration-200"
                      >
                        Read More →
                      </motion.span>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
                     <SpotlightCard 
                       className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
                       spotlightColor="rgba(90, 67, 128, 0.5)"
                     >
             <NewsletterSignup />
             
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/blog" className="btn-primary text-lg px-8 py-4">
                View All Posts
              </Link>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog 
import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'

const Blog = () => {
  const blogPosts = [
    {
      title: 'The Future of AI in Software Testing',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we approach software testing and quality assurance.',
      image: '🤖',
      date: 'December 15, 2024',
      readTime: '5 min read',
      category: 'AI & Automation'
    },
    {
      title: 'Building Effective Test Automation Frameworks',
      excerpt: 'Best practices for creating scalable and maintainable test automation frameworks that grow with your application.',
      image: '⚙️',
      date: 'December 10, 2024',
      readTime: '8 min read',
      category: 'Automation'
    },
    {
      title: 'Performance Testing in the Cloud Era',
      excerpt: 'How cloud-native applications are changing the landscape of performance testing and what you need to know.',
      image: '☁️',
      date: 'December 5, 2024',
      readTime: '6 min read',
      category: 'Performance'
    }
  ]

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
              key={index}
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
              <SpotlightCard 
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800/50 overflow-hidden"
                spotlightColor="rgba(90, 67, 128, 0.5)"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-900/50 to-blue-900/50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {post.image}
                </div>
                
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary-300 bg-primary-900/30 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-400">{post.readTime}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-gray-200 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Date */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{post.date}</span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-primary-400 font-medium hover:text-primary-300 transition-colors duration-200"
                    >
                      Read More →
                    </motion.button>
                  </div>
                </div>
              </SpotlightCard>
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
             <h3 className="text-2xl font-bold text-white mb-4">
               Stay Updated with Our Insights
             </h3>
             <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
               Get the latest testing insights, industry trends, and best practices delivered to your inbox.
             </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                View All Posts
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Subscribe to Newsletter
              </button>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog 
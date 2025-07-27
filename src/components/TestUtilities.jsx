import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'

const TestUtilities = () => {
  const utilities = [
    {
      title: 'Test Data Generators',
      description: 'Intelligent data generation tools that create realistic test scenarios and edge cases.',
      icon: '📊',
      features: ['Realistic test data', 'Edge case generation', 'Data masking', 'Bulk data creation']
    },
    {
      title: 'Automated Validation Scripts',
      description: 'Pre-built validation frameworks that ensure consistent and reliable test execution.',
      icon: '✅',
      features: ['Cross-browser validation', 'API response validation', 'UI element verification', 'Performance validation']
    },
    {
      title: 'Monitoring Dashboards',
      description: 'Real-time dashboards that provide insights into test execution and system health.',
      icon: '📈',
      features: ['Real-time metrics', 'Test execution tracking', 'Performance monitoring', 'Alert systems']
    },
    {
      title: 'Utility Tools for Testers',
      description: 'Specialized tools designed to streamline common testing tasks and workflows.',
      icon: '🛠️',
      features: ['Test case management', 'Bug reporting tools', 'Environment setup', 'Test automation helpers']
    }
  ]

  return (
    <section id="test-utilities" className="section-padding" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Custom Tools That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400">
              Accelerate Testing
            </span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Our bespoke utility development creates specialized tools that transform your testing process, 
            making it faster, more efficient, and more reliable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {utilities.map((utility, index) => (
            <motion.div
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
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800/50"
                spotlightColor="rgba(90, 67, 128, 0.5)"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {utility.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">
                      {utility.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {utility.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {utility.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-200 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
                     <SpotlightCard 
                       className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
                       spotlightColor="rgba(90, 67, 128, 0.5)"
                     >
             <h3 className="text-2xl font-bold text-white mb-4">
               Ready to Accelerate Your Testing?
             </h3>
             <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
               Let us build custom utilities tailored to your specific testing needs and workflows.
             </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Request Custom Tools
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                View Tool Examples
              </button>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  )
}

export default TestUtilities 
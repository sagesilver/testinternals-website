import { motion } from 'framer-motion'
import SpotlightCard from './SpotlightCard'

const Services = () => {
  const services = [
    {
      title: 'Test Team & Resource Provisioning',
      description: 'Expert testing teams and resources to scale your testing capabilities.',
      icon: '👥',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'AI-Augmented Test Automation',
      description: 'Intelligent automation that learns and adapts to your application.',
      icon: '🤖',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Functional & Regression Testing',
      description: 'Comprehensive test coverage and depth to ensure your software works flawlessly.',
      icon: '🔍',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Performance Engineering',
      description: 'Optimize your application for speed, scalability, and reliability.',
      icon: '⚡',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Security Testing',
      description: 'Identify vulnerabilities before they become security threats.',
      icon: '🔒',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Test Utilities & Automation Tools',
      description: 'Custom tools and utilities to accelerate your testing process.',
      icon: '🛠️',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'UAT Coordination',
      description: 'Streamlined user acceptance testing coordination and management.',
      icon: '✅',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Release & Deployment Management',
      description: 'Seamless release processes with comprehensive testing integration.',
      icon: '🚀',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="services" className="section-padding" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive testing solutions that combine traditional expertise with cutting-edge AI technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
                              <SpotlightCard 
                  className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-600/50"
                  spotlightColor="rgba(90, 67, 128, 0.5)"
                >
                                                   {service.title === 'Test Team & Resource Provisioning' ? (
                    <div className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <lord-icon
                        src="https://cdn.lordicon.com/wyaqzesp.json"
                        trigger="hover"
                        style={{ width: '70px', height: '70px', display: 'block', margin: '0 auto' }}
                      />
                    </div>
                  ) : service.title === 'AI-Augmented Test Automation' ? (
                    <div className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <lord-icon
                        src="https://cdn.lordicon.com/noncoqhc.json"
                        trigger="hover"
                        style={{ width: '70px', height: '70px', display: 'block', margin: '0 auto' }}
                      />
                    </div>
                  ) : service.title === 'Functional & Regression Testing' ? (
                    <div className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <lord-icon
                        src="https://cdn.lordicon.com/iiudwewg.json"
                        trigger="hover"
                        style={{ width: '70px', height: '70px', display: 'block', margin: '0 auto' }}
                      />
                    </div>
                  ) : service.title === 'Performance Engineering' ? (
                    <div className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <lord-icon
                        src="https://cdn.lordicon.com/utdckhgo.json"
                        trigger="hover"
                        style={{ width: '70px', height: '70px', display: 'block', margin: '0 auto' }}
                      />
                    </div>
                  ) : service.title === 'Security Testing' ? (
                    <div className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <lord-icon
                        src="https://cdn.lordicon.com/wepoiyzv.json"
                        trigger="hover"
                        style={{ width: '70px', height: '70px', display: 'block', margin: '0 auto' }}
                      />
                    </div>
                  ) : service.title === 'Test Utilities & Automation Tools' ? (
                    <div className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <lord-icon
                        src="https://cdn.lordicon.com/vgxjrbxm.json"
                        trigger="hover"
                        style={{ width: '70px', height: '70px', display: 'block', margin: '0 auto' }}
                      />
                    </div>
                  ) : service.title === 'UAT Coordination' ? (
                    <div className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <lord-icon
                        src="https://cdn.lordicon.com/aksvbzmu.json"
                        trigger="hover"
                        style={{ width: '70px', height: '70px', display: 'block', margin: '0 auto' }}
                      />
                    </div>
                  ) : service.title === 'Release & Deployment Management' ? (
                    <div className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                      <lord-icon
                        src="https://cdn.lordicon.com/jgeruqwm.json"
                        trigger="hover"
                        style={{ width: '70px', height: '70px', display: 'block', margin: '0 auto' }}
                      />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                  )}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {service.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="mailto:admin@testinternals.com" className="btn-primary text-lg px-8 py-4">
            Explore All Services
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 
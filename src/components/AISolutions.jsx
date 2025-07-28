import { motion } from 'framer-motion'
import { useEffect } from 'react'

const AISolutions = () => {
  useEffect(() => {
    // Load Lordicon script if not already loaded
    if (!window.lordIcon) {
      const script = document.createElement('script')
      script.src = 'https://cdn.lordicon.com/lordicon.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])
  const aiFeatures = [
    {
      title: 'Model-driven test generation',
      description: 'AI models that automatically generate comprehensive test cases based on your application requirements.',
      icon: 'https://cdn.lordicon.com/bkzrrccj.json'
    },
    {
      title: 'Autonomous regression cycles',
      description: 'Self-learning systems that continuously improve test coverage and identify regression issues.',
      icon: 'https://cdn.lordicon.com/vysppwvq.json'
    },
    {
      title: 'Requirements-to-test-case conversion',
      description: 'Instant conversion of business requirements into executable test scenarios.',
      icon: 'https://cdn.lordicon.com/zcpmxjfa.json'
    },
    {
      title: 'AI-assisted risk prioritisation',
      description: 'Intelligent analysis to prioritize testing efforts based on risk assessment and impact analysis.',
      icon: 'https://cdn.lordicon.com/rpvomrgr.json'
    }
  ]

  return (
    <section id="ai-solutions" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 border border-primary-400/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 border border-blue-400/20 rounded-full"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Where AI Meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-blue-300">
                Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Our AI-powered testing solutions combine decades of testing wisdom with cutting-edge artificial intelligence to deliver unprecedented efficiency and accuracy.
            </p>
            
            <div className="space-y-6">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    {feature.icon.startsWith('http') ? (
                      <lord-icon
                        src={feature.icon}
                        trigger="hover"
                        style={{ width: '40px', height: '40px' }}
                      />
                    ) : (
                      <span className="text-2xl">{feature.icon}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <button className="btn-primary text-lg px-8 py-4">
                Learn More About AI Solutions
              </button>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
                                       <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-sky-500/80 shadow-2xl shadow-sky-500/30"
              >
                <img 
                  src="/ai powered engine.png" 
                  alt="AI Powered Testing Engine"
                  className="w-full h-full object-cover border-2 border-sky-400/60"
                />
              </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AISolutions 
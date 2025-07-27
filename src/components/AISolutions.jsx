import { motion } from 'framer-motion'

const AISolutions = () => {
  const aiFeatures = [
    {
      title: 'Model-driven test generation',
      description: 'AI models that automatically generate comprehensive test cases based on your application requirements.',
      icon: '🧠'
    },
    {
      title: 'Autonomous regression cycles',
      description: 'Self-learning systems that continuously improve test coverage and identify regression issues.',
      icon: '🔄'
    },
    {
      title: 'Requirements-to-test-case conversion',
      description: 'Instant conversion of business requirements into executable test scenarios.',
      icon: '📋'
    },
    {
      title: 'AI-assisted risk prioritisation',
      description: 'Intelligent analysis to prioritize testing efforts based on risk assessment and impact analysis.',
      icon: '⚖️'
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
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-2xl">
                    {feature.icon}
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
              className="mt-8"
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
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-4 bg-gradient-to-r from-primary-400 to-blue-400 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="w-3/4 h-4 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="w-5/6 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                />
              </div>
              
              <div className="mt-8 text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  AI-Powered Testing Engine
                </h3>
                <p className="text-gray-300">
                  Continuously learning and improving
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AISolutions 
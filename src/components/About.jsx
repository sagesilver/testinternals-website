import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="section-padding" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Who We Are
            </h2>
            <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
              <p>
                TestInternals is a Melbourne-based consultancy with deep roots in traditional and agile delivery methodologies. 
                We've built our reputation on delivering exceptional testing outcomes for organizations of all sizes.
              </p>
              <p>
                Trusted by major enterprises and nimble startups alike, we understand that every organization has unique 
                testing challenges and requirements. Our approach is always tailored to your specific needs and constraints.
              </p>
                             <p>
                 We're focused on outcomes, risk management, and delivery. Every testing solution we deliver is designed 
                 to not just find bugs, but to safeguard your business outcomes and protect your reputation.
               </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6 mt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">20+</div>
                <div className="text-sm text-gray-300">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">35+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-2">100k</div>
                <div className="text-sm text-gray-300">Test Cases</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quote Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 border border-white/20 rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-6">💬</div>
                <blockquote className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
                  "We don't just test software. We safeguard outcomes."
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-400 to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">TI</span>
                  </div>
                  <div>
                    <div className="font-semibold">TestInternals Team</div>
                    <div className="text-gray-300 text-sm">Melbourne, Australia</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-primary-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-60"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
                     <h3 className="text-3xl font-bold text-white text-center mb-12">
             Our Core Values
           </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We strive for excellence in every testing engagement, ensuring the highest quality outcomes.',
                icon: '⭐'
              },
              {
                title: 'Innovation',
                description: 'We embrace cutting-edge technologies and methodologies to deliver superior results.',
                icon: '🚀'
              },
                             {
                 title: 'Integrity',
                 description: 'We maintain the highest standards of professional integrity and ethical conduct.',
                 icon: '🤝'
               }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                                 <h4 className="text-xl font-semibold text-white mb-3">{value.title}</h4>
                 <p className="text-gray-200">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 
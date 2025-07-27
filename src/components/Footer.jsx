import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
    { name: 'Terms', href: '#' },
    { name: 'Privacy', href: '#' }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'X (Twitter)', icon: '🐦', href: '#' },
    { name: 'Instagram', icon: '📷', href: '#' }
  ]

  return (
    <footer className="text-white" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start mb-4">
                          <img 
              src="/logo.png" 
              alt="TestInternals Logo" 
              style={{ height: '53px', width: 'auto' }}
              className="md:hidden"
            />
            <img 
              src="/logo.png" 
              alt="TestInternals Logo" 
              style={{ height: '63px', width: 'auto' }}
              className="hidden md:block"
            />
            </div>
                         <p className="text-gray-400">
               © {currentYear} testinternals ™. All rights reserved.
             </p>
          </motion.div>

          {/* Center - Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <nav className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Right - Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2
                  }}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-lg transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-700"
        >
          <div className="text-center text-gray-400 text-sm">
                         <p>
               testinternals ™ is wholly owned product of Sagesilver Pty Ltd (ABN: 50096086821)
             </p>
            <p className="mt-2">
              Built with React, Vite, and Tailwind CSS
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 
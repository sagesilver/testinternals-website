import { useState } from 'react'
import { motion } from 'framer-motion'

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'AI-Powered Solutions', href: '#ai-solutions' },
    { name: 'Test Utilities', href: '#test-utilities' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-md shadow-lg border-b border-gray-700' 
          : 'bg-transparent'
      }`}
      style={isScrolled ? { background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' } : {}}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center mt-2"
          >
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
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 hover:text-primary-400 ${
                  isScrolled ? 'text-white' : 'text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="btn-primary">
              Book a Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-md ${
              isScrolled ? 'text-white' : 'text-white'
            }`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block font-medium text-navy-700 hover:text-primary-600 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="btn-primary w-full mt-4">
                Book a Consultation
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header 
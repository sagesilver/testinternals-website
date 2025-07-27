import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import AISolutions from './components/AISolutions'
import TestUtilities from './components/TestUtilities'
import About from './components/About'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      
      <main>
        <Hero />
        <Services />
        <AISolutions />
        <TestUtilities />
        <About />
        <Blog />
        <Contact />
      </main>
      
      <Footer />
    </div>
  )
}

export default App 
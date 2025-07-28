import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import DarkVeil from './DarkVeil';

const BlogPost = ({ post }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
        {/* Background - Purple Gradient with Dark Veil */}
        <div className="absolute inset-0 w-full h-full">
          <DarkVeil 
            hueShift={0}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0}
            resolutionScale={1}
          />
        </div>
        
        <Header />
        <div className="container-custom py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-gray-300">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="btn-primary mt-4 inline-block">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { frontmatter, content } = post;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
      {/* Background - Purple Gradient with Dark Veil */}
      <div className="absolute inset-0 w-full h-full">
        <DarkVeil 
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={1}
        />
      </div>
      
      <Header />
      
      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900/80 to-blue-900/80 text-white py-20 backdrop-blur-sm">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* Meta Information */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full">
                  {frontmatter.category}
                </span>
                <span className="text-sm text-gray-300">{frontmatter.readTime}</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {frontmatter.title}
              </h1>
              
              {/* Excerpt */}
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {frontmatter.excerpt}
              </p>
              
              {/* Author and Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {frontmatter.author?.charAt(0) || 'T'}
                  </div>
                  <div>
                    <p className="font-medium text-white">{frontmatter.author}</p>
                    <p className="text-sm text-gray-300">{frontmatter.date}</p>
                  </div>
                </div>
                
                {/* Tags */}
                {frontmatter.tags && (
                  <div className="flex flex-wrap gap-2">
                    {frontmatter.tags.map((tag, index) => {
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
                      ][index % 9];
                      
                      return (
                        <span
                          key={index}
                          className={`text-xs px-3 py-1 rounded-full font-medium ${colorClass} transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-2xl`}
                        >
                          #{tag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 1, 1) 0%,rgba(91, 68, 129, 1) 100%)' }}>
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <article className="text-white">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-white mb-4 mt-8">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-white mb-3 mt-6">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 mb-4 leading-relaxed text-lg">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300 text-lg">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300 text-lg">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300">
                        {children}
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-white">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gray-200">
                        {children}
                      </em>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="bg-gray-800 text-gray-200 px-1 py-0.5 rounded text-sm font-mono">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-700">
                          <code className="text-sm font-mono">
                            {children}
                          </code>
                        </pre>
                      );
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300 mb-4 bg-gray-800/50 p-4 rounded-r">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-900/50 backdrop-blur-sm py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Testing?
              </h2>
              <p className="text-gray-300 mb-8">
                Let TestInternals help you implement cutting-edge testing strategies and automation solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/#contact'}
                  className="btn-primary text-lg px-8 py-4 inline-block"
                >
                  Get Started
                </button>
                <Link
                  to="/blog"
                  className="btn-secondary text-lg px-8 py-4 inline-block"
                >
                  Read More Posts
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost; 
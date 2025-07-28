import { useState } from 'react';
import { motion } from 'framer-motion';
import { subscribeToNewsletter } from '../utils/newsletter';

const NewsletterSignup = ({ className = '', spotlightColor = "rgba(90, 67, 128, 0.5)" }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        setEmail(''); // Clear the form
      } else {
        setMessage(result.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative overflow-hidden max-w-2xl mx-auto ${className}`}>
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${spotlightColor}, transparent 70%)`
        }}
      />
      
      <div className="relative z-10 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">
          Stay Updated with Our Insights
        </h3>
        <p className="text-gray-200 mb-6 text-sm">
          Get the latest testing insights, industry trends, and best practices delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-1 min-w-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm text-sm"
                disabled={loading}
              />
            </div>
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className={`px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 text-sm whitespace-nowrap ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </motion.button>
          </div>
          
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-medium ${
                messageType === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup; 
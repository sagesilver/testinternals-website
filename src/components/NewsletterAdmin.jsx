import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import Header from './Header';
import Footer from './Footer';
import DarkVeil from './DarkVeil';
import { getNewsletterSubscribersAdmin, deleteNewsletterSubscriberAdmin } from '../utils/newsletterAdmin';

const NewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check Firebase authentication first
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'testinternals@gmail.com') {
        setIsAuthenticated(true);
        fetchSubscribers();
      } else {
        setIsAuthenticated(false);
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchSubscribers = async () => {
    try {
      console.log('Admin: Starting to fetch subscribers...');
      setLoading(true);
      const data = await getNewsletterSubscribersAdmin();
      console.log('Admin: Received data:', data);
      setSubscribers(data);
      setError('');
    } catch (err) {
      console.error('Admin: Error fetching subscribers:', err);
      setError(err.message || 'Failed to fetch subscribers');
    } finally {
      setLoading(false);
    }
  };

  const exportEmails = () => {
    const emails = subscribers.map(sub => sub.email).join('\n');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = async (subscriberId, email) => {
    if (window.confirm(`Are you sure you want to delete ${email}?`)) {
      try {
        const result = await deleteNewsletterSubscriberAdmin(subscriberId);
        if (result.success) {
          // Refresh the list
          fetchSubscribers();
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError(err.message || 'Failed to delete subscriber');
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      return new Date(timestamp.seconds * 1000).toLocaleDateString();
    } catch {
      return 'N/A';
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="container mx-auto text-center">
          <div className="text-lg">Loading subscribers...</div>
        </div>
      </div>
    );
  }

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
        <section className="py-20">
          <div className="container-custom">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Newsletter Management
                  </h1>
                  <p className="text-gray-300">
                    View and manage newsletter subscribers.
                  </p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <Link
                    to="/admin/dashboard"
                    className="btn-secondary text-lg px-6 py-3"
                  >
                    ← Back to Dashboard
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total Subscribers</p>
                    <p className="text-3xl font-bold text-white">{subscribers.length}</p>
                  </div>
                  <div className="text-4xl">📧</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Active Subscribers</p>
                    <p className="text-3xl font-bold text-white">
                      {subscribers.filter(sub => sub.status === 'active').length}
                    </p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">This Month</p>
                    <p className="text-3xl font-bold text-white">
                      {subscribers.filter(sub => {
                        if (!sub.subscribedAt) return false;
                        const subDate = new Date(sub.subscribedAt.seconds * 1000);
                        const thisMonth = new Date();
                        thisMonth.setDate(1);
                        return subDate >= thisMonth;
                      }).length}
                    </p>
                  </div>
                  <div className="text-4xl">📈</div>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <button
                onClick={exportEmails}
                className="btn-primary text-lg px-6 py-3"
              >
                Export Emails
              </button>
              <button
                onClick={fetchSubscribers}
                className="btn-secondary text-lg px-6 py-3"
              >
                Refresh List
              </button>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-6 backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Subscribers Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden"
            >
              <div className="p-6 border-b border-white/20">
                <h2 className="text-2xl font-bold text-white">Email Subscribers</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-medium">Email</th>
                      <th className="px-6 py-4 text-left text-white font-medium">Subscribed Date</th>
                      <th className="px-6 py-4 text-left text-white font-medium">Status</th>
                      <th className="px-6 py-4 text-left text-white font-medium">Source</th>
                      <th className="px-6 py-4 text-center text-white font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                          <div className="text-4xl mb-4">📪</div>
                          <p className="text-lg">No subscribers yet</p>
                          <p className="text-sm">Start promoting your newsletter to get subscribers!</p>
                        </td>
                      </tr>
                    ) : (
                      subscribers.map((subscriber, index) => (
                        <motion.tr
                          key={subscriber.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="border-b border-white/10 hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="text-white font-medium">{subscriber.email}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {formatDate(subscriber.subscribedAt)}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              subscriber.status === 'active' 
                                ? 'bg-green-900/50 text-green-300 border border-green-500/50'
                                : 'bg-red-900/50 text-red-300 border border-red-500/50'
                            }`}>
                              {subscriber.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {subscriber.source || 'website'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleDelete(subscriber.id, subscriber.email)}
                                className="text-red-400 hover:text-red-300 transition-colors font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/admin/dashboard"
                className="btn-secondary text-lg px-8 py-4 text-center"
              >
                Back to Dashboard
              </Link>
              <Link
                to="/"
                className="btn-secondary text-lg px-8 py-4 text-center"
              >
                View Public Site
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsletterAdmin; 
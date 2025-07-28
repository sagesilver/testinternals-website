import { collection, addDoc, query, where, getDocs, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

// Collection name for newsletter emails
const NEWSLETTER_COLLECTION = 'newsletter_emails';

/**
 * Subscribe an email to the newsletter
 * @param {string} email - Email address to subscribe
 * @returns {Promise<{success: boolean, message: string, id?: string}>}
 */
export const subscribeToNewsletter = async (email) => {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      };
    }

    // Check if email already exists
    const emailQuery = query(
      collection(db, NEWSLETTER_COLLECTION),
      where('email', '==', email.toLowerCase())
    );
    const existingDocs = await getDocs(emailQuery);

    if (!existingDocs.empty) {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter'
      };
    }

    // Add new subscription
    const docRef = await addDoc(collection(db, NEWSLETTER_COLLECTION), {
      email: email.toLowerCase(),
      subscribedAt: serverTimestamp(),
      status: 'active',
      source: 'website'
    });

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
      id: docRef.id
    };

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      message: 'Sorry, there was an error subscribing. Please try again later.'
    };
  }
};

/**
 * Get all newsletter subscribers (admin function)
 * @deprecated Use newsletterAdmin.js for admin functions
 * @returns {Promise<Array>}
 */
export const getNewsletterSubscribers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, NEWSLETTER_COLLECTION));
    const subscribers = [];
    
    querySnapshot.forEach((doc) => {
      subscribers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return subscribers;
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return [];
  }
};

/**
 * Delete a newsletter subscriber (admin function)
 * @param {string} documentId - Document ID to delete
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const deleteNewsletterSubscriber = async (documentId) => {
  try {
    await deleteDoc(doc(db, NEWSLETTER_COLLECTION, documentId));
    return {
      success: true,
      message: 'Subscriber deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return {
      success: false,
      message: 'Failed to delete subscriber'
    };
  }
}; 
import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

interface NewsletterProps {
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
}

export default function Newsletter({ newsletter }: NewsletterProps) {
  const { data: session } = useSession();
  const [email, setEmail] = useState(session?.user?.email || '');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check subscription status from localStorage when the component mounts
  useEffect(() => {
    if (session) {
      const storedSubscription = localStorage.getItem('isSubscribed');
      if (storedSubscription === 'true') {
        setIsSubscribed(true);
      }
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const res = await axios.post('/api/auth/newsletter', { email });

      const data = res.data;

      if (res.status === 200) {
        setMessage(data.message || 'Thank you for subscribing!');
        setIsSubscribed(true); 
        localStorage.setItem('isSubscribed', 'true'); 
      } else {
        setMessage(data.error || 'Subscription failed.');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'An error occurred. Please try again.');
      console.error('Error subscribing:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container-fluid py-4 px-sm-3 px-md-5 ${styles.newsletterContainer}`}>
      <div className={styles.newsletter}>
        <h5 className="font-weight-bold">{newsletter.title}</h5>
        <p>{newsletter.description}</p>
        {session ? (
          isSubscribed ? (
            <p className={styles.subscribedMessage}>Thank you for subscribing!</p>
          ) : (
            <form className="d-flex" onSubmit={handleSubmit}>
              <input
                type="email"
                className={styles.newsletterInput}
                placeholder={newsletter.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!!session?.user?.email} 
              />
              <button type="submit" className={styles.newsletterButton} disabled={isLoading}>
                {isLoading ? 'Subscribing...' : 'subscribe'}
              </button>
            </form>
          )
        ) : (
          <p>
            Please <a href="/signin" className={styles.signinLink}>sign in</a> to subscribe to our newsletter.
            <br/>
            <Link href="/signIn" legacyBehavior>
              <a className="text-blue-400 underline hover:text-blue-600">sign in</a>
            </Link>{' '}
            <br/>
            For a faster and more secure experience, we recommend signing in with your Google account or using your Gmail credentials.
          </p>
        )}
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

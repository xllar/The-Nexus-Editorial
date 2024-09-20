/* eslint-disable @next/next/no-img-element */
'use client'
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/page';
import ContactForm from '@/components/ContactForm/page';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion'; 


export default function Contact() {
  const { status } = useSession();


  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-yellow-500">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="text-white text-2xl"
        >
          Loading...
        </motion.p>
      </div>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-yellow-500">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white text-xl mb-4">
            You need to{' '}
            <Link href="/signIn" legacyBehavior>
              <a className="text-blue-400 underline hover:text-blue-600">sign in</a>
            </Link>{' '}
            to access this page.
          </p>
          <p className="text-white text-lg">
          For a faster and more secure experience, we recommend signing in with your Google account or using your Gmail credentials.
          </p>
        </motion.div>
      </div>
    );
  }
  // Main content when user is signed in
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-2c3e50 to-fafa61 flex items-center justify-center p-4">
        <Head>
          <title>Contact Us</title>
        </Head>
        <motion.main
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl transform hover:scale-105 transition-transform duration-500"
        >
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
              Got a Story to Share?
            </h1>
            <p className="text-center text-gray-600 mb-6">
              We are always on the lookout for new and inspiring stories! If you have a news tip or 
              a story youd like to share with our audience, feel free to get in touch. We believe 
              in giving a voice to the community.
            </p>
            <ContactForm />
          </div>
          <div className="bg-gray-50 p-4 text-center">
            <Link href="/" legacyBehavior>
              <a className="text-blue-600 hover:underline">Back to Home</a>
            </Link>
          </div>
        </motion.main>
      </div>
      <Footer
        Country={null}
        socialMedia={[]}
        categories={[]}
        tags={[]}
        newsletter={{
          title: '',
          description: '',
          placeholder: '',
          buttonText: '',
        }}
      />
    </>
  );
}

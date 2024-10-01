/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client';
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
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#2c3e50] to-[rgb(250,250,97)]">
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
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#2c3e50] to-[rgb(250,250,97)]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md mx-auto"
        >
          <p className="text-gray-800 text-xl mb-4">
            Please{' '}
            <Link href="/signIn" legacyBehavior>
              <a className="text-blue-500 underline hover:text-blue-700">
                sign in
              </a>
            </Link>{' '}
            to access the contact form and share your story.
          </p>
          <p className="text-gray-700 mb-2">
            Signing in helps us verify your submission and stay updated on the status of your story.
          </p>
          <p className="text-gray-700">
            Don’t have an account? It’s quick and easy to sign up!
          </p>
        </motion.div>
      </div>
    );
  }


  // Main content when user is signed in
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <Head>
          <title>Contact Us</title>
        </Head>
        <motion.main
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform duration-500"
        >
          <div className="p-8">
            <h1 className="text-5xl font-bold mb-6 text-center text-gray-900">
              Share Your Story
            </h1>
            <p className="text-center text-gray-600 mb-8 leading-relaxed">
              We're eager to hear your inspiring news! Share a tip or a story with us, and we’ll help you reach our audience. Your voice matters.
            </p>
            <ContactForm />
          </div>
          <div className="bg-gray-100 p-4 text-center">
            <Link href="/" legacyBehavior>
              <a className="text-blue-600 hover:underline text-lg font-medium">
                Back to Home
              </a>
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

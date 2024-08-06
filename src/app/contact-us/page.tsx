/* eslint-disable @next/next/no-img-element */
'use client'
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/page';
import ContactForm from '@/components/ContactForm/page';
import { useSession } from 'next-auth/react';

export default function Contact() {
  const { status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>You need to <a href="/signin">sign in</a> to access this page.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-2c3e50 to-fafa61 flex items-center justify-center p-4">
        <Head>
          <title>Contact Us</title>
        </Head>
        <main className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl transform hover:scale-105 transition-transform duration-500">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>
            <ContactForm />
          </div>
          <div className="bg-gray-50 p-4 text-center">
            <Link href="/" legacyBehavior>
              <a className="text-blue-600 hover:underline">Back to Home</a>
            </Link>
          </div>
        </main>
      </div>
      <Footer Country={null} />
    </>
  );
}

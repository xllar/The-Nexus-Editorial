/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/page';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-white">
      <div>
        <Navbar />
      </div>
      <div className="relative hero-section">
        <img
          src="https://media.istockphoto.com/id/1219980553/photo/online-news-on-a-smartphone-and-laptop-woman-reading-news-or-articles-in-a-mobile-phone.jpg?b=1&s=612x612&w=0&k=20&c=6lR1CyHtjy33r4EC9IZZQnC-o1xGw3F70qmRoiaSESg="
          alt="About Us"
          className="w-full h-96 object-cover hero-image"
        />
        <div className="absolute inset-0 bg-black opacity-60 hero-overlay"></div>
        <div className="absolute inset-0 flex items-center justify-center hero-text">
          <h1 className="text-5xl font-bold text-white animate-bounce">About Us</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 text-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Our Blogs Journey</h2>
          <p className="mt-4">
            Dive into the backstory of our blog, how we began, and the passion that drives us to curate content for our readers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              Our mission is to provide insightful, engaging, and reliable content that informs and inspires our readers.
              Whether its the latest news or in-depth articles, we aim to be the go-to source for fresh and meaningful stories.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              We envision a blog that not only informs but also sparks conversation and curiosity. Our aim is to create a
              community where readers can engage with content that resonates with them on a deeper level.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Integrity in reporting</li>
              <li>Reader-focused content</li>
              <li>Innovation in storytelling</li>
              <li>Excellence in research</li>
              <li>Community engagement</li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our History</h3>
            <p className="text-gray-600">
              Since the launch of our blog, we ve grown from a small passion project to a reputable source of news and insights.
              Our journey has been marked by a commitment to quality journalism and a dedication to connecting with our readers.
            </p>
          </div>
        </div>
      </div>

      <Footer
        Country={null}
        socialMedia={[]}
        categories={[]}
        tags={[]}
        newsletter={{
          title: 'Subscribe to our Newsletter',
          description: 'Get the latest articles delivered straight to your inbox.',
          placeholder: 'Enter your email',
          buttonText: 'Subscribe'
        }}
      />
    </div>
  );
}

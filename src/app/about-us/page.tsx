/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/page';
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-yellow-500">
      <div>
        <Navbar/>
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
          <h2 className="text-4xl font-bold">Our Story</h2>
          <p className="mt-4">
            Discover more about our mission, vision, and values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              Our mission is to provide the best service to our customers. We strive to achieve excellence
              in every aspect of our business, ensuring customer satisfaction and continuous improvement.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              We envision a world where our solutions make a significant impact on our customers lives.
              Our goal is to be the leader in our industry, setting standards for quality and innovation.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Integrity</li>
              <li>Customer Focus</li>
              <li>Innovation</li>
              <li>Excellence</li>
              <li>Teamwork</li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our History</h3>
            <p className="text-gray-600">
              Since our founding, we have grown into a reputable company known for our dedication to quality
              and customer satisfaction. Our journey is marked by continuous growth, learning, and success.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;

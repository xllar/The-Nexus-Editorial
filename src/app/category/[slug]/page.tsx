/* eslint-disable @next/next/no-img-element */
'use client'

import Head from 'next/head';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import Index3 from '@/components/postcard/index3';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/page';

type Post = {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
};

const categories = ['Politics','Technology','Sports','Entertainment', 'Health', 'Lifestyle','Science', 'Finance', 'Education'];

export default function CategoryPage() {
  const { category } = useParams();
  const [currentCategory, setCurrentCategory] = useState(category);

  const posts: Post[] = Array.from({ length: 15 }).map((_, index) => ({
    imgSrc: `https://picsum.photos/400/300?random=${index}`,
    title: `Exciting News in ${currentCategory} ${index + 1}`,
    description: `Discover the latest trends and insights in ${currentCategory}.`,
    link: `/blog`
  }));

  return (
    <>
      <Navbar />
      <Head>
        <title>Category: {currentCategory}</title>
        <meta name="description" content={`Explore posts in the ${currentCategory} category.`} />
      </Head>
      <main className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
        <aside className="w-full lg:w-1/4 bg-white shadow-xl p-4 transform transition-transform duration-300 z-20">
          <h2 className="text-3xl font-bold mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`block w-full text-left p-3 rounded-lg transition-all duration-300 ${
                  currentCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setCurrentCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <Index3 />
        </aside>
        <section className="w-full lg:w-3/4 p-4 md:p-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-4 md:mb-8 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Category: {currentCategory}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">
            {posts.map((post, index) => (
              <div key={index} className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <div className="w-full h-32 sm:h-48 relative">
                  <img 
                    src={post.imgSrc} 
                    alt={`Post Image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white transition-colors duration-300 hover:bg-blue-50">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <Link href={post.link} legacyBehavior>
                    <a className="text-blue-600 hover:underline">Read More</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-move"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-move"></div>
        </div>
      </main>

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        .animate-move {
          animation: move 10s infinite alternate;
        }

        @keyframes move {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(-20px) translateX(-20px);
          }
        }

        button {
          cursor: pointer;
        }
      `}</style>
      <Footer Country={null} />
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

type Posts = {
  imgSrc: string;
  title: string;
  description: string;
  author: string;
  authorImgSrc: string; // New field for author's image
  link: string;
  views: string;
};

export default function BlogPosts() {
  const { card } = useParams();
  const [currentCard, setCurrentCard] = useState<string | undefined>();

  // Use a default value if currentCard is undefined
  const posts: Posts[] = Array.from({ length: 9 }).map((_, index) => ({
    imgSrc: `https://picsum.photos/400/300?random=${index}`,
    title: `Exciting News in ${currentCard || 'Category'} ${index + 1}`,
    author: `Author ${index + 1}`,
    authorImgSrc: `https://picsum.photos/50/50?random=${index}`, // Placeholder author image
    description: `Discover the latest trends and insights in ${currentCard || 'Category'}.`,
    link: `/blog/${index + 1}`, // Example link path
    views: `${Math.floor(Math.random() * 1000)} views` // Random number of views for demonstration
  }));

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link href={post.link} key={index} legacyBehavior>
            <a className="block transform hover:scale-105 transition-transform duration-500">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full relative">
                {/* Image Section */}
                <div className="relative">
                  <img 
                    src={post.imgSrc} 
                    alt={`Post Image ${index + 1}`} 
                    className="w-full h-48 object-cover" 
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                </div>
                {/* Content Section */}
                <div className="p-6 relative z-10">
                  <span className="inline-block bg-orange-500 text-white text-xs font-semibold tracking-wide uppercase mb-2 px-2 py-1 rounded">Category</span>
                  <h5 className="text-gray-900 font-bold text-xl mb-2">{post.title}</h5>
                  <p className="text-gray-700 text-base mb-4">{post.description}</p>
                  <div className="flex items-center mb-4">
                    <img
                      src={post.authorImgSrc}
                      alt={`Author Image ${index + 1}`}
                      className="w-10 h-10 object-cover rounded-full mr-2"
                    />
                    <p className="text-gray-500 text-sm">{post.author} | {new Date().toLocaleDateString()}</p>
                  </div>
                  {/* Views Section */}
                  <p className="text-gray-400 text-sm">{post.views}</p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

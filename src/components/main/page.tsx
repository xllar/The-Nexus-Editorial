/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './main.module.scss';
import client from '@/app/utils/sanityClient';
import Index from '../postcard/index';
import Index2 from '../postcard/index2';
import Editor from '../postcard/index3';

const fetchFeaturedPost = async () => {
  const query = `
    *[_type == "headerPost" && featured == true][0] {
      _id,
      slug,
      title,
      description,
      authorName,
      date,
      "mainImageUrl": mainImage.asset->url
    }
  `;
  const data = await client.fetch(query);
  return data;
};

export default function Home() {
  const [featuredPost, setFeaturedPost] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const getFeaturedPost = async () => {
      const post = await fetchFeaturedPost();
      setFeaturedPost(post);
    };
    
    getFeaturedPost();
  }, []);

  return (
    <div className={styles.container}>
      <main className="container mx-auto my-8 px-4 overflow-hidden">
        <div className="flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-2/3 mb-8 lg:mb-0 overflow-hidden">
            {/* Search Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
                className="w-full px-4 py-2 rounded border border-blue-400 bg-blue-50 text-black-700  focus:border-black-600 focus:ring focus:ring-blue-300 outline-none transition-all"
              />
            </div>

            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug?.current}`} legacyBehavior>
                <a className="group">
                  <div className="relative mb-8 overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={featuredPost.mainImageUrl}
                      className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500"
                      alt={featuredPost.title}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-75 transition-all duration-500"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="font-bold text-white px-3 py-1 rounded text-sm">Featured</span>
                      <h3 className="text-3xl font-bold text-white mt-4">{featuredPost.title}</h3>
                      <p className="text-white mt-2">{featuredPost.description}</p>
                      <p className="text-white text-sm mt-4">
                        <small className="text-gray-300">{featuredPost.authorName} | {new Date(featuredPost.date).toLocaleDateString()}</small>
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            )}
            <div className="grid gap-8">
              <h2 className="text-4xl font-bold text-center mb-6">Top Stories</h2>
              <Index searchTerm={searchTerm} /> {/* Pass searchTerm to Index component */}
            </div>
          </div>
          <aside className="w-full lg:w-1/3 lg:ml-8 overflow-hidden">
            <Index2 />
          </aside>
        </div>
        <div className="my-12 overflow-hidden">
            <Editor />
        </div>
      </main>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import client from '@/app/utils/sanityClient';

type Post = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  authorName: string;
  date: string;
  category: {
    title: string;
  } | null;
};

const query = `
  *[_type == "post"] {
    _id,
    title,
    slug,
    description,
    mainImage {
      asset -> { url }
    },
    authorName,
    date,
    featured,
    category -> { title }
  }
`;

export default function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Randomly shuffle the array using Fisher-Yates algorithm to ensure unbiased randomness
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await client.fetch(query);
       // Shuffle the posts and take the first 10
      const shuffledata = shuffleArray(data);
      setPosts(shuffledata.slice(0,9));
    };
    
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post._id} className="group block transform transition-transform duration-500 hover:scale-105">
            <Link href={`/blog/${post.slug?.current}`}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden relative hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col justify-between">
                <div className="relative">
                  <img
                    src={post.mainImage.asset.url}
                    alt={`Post Image ${post._id}`}
                    className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 space-y-4">
                  <span className="inline-block bg-gradient-to-r from-teal-400 to-blue-500 text-white text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full">
                    {post.category?.title || 'Uncategorized'}
                  </span>
                  <h5 className="text-gray-900 font-bold text-xl group-hover:text-teal-500 transition-colors duration-300">
                      {post.title}
                    </h5>
                    {/* Truncated description */}
                    <p className="text-gray-700 text-base line-clamp-3">
                      {post.description}
                    </p>
                  <p className="text-gray-600 text-sm">
                    {post.authorName} | {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-6">
                  <Link href={`/blog/${post.slug?.current}`} className="text-teal-500 hover:underline">Read More</Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import client from '@/app/utils/sanityClient';

const query = `*[_type == "sideBlog"][0] {
  _id,
  popularPosts[]->{
    title,
    slug,
    mainImage {
      asset->{
        url
      }
    }
  },
  videos[] {
    title,
    url,
    date,
    views
  },
  categories[]->{
    title
  },
  tags,
  aboutMe {
    image {
      asset->{
        url
      }
    },
    description
  },
  socialLinks
}`;

type Video = {
  title: string;
  url: string;
  date: string;
  views: number;
};

type SideBlog = {
  _id: string;
  popularPosts: Array<{
    title: string;
    slug: {
      current: string;
    };
    mainImage: {
      asset: {
        url: string;
      };
    };
  }>;
  videos: Video[]; 
  categories: Array<{ title: string }>;
  tags: string[];
  aboutMe: {
    image: {
      asset: {
        url: string;
      };
    };
    description: string;
  };
  socialLinks: any;
};

export default function SideCardComponent() {
  const { random } = useParams();
  const [post, setPost] = useState<SideBlog | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await client.fetch(query);
        console.log('Fetched sideBlog data:', res);
        setPost(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  if (!post) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div>

    
            {/* Popular Posts Section */}
    <div className="rounded-lg p-4 shadow-md bg-gradient-to-r from-white to-gray-50 hover:shadow-xl transition">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Posts</h2>
      <div className="space-y-4">
        {post.popularPosts.map((postItem) => (
          <Link 
            key={postItem.slug.current} 
            href={`/blog/${postItem.slug.current}`} 
            className="block overflow-hidden transition-transform hover:scale-105"
            legacyBehavior>
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-md hover:bg-gray-100 transition">
              {postItem.mainImage?.asset?.url && (
                <img 
                  src={postItem.mainImage.asset.url} 
                  alt={postItem.title} 
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <h5 className="text-lg font-semibold text-gray-700">{postItem.title}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>

    {/* Videos Section */}
    <div className="rounded-lg p-4 shadow-md bg-gradient-to-r from-gray-50 to-white hover:shadow-xl transition">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Videos</h2>
      <div className="space-y-3">
        {post.videos.length > 0 ? (
          post.videos.map((video) => (
            <a 
              key={video.url} 
              href={video.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
            >
              <p className="text-lg font-semibold text-gray-800">{video.title}</p>
            </a>
          ))
        ) : (
          <p className="text-gray-500">No videos available</p>
        )}
      </div>
    </div>

    {/* Categories Section */}
    <div className="rounded-lg p-4 shadow-md bg-gradient-to-r from-gray-50 to-white hover:shadow-xl transition">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3">
        {post.categories.length > 0 ? (
          post.categories.map((category) => (
            <Link 
              key={category.title} 
              href={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`} 
              className="inline-block bg-indigo-50 text-indigo-700 px-3 py-2 rounded-full font-semibold transition hover:bg-indigo-100"
              legacyBehavior>
              <span>{category.title}</span>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No categories available</p>
        )}
      </div>
    </div>

    {/* Tags Section */}
    <div className="rounded-lg p-4 shadow-md bg-gradient-to-r from-white to-gray-50 hover:shadow-xl transition">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Tags</h2>
      <div className="flex flex-wrap gap-3">
        {post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <span key={tag} className="text-lg font-semibold text-pink-600 hover:text-pink-800 transition">
              #{tag}
            </span>
          ))
        ) : (
          <p className="text-gray-500">No tags available</p>
        )}
      </div>
    </div>

    {/* About Me Section */}
    <div className="rounded-lg p-4 shadow-md bg-gradient-to-r from-gray-50 to-white hover:shadow-xl transition">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">About Me</h2>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-6">
        {post.aboutMe?.image?.asset?.url && (
          <img 
            src={post.aboutMe.image.asset.url} 
            alt="About Me" 
            className="w-32 h-32 object-cover rounded-full shadow-lg"
          />
        )}
        <p className="text-gray-700 text-base leading-relaxed">
          {post.aboutMe?.description}
        </p>
      </div>
    </div>

    </div>
  );
}

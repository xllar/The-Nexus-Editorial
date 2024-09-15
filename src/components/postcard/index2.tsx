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
  socialLinks: any; // Adjust type as necessary
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
    <div className="space-y-8 p-6 bg-gradient-to-r from-green-50 via-teal-50 to-blue-50 animate-fade-in">

      {/* Popular Posts Section */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-green-500 cursor-pointer">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Popular Posts</h2>
        <div className="space-y-4">
          {post.popularPosts.map((postItem) => (
            <Link 
              key={postItem.slug?.current} 
              href={`/blog/${postItem.slug?.current || '#'}`} 
              className="block bg-gray-100 hover:bg-gray-200 rounded-lg overflow-hidden shadow-sm transition-colors duration-300 border-l-4 border-blue-500 cursor-pointer"
              legacyBehavior>
              <div className="relative p-4 flex items-center space-x-4">
                {postItem.mainImage?.asset?.url && (
                  <img 
                    src={postItem.mainImage.asset.url} 
                    alt={postItem.title} 
                    className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300"
                  />
                )}
                <h5 className="text-lg font-semibold text-gray-800">{postItem.title}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-teal-500 cursor-pointer">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Videos</h2>
        <div className="space-y-4">
          {(post.videos?.length ?? 0) > 0 ? (
            post.videos.map((video: Video) => (
              <div key={video.url} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300 border-l-4 border-teal-500">
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="block text-lg font-semibold text-teal-600 hover:underline">
                  {video.title}
                </a>
                <span className="text-sm text-gray-700">
                  {new Date(video.date).toLocaleDateString()} | {video.views} views
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center">No videos available</p>
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-blue-500 cursor-pointer">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Categories</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {(post.categories?.length ?? 0) > 0 ? (
            post.categories.map((category) => (
              <Link 
                key={category.title} 
                href={`/category/${category.title}`} 
                className="block p-3 bg-gradient-to-r from-blue-100 to-blue-300 text-blue-700 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400 transition-colors duration-300 cursor-pointer"
                legacyBehavior>
                <span className="text-lg font-semibold hover:underline">
                  {category.title}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-gray-700 text-center">No categories available</p>
          )}
        </div>
      </div>

      {/* Tags Section */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-purple-500">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Tags</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {(post.tags?.length ?? 0) > 0 ? (
            post.tags.map((tag) => (
              <div 
                key={tag} 
                className="text-lg font-semibold text-purple-600 hover:text-purple-800"
              >
                #{tag}
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center">No tags available</p>
          )}
        </div>
      </div>

      {/* About Me Section */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-gray-500 cursor-default">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">About Me</h2>
        <div className="flex items-center space-x-6">
          {post.aboutMe?.image?.asset?.url && (
            <img 
              src={post.aboutMe.image.asset.url} 
              alt="About Me" 
              className="w-40 h-40 object-cover rounded-full border-4 border-gray-300 shadow-lg"
            />
          )}
          <p className="text-gray-800 text-lg leading-relaxed">{post.aboutMe?.description}</p>
        </div>
      </div>

    </div>
  );
}

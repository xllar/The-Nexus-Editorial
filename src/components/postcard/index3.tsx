/* eslint-disable @next/next/no-img-element */
'use client'
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';

type Video = {
  videoSrc: string,
  title: string,
  views: string
}

type Post = {
  imageSrc: string,
  title: string,
  authorImage: string,
  authorName: string,
  date: string,
  views: string
}

export default function Index3() {
  const { random } = useParams()
  const [Video, setVideo] = useState(random)

  const videos: Video[] = [
    { videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: `${Video} 1`, views: `Views: ${Math.floor(Math.random() * 1000)}` },
    { videoSrc: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', title: `${Video} 2`, views: `Views: ${Math.floor(Math.random() * 1000)}` },
  ]

  const posts: Post[] = Array.from({length: 3}).map((_, index) => ({
    imageSrc: `https://picsum.photos/400/300?random=${index + 1}`,
    title: `Popular Post Title ${index + 1}`,
    authorImage: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
    authorName: `Author ${index + 1}`,
    date: new Date().toLocaleDateString(),
    views: `Views: ${Math.floor(Math.random() * 1000)}`
  }));

  return (
    <div className="space-y-8">
      {/* Popular Posts Section */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-md hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900">Popular Posts</h2>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Link 
              href={`/post/${index}`} 
              key={index}
              className="block bg-gray-100 hover:bg-gray-200 rounded-lg overflow-hidden shadow-sm transition-colors duration-300"
            >
              <div className="relative">
                <img 
                  src={post.imageSrc} 
                  className="w-full h-24 object-cover" 
                  alt={`Popular Post ${index + 1}`} 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-2">
                  <h5 className="text-sm font-medium">{post.title}</h5>
                </div>
              </div>
              <div className="p-4 flex items-center space-x-4">
                <img 
                  src={post.authorImage} 
                  className="w-10 h-10 object-cover rounded-full border-2 border-gray-300" 
                  alt={post.authorName} 
                />
                <div className="text-gray-700">
                  <p className="text-sm font-semibold">{post.authorName}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </div>
              <div className="p-2 text-center text-gray-600 text-xs">
                {post.views}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Videos</h2>
        {videos.map((vid, index) => (
          <div className="mb-4 bg-gray-100 rounded-lg shadow-md overflow-hidden" key={index}>
            <iframe
              className="w-full h-40"
              src={vid.videoSrc}
              title={vid.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-3">
              <h5 className="text-lg font-semibold mb-2">{vid.title}</h5>
              <p className="text-gray-600"><small>{new Date().toLocaleDateString()}</small></p>
              <p className="text-gray-600">{vid.views}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs } from 'react-icons/fa';

type Video = {
  videoSrc: string,
  title: string,
  views: string
}

export default function Index2() {
  const { random } = useParams()
  const [video, setVideo] = useState(random)

  const videos: Video[] = [
    {
      videoSrc: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
      title: `${video} 1`,
      views: `Views: ${Math.floor(Math.random()*1000)}`
    },
    {
      videoSrc: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', 
      title: `${video} 2`,
      views: `Views: ${Math.floor(Math.random()*1000)}`
    },
  ]

  return (
    <div className="space-y-8 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-fade-in">

      {/* Popular Posts Section */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-md hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900">Popular Posts</h2>
        <div className="space-y-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <Link 
              href={`/post/${index}`} 
              key={index}
              className="block bg-gray-100 hover:bg-gray-200 rounded-lg overflow-hidden shadow-sm transition-colors duration-300"
            >
              <div className="relative">
                <img 
                  src={`https://picsum.photos/400/300?random=${index}`} 
                  className="w-full h-24 object-cover" 
                  alt={`Popular Post ${index + 1}`} 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-2">
                  <h5 className="text-sm font-medium">{`Popular Post Title ${index + 1}`}</h5>
                </div>
              </div>
              <div className="p-2 text-center text-gray-600 text-xs">
                {`Views: ${Math.floor(Math.random()*1000)}`}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      <div className="bg-white rounded-lg p-4 mb-8 transform hover:scale-100 transition-transform duration-500">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Videos</h2>
        {
          videos.map((vid, index) => (
            <div className="mb-4" key={index}>
              <iframe
                width="100%"
                height="150"
                src={vid.videoSrc}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg transition-transform transform hover:scale-105"
              ></iframe>
              <div className="mt-2 text-center">
                <p className="text-gray-600"><small>{new Date().toLocaleDateString()}</small></p>
                <p className="text-gray-500"><small>{vid.views}</small></p>
              </div>
            </div>
          ))
        }
      </div>

      {/* Categories Section */}
      <div className="bg-white rounded-lg p-6 mb-8 transform hover:scale-105 transition-transform duration-500">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Categories</h2>
        <ul className="grid grid-cols-2 gap-4">
          {['React', 'JavaScript', 'CSS', 'HTML', 'Next.js', 'Node.js'].map((category, index) => (
            <li 
              className="flex items-center space-x-2 p-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg text-gray-800 transition-transform transform hover:scale-105"
              key={index}
            >
              {category === 'React' && <FaReact className="text-blue-600"/>}
              {category === 'JavaScript' && <FaJs className="text-yellow-500"/>}
              {category === 'CSS' && <FaCss3Alt className="text-blue-600"/>}
              {category === 'HTML' && <FaHtml5 className="text-orange-500"/>}
              {category === 'Next.js' && <FaNodeJs className="text-green-600"/>}
              {category === 'Node.js' && <FaNodeJs className="text-green-600"/>}
              <Link href={`/category/${category.toLowerCase()}`} className="text-gray-800 font-semibold">
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-md hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900">Recent Posts</h2>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Link 
              href={`/post/${index + 4}`} 
              key={index}
              className="block bg-gray-100 hover:bg-gray-200 rounded-lg overflow-hidden shadow-sm transition-colors duration-300"
            >
              <div className="relative">
                <img 
                  src={`https://picsum.photos/400/300?random=${index + 4}`} 
                  className="w-full h-24 object-cover" 
                  alt={`Recent Post ${index + 1}`} 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-2">
                  <h5 className="text-sm font-medium">{`Recent Post Title ${index + 1}`}</h5>
                </div>
              </div>
              <div className="p-2 text-center text-gray-600 text-xs">
                {`Views: ${Math.floor(Math.random()*1000)}`}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="bg-white rounded-lg p-6 mb-8 transform hover:scale-105 transition-transform duration-500">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Tags</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {['React', 'JavaScript', 'CSS', 'HTML', 'Next.js', 'Web Development'].map((tag, index) => (
            <span 
              className="bg-gradient-to-r from-indigo-200 to-blue-300 text-gray-800 px-4 py-2 rounded-full transition-transform transform hover:scale-105"
              key={index}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* About Me Section */}
      <div className="bg-white rounded-lg p-6 mb-8 transform hover:scale-105 transition-transform duration-500">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">About Me</h2>
        <div className="flex flex-col items-center space-y-4">
          <img 
            src={`https://robohash.org/${Math.random().toString(36).substring(2, 15)}.png?size=200x200`} 
            className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-lg" 
            alt="About Me" 
          />
          <p className="text-center text-gray-700 text-lg">
            Hi, Im [Xlngr], a passionate blogger sharing insights on web development, technology, and more. I love creating content that helps and inspires others!
          </p>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="bg-white rounded-lg p-6 mb-8 transform hover:scale-105 transition-transform duration-500">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Follow Us</h2>
        <div className="flex justify-around">
          <a 
            href="#" 
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
          >
            <FaFacebookF className="text-lg"/>
          </a>
          <a 
            href="#" 
            className="bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-500 transition-colors duration-300 flex items-center space-x-2"
          >
            <FaTwitter className="text-lg"/>
          </a>
          <a 
            href="#" 
            className="bg-pink-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-pink-700 transition-colors duration-300 flex items-center space-x-2"
          >
            <FaInstagram className="text-lg"/>
          </a>
        </div>
      </div>
    </div>
  )
}

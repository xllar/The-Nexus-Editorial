/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react';
import client from '@/app/utils/sanityClient';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/page';
import Link from 'next/link';

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
    category -> { title }
  } | order(date desc)
`;

export default function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(query);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#2c3e50] to-[#fafa61]">
        <p className="text-center text-white text-2xl">Loading posts...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <header className="py-8 text-white">
        <div className="text-center px-4">
          <h1 className="inline-block text-3xl md:text-4xl font-bold" style={{
            background: 'linear-gradient(to right, #2c3e50, #3498db)',
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}>
            Nexus<span style={{
              color: '#ecf0f1',
              fontSize: '1.2em',
              marginLeft: '0.5rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            }}>Editorial</span>
          </h1>
        </div>
      </header>

      <div className="relative container mx-auto py-8 px-4">
        {/* Redesigned Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full md:w-2/3 lg:w-1/2 mx-auto block text-gray-800 bg-white shadow-lg rounded-full px-6 py-4 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
            style={{
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900">Latest Articles</h2>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <div key={post._id} className="group block transform transition-all duration-500 hover:scale-105 hover:shadow-xl bg-white rounded-lg shadow-md overflow-hidden">
                <Link href={`/blog/${post.slug.current}`}>
                  <div className="flex flex-col h-full">
                    <div className="relative h-48 sm:h-60 overflow-hidden">
                      <img
                        src={post.mainImage.asset.url}
                        alt={`Post Image ${post._id}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 space-y-4 flex-grow">
                      <span className="inline-block bg-gradient-to-r from-teal-400 to-blue-500 text-white text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full">
                        {post.category?.title || 'Uncategorized'}
                      </span>
                      <h5 className="text-gray-900 font-extrabold text-lg group-hover:text-blue-500 transition-colors duration-300">
                        {post.title}
                      </h5>
                      <p className="text-gray-600 text-sm line-clamp-3">{post.description}</p>
                      <p className="text-gray-500 text-xs">
                        By {post.authorName} | {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="px-6 pb-6">
                      <Link href={`/blog/${post.slug.current}`} className="text-blue-500 hover:underline font-semibold">
                        Read More
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl">No posts match your search.</p>
        )}
      </div>

      <Footer
        Country={null}
        socialMedia={[]}
        categories={[]}
        tags={[]}
        newsletter={{
          title: 'Subscribe to our Newsletter',
          description: 'Get the latest articles directly in your inbox.',
          placeholder: 'Enter your email address',
          buttonText: 'Subscribe',
        }}
      />
    </>
  );
}

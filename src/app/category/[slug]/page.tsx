/* eslint-disable @next/next/no-img-element */
'use client';

import Head from 'next/head';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/page';
import sanityClient from '@/app/utils/sanityClient'; // Ensure you have this configured

type Post = {
  _id: string;
  title: string;
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
  slug: {
    current: string;
  };
  authorName: string;
  authorImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
  date: string;
  category: {
    title: string;
  } | null;
};

type Category = {
  title: string;
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
};

export default function CategoryPage() {
  const { category } = useParams();
  const [currentCategory, setCurrentCategory] = useState(category);
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<Category | null>(null);

  useEffect(() => {
    // Fetch categories from Sanity
    const fetchCategories = async () => {
      const categoryQuery = `*[_type == "category"]{
        title,
        description,
        mainImage{
          asset->{
            url
          },
          alt
        }
      }`;

      const fetchedCategories = await sanityClient.fetch(categoryQuery);
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!currentCategory) return;

    // Fetch posts from Sanity
    const fetchPosts = async () => {
      const query = `*[_type == "post" && category->title == $category]{
        _id,
        title,
        "description": description,
        "mainImage": mainImage.asset->url,
        "mainImageAlt": mainImage.alt,
        slug {
          current
        },
        authorName,
        "authorImage": authorImage.asset->url,
        "authorImageAlt": authorImage.alt,
        date,
        category -> { title }
      }`;

      const fetchedPosts = await sanityClient.fetch(query, { category: currentCategory });
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [currentCategory]);

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
                  currentCategory === cat.title ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setCurrentCategory(cat.title)}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </aside>
        <section className="w-full lg:w-3/4 p-4 md:p-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-4 md:mb-8 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Category: {currentCategory}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">
            {posts.map((post) => (
              <div key={post._id} className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <div className="w-full h-32 sm:h-48 relative">
                  <img 
                    src={post.mainImage} 
                    alt={post.mainImage || `Post Image ${post._id}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white transition-colors duration-300 hover:bg-blue-50">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <p className="text-gray-600 text-sm mb-2">{post.authorName}</p>
                  <p className="text-gray-600 text-sm">{new Date(post.date).toLocaleDateString()}</p>
                  <Link href={`/blog/${post.slug.current}`} legacyBehavior>
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
      <Footer Country={null} socialMedia={[]} categories={[]} tags={[]} newsletter={{
        title: '',
        description: '',
        placeholder: '',
        buttonText: ''
      }} />
    </>
  );
}

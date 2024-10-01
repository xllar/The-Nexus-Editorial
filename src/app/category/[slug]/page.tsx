/* eslint-disable @next/next/no-img-element */
"use client"
import Head from 'next/head';
import { useParams, useSearchParams } from 'next/navigation'; // Import useParams and useSearchParams
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/page';
import sanityClient from '@/app/utils/sanityClient'; 
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
  const { slug } = useParams(); // Get the slug from URL parameters
  const searchParams = useSearchParams(); // Use search params for any additional parameters
  const openCategory = searchParams.get('open'); // Get the 'open' parameter
  const [currentCategory, setCurrentCategory] = useState(openCategory || slug); // Set initial category
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
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

    const fetchPosts = async () => {
      const query = `*[_type == "post" && category->title == $category]{
        _id,
        title,
        "description": description,
        "mainImage": mainImage.asset->url,
        slug {
          current
        },
        authorName,
        date,
        category -> { title }
      }`;

      const fetchedPosts = await sanityClient.fetch(query, { category: currentCategory });
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [currentCategory]);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  useEffect(() => {
    if (openCategory) {
      setCurrentCategory(openCategory); // Set current category from 'open' parameter
    }
  }, [openCategory]);

  return (
    <>
      <Navbar />
      <Head>
        <title>Category: {currentCategory}</title>
        <meta name="description" content={`Explore posts in the ${currentCategory} category.`} />
      </Head>
      <main className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
        {/* Sidebar Toggle Button */}
        <button
          className="lg:hidden p-2 text-white bg-blue-600 rounded-lg absolute top-4 left-4 z-30"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FiChevronLeft/> : <FiChevronRight/>}
        </button>
  <br />
        {/* Sidebar */}
         {/* Sidebar */}
         <aside className={`w-full lg:w-1/4 bg-white shadow-xl p-4 transform transition-transform duration-300 z-20 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
          <h2 className="text-3xl font-bold mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`block w-full text-left p-3 rounded-lg transition-all duration-300 ${
                  currentCategory === cat.title ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => {
                  setCurrentCategory(cat.title);
                  setIsSidebarOpen(false); // Close sidebar on category selection
                  // Update the URL without using router
                  const updatedSlug = cat.title.toLowerCase().replace(/\s+/g, '-');
                  const newURL = `/category/${updatedSlug}?open=${cat.title}`;
                  window.history.pushState({}, '', newURL); // Update URL in browser
                }}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </aside>

        <section className="w-full lg:w-3/4 p-4 md:p-8 bg-white rounded-lg shadow-md">
        <p className="text-lg text-gray-800 mb-4 text-center font-medium  to-teal-400 p-2 rounded-lg shadow-md">
              Select a category from the left to filter your articles, then use the search bar below to find specific topics or keywords quickly!
            </p>
          {/* Search Bar */}
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

          <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-4 md:mb-8 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Category: {currentCategory}
          </h2>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post._id} className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                  <div className="w-full h-32 sm:h-48 relative">
                    <img 
                      src={post.mainImage} 
                      alt={post.mainImage || `Post Image ${post._id}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-white transition-colors duration-300 hover:bg-blue-50">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-600">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.description}</p>
                    <p className="text-gray-600 text-sm mb-2">{post.authorName}</p>
                    <p className="text-gray-600 text-sm">{new Date(post.date).toLocaleDateString()}</p>
                    <Link href={`/blog/${post.slug.current}`} legacyBehavior>
                      <a className="text-blue-600 hover:underline font-semibold">Read More</a>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-xl">No posts match your search.</p>
            )}
          </div>
        </section>
      </main>

      <Footer Country={null} socialMedia={[]} categories={[]} tags={[]} newsletter={{
        title: '',
        description: '',
        placeholder: '',
        buttonText: ''
      }} />
    </>
  );
}






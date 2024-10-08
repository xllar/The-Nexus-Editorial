/* eslint-disable @next/next/no-img-element */
// app/blog/[slug]/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import client from '@/app/utils/sanityClient';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/page';
import Link from 'next/link';
import Head from 'next/head';
import imageUrlBuilder from '@sanity/image-url';
import Comment from '@/components/comment/page';
import { PortableText } from '@portabletext/react';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface AuthorSocials {
  twitter?: string;
  instagram?: string;
}

interface Post {
  title: string;
  description: string;
  body: any[];
  mainImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
  likes: number;
  date: string;
  authorName: string;
  authorImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
  authorSocials: AuthorSocials;
  featured?: boolean;
  tags: string[];
  category: {
    title: string;
  };
  related: Array<{
    title: string;
    slug: string;
  }>;
  seoTitle: string;
  seoDescription: string;
  gallery: Array<{
    asset: {
      url: string;
    };
    alt: string;
  }>;
  contentType: string;
  publishStatus: string;
}

export default function PostDetail (){ 
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        const query = `
          *[_type in ["post", "headerPost"] && slug.current == $slug][0] {
            _type, // Add this to differentiate between schemas
            title,
            description,
            body,
            mainImage {
              asset -> { url },
              alt
            },
            likes,
            date,
            authorName,
            authorImage {
              asset -> { url },
              alt
            },
            authorSocials {
              twitter,
              instagram
            },
            featured,
            tags,
            category -> { title },
            related[] -> { title, slug },
            seoTitle,
            seoDescription,
            gallery[] -> { asset -> { url }, alt },
            contentType,
            publishStatus
          }`;

        try {
          const data = await client.fetch(query, { slug });
          if (!data) {
            console.error('No data found for the provided slug');
          } else {
            setPost(data);
          }
        } catch (error) {
          console.error('Error fetching post details:', error);
        }
      };

      fetchPost();
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#2c3e50] to-[rgb(250,250,97)]">
        <p className="text-center text-white text-2xl">Loading posts...</p>
      </div>
    );
  }
  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <Head>
        <title>{post.seoTitle || post.title}</title>
        <meta name="description" content={post.seoDescription || post.description} />
      </Head>
      <main className="flex-1">
        <section className="relative bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src={post.mainImage.asset.url}
              alt={post.mainImage.alt}
              className="w-full h-72 object-cover md:h-80 lg:h-96 xl:h-[32rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            {post.featured && (
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </div>
            )}
          </div>
          <div className="p-6 space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{post.title}</h1>
            <p className="text-gray-700">{post.description}</p>
            <div className="flex items-center space-x-4">
              {post.authorImage?.asset.url && (
                <img
                  src={post.authorImage.asset.url}
                  alt={post.authorImage.alt || 'Author Image'}
                  className="w-12 h-12 object-cover rounded-full"
                />
              )}
              <div>
                <p className="text-gray-500 text-sm">{post.authorName} | {new Date(post.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="prose prose-gray mb-6">
              {post.body.map((block: any, index: number) => {
                switch (block._type) {
                  case 'block':
                    return (
                      <p key={index}>
                        {block.children.map((child: any, childIndex: number) => (
                          <span key={childIndex}>{child.text}</span>
                        ))}
                      </p>
                    );
                  case 'image':
                    return (
                      <img
                        key={index}
                        src={urlFor(block.asset).url()}
                        alt={block.alt || 'Image'}
                        className="my-4 w-full md:w-1/2 lg:w-1/3" // Adjust width as needed
                      />
                    );
                  default:
                    return null;
                }
              })}
            </div>
            <section className="border-t pt-6">
              {post.authorSocials?.twitter || post.authorSocials?.instagram ? (
                <div className="flex flex-wrap gap-4">
                  {post.authorSocials?.twitter && (
                    <a href={post.authorSocials.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Twitter
                    </a>
                  )}
                  {post.authorSocials?.instagram && (
                    <a href={post.authorSocials.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
                      Instagram
                    </a>
                  )}
                </div>
              ) : null}
            </section>
            <section className="border-t pt-6">
  <h3 className="text-xl font-semibold mb-4">Share this post</h3>
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      Facebook
    </button>

    <button
      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
      className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500"
    >
      Twitter
    </button>

    <button
      onClick={() => window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(post.mainImage.asset.url)}&description=${encodeURIComponent(post.title)}`, '_blank')}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
    >
      Pinterest
    </button>

    <button
      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
    >
      LinkedIn
    </button>

    <button
      onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`, '_blank')}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      WhatsApp
    </button>

    <button
      onClick={() => window.open(`https://reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')}
      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
    >
      Reddit
    </button>

    <button
      onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Telegram
    </button>
  </div>
            </section>
            <Comment postSlug={Array.isArray(slug) ? slug[0] : slug} />

          </div>
          <section/>
          <Link href="/allpost" legacyBehavior>
        <a className="block text-center my-8 text-blue-600 hover:underline">
          Read More Top Stories
        </a>
      </Link>
          <section/>
        </section>
        <aside className="p-6">
          <section className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Politics', 'Technology', 'Sports', 'Entertainment', 'Health', 'Lifestyle', 'Science', 'Finance', 'Education'].map((item, index) => (
                <li key={index}>
                  <Link href={`/category/${item}`} className="text-blue-600 hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </main>
      <Footer Country={null} socialMedia={[]} categories={[]} tags={[]} newsletter={{
        title: '',
        description: '',
        placeholder: '',
        buttonText: ''
      }} />
    </div>
  );
}



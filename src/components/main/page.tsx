/* eslint-disable @next/next/no-img-element */
'use client'
import Head from 'next/head';
import Image from 'next/image';
import styles from './main.module.scss';
import Index2 from '../postcard/index2';
import Index4 from '../postcard/index4';
import Index from '../postcard/index';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

type carouselItems = {
  imgSrc: string,
  title: string,
  description: string,
  author: string,
  link: string
}

export default function Home() {
  const { Card } = useParams();
  const [PostCard, setPostCard] = useState<any>();

  const carousel: carouselItems[] = Array.from({ length: 15 }).map((_, index) => ({
    imgSrc: `https://picsum.photos/800/600?random=${index}`, // Adjusted image size for better visibility
    title: `Exciting News from editors picks ${PostCard || 'title'}`,
    description: `This is the editor's favorite picks from ${PostCard || 'description'}`,
    author: `This is written by ${PostCard || 'author'} ${index + 1}`,
    link: `/blog/${index + 1}` // Added unique link for each slide
  }));

  return (
    <div className={styles.container}>
      <main className="container mx-auto my-8 px-4 overflow-hidden">
        <div className="flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-2/3 mb-8 lg:mb-0 overflow-hidden">
            <Link href="/blog" legacyBehavior>
              <a className="group">
                <div className="relative mb-8 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="https://images.stockcake.com/public/9/6/d/96d855e1-2fce-42cb-8d38-956094344316_large/news-studio-scene-stockcake.jpg"
                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500"
                    alt="Featured Post"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-75 transition-all duration-500"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="font-bold text-white px-3 py-1 rounded text-sm">Featured</span>
                    <h3 className="text-3xl font-bold text-white mt-4">How to Create Stunning Visuals for Your Blog</h3>
                    <p className="text-white mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                    <p className="text-white text-sm mt-4"><small className="text-gray-300">Sora Blogging Tips | June 11, 2022</small></p>
                  </div>
                </div>
              </a>
            </Link>

            <h2 className="text-4xl font-bold text-center mb-6">Top Stories</h2>
            <div className="grid gap-8">
              <Index />
            </div>
            <Link href="/blog" legacyBehavior>
              <a className="block text-center my-8 text-blue-600 hover:underline">Read More Top Stories</a>
            </Link>

            <h2 className="text-4xl font-bold text-center mb-6">Editors Pick</h2>
            <div className="my-12 overflow-hidden">
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                width={400}
                height={400}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {carousel.map((item, index) => (
                  <SwiperSlide key={index} className="relative flex flex-col items-center overflow-hidden">
                    <img src={item.imgSrc} alt={item.title} className="w h-auto object-cover"/>
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-black bg-opacity-50 text-white">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-center mb-4">{item.description}</p>
                      <p className="text-center mb-4"><small className="text-gray-300">{item.author}</small></p>
                      <Link href={item.link} legacyBehavior>
                        <a className="text-blue-400 hover:underline">Read More</a>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="grid gap-8">
              <Index />
            </div>
          </div>

          <aside className="w-full lg:w-1/3 lg:ml-8 overflow-hidden">
            <Index2 />
          </aside>
        </div>
        <div>
          <Index4/>
        </div>
        <div>
        <Index/>
        </div>
      </main>
    </div>
  );
}

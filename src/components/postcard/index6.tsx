/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import client from '@/app/utils/sanityClient';

type CarouselItem = {
  imgSrc: string;
  title: string;
  description: string;
  author: string;
  link: string;
};

type EditorPick = {
  title: string;
  picks: {
    title: string;
    slug: { current: string };
    mainImage: {
      asset: {
        url: string;
      };
    };
    authorName:string;
    description: string;
  }[];
};


const query = `*[_type == "editorPicks"][0] {
  title, 
  picks[]->{
    title,
    slug,
    mainImage{
      asset->{
        url
      }
    },
    authorName, // Updated from author->name to authorName
    description
  }
}`;


export default function Editor() {
  const [postCard, setPostCard] = useState<EditorPick | null>(null);
    // Randomly shuffle the array using Fisher-Yates algorithm to ensure unbiased randomness
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchEditorsPick = async () => {
      try {
        const editor: EditorPick = await client.fetch<EditorPick>(query); // Fetch single EditorPick
        const shuffledPicks = shuffleArray(editor.picks); // Shuffle the 'picks' array
        setPostCard({
          ...editor, // Keep the rest of the EditorPick data intact
          picks: shuffledPicks.slice(0, 8), // Set the shuffled and sliced 'picks'
        });
        console.log('editors', editor);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchEditorsPick();
  }, []);
  

  const carousel: CarouselItem[] =
    postCard?.picks.map((item) => ({
      imgSrc: item.mainImage.asset.url,
      title: item.title,
      description: item.description,
      author: item.authorName || 'Unknown',
      link: `/blog/${item.slug.current}`,
    })) || [];

  return (
    <div className="container mx-auto">
      <Link href="/category" legacyBehavior>
        <a className="block text-center my-8 text-blue-600 hover:underline">
          Read More Top Stories
        </a>
      </Link>
      <h2 className="text-4xl font-bold text-center mb-6">
        {postCard?.title || 'Editors Pick'}
      </h2>
      <div className="my-12 overflow-hidden">
      <Swiper
  spaceBetween={20}
  loop={true}
  pagination={{ clickable: true }}
  navigation={true}
  modules={[Pagination, Navigation]}
  className="mySwiper"
  breakpoints={{
    0: {
      slidesPerView: 1, // 1 slide on mobile and small screens
    },
    640: {
      slidesPerView: 1, // 1 slide on mobile (small) screens
    },
    768: {
      slidesPerView: 2, // 2 slides on tablet screens
    },
  }}
>
  {carousel.map((item, index) => (
    <SwiperSlide
      key={index}
      className="flex flex-col items-center overflow-hidden"
    >
      <div className="relative w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={item.imgSrc}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-black bg-opacity-50 text-white">
          <h3 className="text-lg font-bold mb-2">{item.title}</h3>
          <p className="text-center mb-2">{item.description}</p>
          <p className="text-sm text-gray-300 mb-4">By {item.author}</p>
          <Link href={item.link} legacyBehavior>
            <a className="text-blue-400 hover:underline">Read More</a>
          </Link>
        </div>
      </div>
    </SwiperSlide>
  ))}
  </Swiper>
      </div>
    </div>
  );
}

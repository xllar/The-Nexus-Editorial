/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { FaBars } from 'react-icons/fa';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import { useSession } from 'next-auth/react';
import sanityClient from '@/app/utils/sanityClient'; 
import Link from 'next/link';
import Menu from './menu';
interface Country {
  name: string;
  flag: string;
}

interface HeaderProps {
  country: Country | null;
}

export default function Page({ country }: HeaderProps) {
  const { data: session } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);
  const [categories, setCategories] = useState<string[]>([]); // State to hold categories

  console.log('Session:', session);

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    // Fetch categories from Sanity
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{title}`;
      const fetchedCategories = await sanityClient.fetch(query);
      const categoryTitles = fetchedCategories.map((category: { title: string }) => category.title);
      setCategories(categoryTitles);
    };

    fetchCategories();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>NEWS<span>ROOM</span></h1>
        <p className={styles.tagline}>Your daily source of fresh news</p>
      </div>
      <nav className={`${styles.nav} ${menuVisible ? styles.mobileNavVisible : ''}`}>
        <ul>
          <li><a href="#">Home</a></li>

          {categories.map((category, index) => (
            <li key={index}>
              <Link href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                {category}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.userMenu}>
          <div className={styles.notifications}>
            <button title="Notifications">🔔</button>
          </div>
          <div className={styles.nig}>
            {country ? (
              <>
                <p>{country.name}</p>
                <img src={country.flag} alt="" width={20} height={20} />
              </>
            ) : (
              <p>...loading</p>
            )}
          </div>
          <div className={styles.profile}>
            {session ? (
              <div>
                {session.user?.image && (
                  <img src={session.user?.image} alt={session.user?.id} />
                )}
                <span>{session.user?.name}</span>
                <RiArrowDropDownFill />
              </div>
            ) : (
              <div>
                <RiAccountPinCircleLine />
                <RiArrowDropDownFill />
              </div>
            )}
            <div className={styles.dropdown}>
              <Menu />
            </div>
          </div>
        </div>
      </nav>
      <button className={styles.hamburgerMenu} onClick={toggleMenuVisibility}>
        <FaBars />
      </button>
    </header>
  );
}

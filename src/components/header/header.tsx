/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react';
import styles from './style.module.scss';
import { FaSearch, FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import Menu from './menu';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import { useSession } from 'next-auth/react';

interface Country{
    name: string
    flag: string
}
interface HeaderProps {
    country : Country | null
}
export default function Page({country}:HeaderProps){
    const {data:session}=useSession()
    const [searchVisible, setSearchVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isLoggedIn, setisLoggedIn] = useState(false);

    console.log('Session:', session);

    const toggleSearchVisibility = () => {
        setSearchVisible(!searchVisible);
    };

    const toggleMenuVisibility = () => {
        setMenuVisible(!menuVisible);
    };




    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1>NEWS<span>ROOM</span></h1>
                <p className={styles.tagline}>Your daily source of fresh news</p>
            </div>
            <nav className={`${styles.nav} ${menuVisible ? styles.mobileNavVisible : ''}`}>
                <ul>
                   <li><a href="#">Home</a></li>
                    <li><a href="#">World</a></li>
                    <li><a href="#">Politics</a></li>
                    <li><a href="#">Technology</a></li>
                    <li><a href="#">Sports</a></li>
                    <li><a href="#">Entertainment</a></li>
                    <li><a href="#">Health</a></li>
                    <li><a href="#">Science</a></li>
                </ul>
                <div className={styles.searchContainer}>
                    <button title="Search" onClick={toggleSearchVisibility}>
                        {searchVisible ? <IoMdClose /> : <FaSearch />}
                    </button>
                    {searchVisible && (
                        <div className={styles.searchInput}>
                            <input type="text" placeholder="Search..." />
                        </div>
                    )}
                </div>
                <div className={styles.userMenu}>
                    <div className={styles.notifications}>
                        <button title="Notifications">🔔</button>
                    </div>
                    <div className={styles.nig}>
                        {
                           country ? (
                            <>
                            <p>{country.name}</p>
                            <img src={country.flag} alt="" width={20} height={20} /></>
                           ):(
                            <p>...loading</p>
                           )
                        }
                 
                    </div>
                    <div className={styles.profile}>
                        { session ? (
                              <div>
                                {
                                    session.user?.image && (
                                        <img src={session.user?.image} alt={session.user?.id} />  
                                    )
                                }
                              <span>{session.user?.name}</span>
                              <RiArrowDropDownFill/>
                          </div> 
                        ): (
                            <div>
                            <RiAccountPinCircleLine/>
                            <RiArrowDropDownFill/>
                         </div>
                        )}
                        <div className={styles.dropdown}>
                          <Menu/>
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

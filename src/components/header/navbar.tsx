import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import styles from './navbar.module.scss';
import Link from 'next/link';

export default function Icon() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarNav}>
                <Link href={'/'} legacyBehavior>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>Home</a>
                </li>
                </Link>
                <Link href={'../../category/[category].tsx/'} legacyBehavior>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}> Category</a>
                </li>
                </Link>
                <Link href={'../../about-us'} legacyBehavior>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>About</a>
                </li>
                </Link>

                <Link href={'../../contact-us'} legacyBehavior>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>Contact Us</a>
                </li>
                </Link>
            </ul>
            <ul className={styles.socialNav}>
                <li className={styles.navItem}>
                    <a href="#" className={`${styles.navIcon} ${styles.facebook}`}><FaFacebook /></a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={`${styles.navIcon} ${styles.twitter}`}><FaTwitter /></a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={`${styles.navIcon} ${styles.instagram}`}><FaInstagram /></a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={`${styles.navIcon} ${styles.linkedin}`}><FaLinkedin /></a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={`${styles.navIcon} ${styles.youtube}`}><FaYoutube /></a>
                </li>
            </ul>
        </nav>
    );
}

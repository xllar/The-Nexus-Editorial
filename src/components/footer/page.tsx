/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import client from '@/app/utils/sanityClient';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { signIn, signOut, useSession } from 'next-auth/react';

interface Country {
  flag: string;
  name: string;
}

interface FooterProps {
  Country: Country | null;
  socialMedia: { platform: string; url: string }[];
  categories: { title: string }[];
  tags: { title: string }[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
}

const fetchFooterData = async () => {
  const query = `*[_type == "footer"][0] {
    title,
    description,
    socialMedia[] {
      platform,
      url
    },
    categories[]->{
      title
    },
    tags,  // Fetching tags as an array of strings
    newsletter {
      title,
      description,
      placeholder,
      buttonText  // Ensure this field exists in your schema
    },
    country {
      flag,
      name
    }
  }`;

  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
};

export default function Footer({ Country }: FooterProps) {
  const [footerData, setFooterData] = useState<FooterProps | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const getFooterData = async () => {
      const data = await fetchFooterData();
      setFooterData(data);
    };
    getFooterData();
  }, []);

  if (!footerData) {
    return <div>Loading...</div>;
  }

  const { newsletter, categories, tags } = footerData;

  return (
    <div className={`container-fluid ${styles.footerContainer}`}>
      <div className="row">
        {/* Brand Section */}
        <div className="col-lg-3 col-md-6 mb-5">
          <a href="index.html" className="navbar-brand">
            <h1 className={`mb-2 mt-n2 display-5 text-uppercase ${styles.brand}`}>
              News<span className={styles.primary}>Room</span>
            </h1>
          </a>
          <p>{newsletter.description}</p>
          <div className="d-flex justify-content-start mt-4">
            <div className={styles.socialIcons}>
              <a href="#" className={styles.facebook}><FaFacebook /></a>
              <a href="#" className={styles.twitter}><FaTwitter /></a>
              <a href="#" className={styles.instagram}><FaInstagram /></a>
              <a href="#" className={styles.linkedin}><FaLinkedin /></a>
              <a href="#" className={styles.youtube}><FaYoutube /></a>
              {Country ? (
                <>
                  <span>{Country.name}</span>
                  <img src={Country.flag} alt="country flag" width={10} height={10} />
                </>
              ) : (
                <div><p>....loading</p></div>
              )}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="col-lg-3 col-md-6 mb-5">
          <h4 className="font-weight-bold mb-4">Categories</h4>
          <div className="d-flex flex-wrap m-n1">
            {categories.map((category, index) => (
              <a key={index} className={`${styles.categoryButton}`}>{category.title}</a>
            ))}
          </div>
        </div>

        {/* Tags Section */}
        <div className="col-lg-3 col-md-6 mb-5">
          <h4 className="font-weight-bold mb-4">Tags</h4>
          <div className="d-flex flex-wrap m-n1">
            {tags?.map((tag: any, index: number) => (
              <a key={index} className={`${styles.categoryButton}`}>{tag}</a>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="col-lg-3 col-md-6 mb-5">
          {session ? (
            <div className={`container-fluid py-4 px-sm-3 px-md-5 ${styles.newsletterContainer}`}>
              <div className={styles.newsletter}>
                <h5 className="font-weight-bold">{newsletter.title}</h5>
                <p>{newsletter.description}</p>
                <form className="d-flex">
                  <input
                    type="email"
                    className={styles.newsletterInput}
                    placeholder={newsletter.placeholder}
                    value={session?.user?.email ?? ""}
                    readOnly
                  />
                  <button type="submit" className={styles.newsletterButton}>
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className={`container-fluid py-4 px-sm-3 px-md-5 ${styles.newsletterContainer}`}>
              <div className={styles.newsletter}>
                <h5 className="font-weight-bold">{newsletter.title}</h5>
                <p>{newsletter.description}</p>
                <p>Please <a href="/signin" className={styles.signinLink}>sign in</a> to subscribe to our newsletter.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Rights */}
      <div className={styles.right}>
        <p className="m-0 text-center">
          &copy; <a className="font-weight-bold" href="#">NEWROOM</a>. All Rights Reserved. {new Date().getFullYear()}.
          Designed by <a className="font-weight-bold" href="https://htmlcodex.com">xlngr</a>
        </p>
      </div>
    </div>
  );
}

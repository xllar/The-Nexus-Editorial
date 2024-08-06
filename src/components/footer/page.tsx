/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './style.module.scss';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
interface country{
   flag:string,
   name:string 
}

interface FooterProps{
    Country:country | null
}
export default function Footer({Country}:FooterProps) {
    
    return (
        <div className={`container-fluid ${styles.footerContainer}`}>
            <div className="row">
                <div className="col-lg-3 col-md-6 mb-5">
                    <a href="index.html" className="navbar-brand">
                        <h1 className={`mb-2 mt-n2 display-5 text-uppercase ${styles.brand}`}>News<span className={styles.primary}>Room</span></h1>
                    </a>
                    <p>Volup amet magna clita tempor. Tempor sea eos vero ipsum. Lorem lorem sit sed elitr sed kasd et</p>
                    <div className="d-flex justify-content-start mt-4">
                    <div className={styles.socialIcons}>
                    <a href="#" className={styles.facebook}><FaFacebook /></a>
                    <a href="#" className={styles.twitter}><FaTwitter /></a>
                    <a href="#" className={styles.instagram}><FaInstagram /></a>
                    <a href="#" className={styles.linkedin}><FaLinkedin /></a>
                    <a href="#" className={styles.youtube}><FaYoutube /></a>
                    {
                        Country ? (
                            <>
                            <span>{Country.name}</span>
                            <img src={Country.flag} alt="country flag" width={10} height={10} />
                            </>
                        ):(
                            <div>
                             <p>....loading</p>
                            </div>
                        )
                    }
                   
                </div>

                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-5">
                    <h4 className="font-weight-bold mb-4">Categories</h4>
                    <div className="d-flex flex-wrap m-n1">
                        <a href="" className={`${styles.categoryButton}`}>Politics</a>
                        <a href="" className={`${styles.categoryButton}`}>Business</a>
                        <a href="" className={`${styles.categoryButton}`}>Corporate</a>
                        <a href="" className={`${styles.categoryButton}`}>Sports</a>
                        <a href="" className={`${styles.categoryButton}`}>Health</a>
                        <a href="" className={`${styles.categoryButton}`}>Education</a>
                        <a href="" className={`${styles.categoryButton}`}>Science</a>
                        <a href="" className={`${styles.categoryButton}`}>Technology</a>
                        <a href="" className={`${styles.categoryButton}`}>Foods</a>
                        <a href="" className={`${styles.categoryButton}`}>Entertainment</a>
                        <a href="" className={`${styles.categoryButton}`}>Travel</a>
                        <a href="" className={`${styles.categoryButton}`}>Lifestyle</a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-5">
                    <h4 className="font-weight-bold mb-4">Tags</h4>
                    <div className="d-flex flex-wrap m-n1">
                        <a href="" className={`${styles.categoryButton}`}>Politics</a>
                        <a href="" className={`${styles.categoryButton}`}>Business</a>
                        <a href="" className={`${styles.categoryButton}`}>Corporate</a>
                        <a href="" className={`${styles.categoryButton}`}>Sports</a>
                        <a href="" className={`${styles.categoryButton}`}>Health</a>
                        <a href="" className={`${styles.categoryButton}`}>Education</a>
                        <a href="" className={`${styles.categoryButton}`}>Science</a>
                        <a href="" className={`${styles.categoryButton}`}>Technology</a>
                        <a href="" className={`${styles.categoryButton}`}>Foods</a>
                        <a href="" className={`${styles.categoryButton}`}>Entertainment</a>
                        <a href="" className={`${styles.categoryButton}`}>Travel</a>
                        <a href="" className={`${styles.categoryButton}`}>Lifestyle</a>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-5">
                <div className={`container-fluid py-4 px-sm-3 px-md-5 ${styles.newsletterContainer}`}>
                <div className={styles.newsletter}>
                    <h5 className="font-weight-bold">Subscribe to our Newsletter</h5>
                    <p>Get the latest news and updates right in your inbox.</p>
                    <form className="d-flex">
                        <input type="email" className={styles.newsletterInput} placeholder="Enter your email" />
                        <button type="submit" className={styles.newsletterButton}>Subscribe</button>
                    </form>
                </div>
            </div>
                </div>
            </div>
        <div className={styles.right}>
            <p className="m-0 text-center">
                    &copy; <a className="font-weight-bold" href="#">NEWROOM</a>. All Rights Reserved.
                    Designed by <a className="font-weight-bold"href="https://htmlcodex.com">xlngr</a>
                </p>
            </div>
        </div>
    );
};


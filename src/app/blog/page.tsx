/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import styles from './PostDetail.module.scss';
import Index3 from '../../components/postcard/index3';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/page';
import Index from '@/components/postcard/index';
import Index4 from '@/components/postcard/index4';
import Link from 'next/link';
export default function PostDetail() {
  return (
    <div className={styles.container}>
      <header>
        <Navbar/>
      </header>
      <Head>
        <title>Post Detail - How to Create Stunning Visuals for Your Blog</title>
        <meta name="description" content="Detailed post on creating stunning visuals for your blog." />
      </Head>
      <main className="container my-4">
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card mb-4 position-relative">
              <div className="image-container position-relative">
                <img 
                  src="https://images.stockcake.com/public/9/6/d/96d855e1-2fce-42cb-8d38-956094344316_large/news-studio-scene-stockcake.jpg" 
                  className="card-img-top" 
                  alt="Featured Post" 
                  width={800} 
                  height={400} 
                />
                <div className="overlay"></div>
              </div>
              <div className="card-img-overlay d-flex flex-column justify-content-end">
                <span className="badge bg-orange text-white">Featured</span>
                <h3 className="card-title mt-2 text-white">How to Create Stunning Visuals for Your Blog</h3>
                <p className="card-text text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                <p className="card-text text-white"><small className="text-muted">Sora Blogging Tips | June 11, 2022</small></p>
              </div>
            </div>

            <article className="post-content">
              <h2 className="text-center">How to Create Stunning Visuals for Your Blog</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s...</p>
              {/* Add more paragraphs or content as needed */}
              <section className="author-info my-4 p-3 border rounded">
                <h4>About the Author</h4>
                <p><strong>Sora Blogging Tips</strong></p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
              </section>
              <section className="social-share my-4">
                <h4>Share this post</h4>
                <div className="d-flex">
                  <button className="btn btn-primary me-2">Facebook</button>
                  <button className="btn btn-info me-2">Twitter</button>
                  <button className="btn btn-danger me-2">Pinterest</button>
                  <button className="btn btn-secondary">LinkedIn</button>
                </div>
              </section>
            </article>

            <section className="comments-section my-4">
              <h3>Comments</h3>
              {/* Placeholder for comments */}
              <div className="comment mb-3 p-3 border rounded">
                <p><strong>John Doe:</strong> This is an amazing post! Very informative.</p>
              </div>
              {/* Add a form to submit new comments */}
              <form className="comment-form mt-3">
                <div className="form-group">
                  <label htmlFor="comment">Leave a Comment:</label>
                  <textarea className="form-control" id="comment" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
              </form>
            </section>
          <section className="related-posts my-12 px-4 lg:px-0  from-gray-800 to-gray-400 py-12">
            <h3 className="text-4xl font-extrabold text-center mb-12 text-blue tracking-wide uppercase">Related Posts</h3>
            <Index/>
          </section>

          </div>

          <aside className="col-lg-4 mb-4">
            <section className="categories mb-4">
            <h4>Categories</h4>
              {
            ['Politics','Technology','Sports','Entertainment', 'Health', 'Lifestyle','Science', 'Finance', 'Education']
            .map((item, index)=>(
              <Link href={'../category/[category].tsx'} key={index}>
              <ul className="list-group">
                <li className="list-group-item">{item}</li>
              </ul>
              </Link>
            ))

              }
            </section>
            <section className="tags mb-4">
              <h4>Tags</h4>
              <div className="d-flex flex-wrap">
                <span className="badge bg-primary m-1">HTML</span>
                <span className="badge bg-secondary m-1">CSS</span>
                <span className="badge bg-success m-1">JavaScript</span>
                <span className="badge bg-danger m-1">React</span>
                <span className="badge bg-warning m-1">Next.js</span>
              </div>
            </section>
            <Index3/>
          </aside>
          <section>
            <Index4/>
            <Index/>
          </section>
        </div>
      </main>
      <Footer Country={null}/>
    </div>
  );
}

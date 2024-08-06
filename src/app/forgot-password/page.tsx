/* eslint-disable react/no-unescaped-entities */
// app/forgot-password/page.tsx
'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './styles.module.scss'; // Import the SCSS module
import Footer from '@/components/footer/page';
import Navbar from '@/components/header/navbar';
import axios from 'axios';
import ClipLoader from 'react-spinners/FadeLoader';

export default function ForgotPasswordPage(){
 const [error, setError]= useState('');
 const [success, setSuccess]=useState('');
 const [setLoading, setIsLoading]=useState(false);

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
});
const initialValues = {
  email: '',
};

// form submission
const handleSubmit = async (values: typeof initialValues) => {
  setIsLoading(true)
  try {
    const res = await axios.post('/api/auth/forgot', values);
    console.log('Forgot password:', res.data);
    setSuccess('Successful: Check your email for the password reset link.');
    setError('');
    alert('Check your email for a password reset link.');
  } catch (error) {
    console.error('Error during password reset:', error);
    setError('An error occurred while trying to reset your password.');
    setSuccess('');
  }
  setIsLoading(false);
};

  return (
    <>
           {setLoading && (
      <div className={styles.spinnerOverlay}>
        <ClipLoader color="#2f82ff" size={100} />
      </div>
    )}
       <Navbar/>
     <div className={styles.container}>
          <div className={styles.card}>
              <h1 className={styles.title}>Forgot Your Password?</h1>
              <p className={styles.description}>
                  Enter your email address below and we'll send you a link to reset your password.
              </p>
              <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
              >
                  <Form className={styles.form}>
                      <div className={styles.inputGroup}>
                          <label htmlFor="email" className={styles.label}>Email:</label>
                          <Field
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Enter your email"
                              className={styles.input} />
                          <ErrorMessage name="email" component="div" className={styles.error} />
                      </div>
                      <button type="submit" className={styles.button}>Send Reset Link</button>
                      {success && <div className={styles.success}>{success}</div>}
                      {error && <div className={styles.error}>{error}</div>}
                  </Form>
              </Formik>
              <div className={styles.backToLogin}>
                  <FaArrowLeft className={styles.arrowIcon} />
                  <p className={styles.loginLink}>
                      Forgot your password? <a className={styles.loginLinks} href="/signIn">Login instead.</a>
                  </p>
              </div>
          </div>
      </div>
        <Footer Country={null} />
    </>
  );
};



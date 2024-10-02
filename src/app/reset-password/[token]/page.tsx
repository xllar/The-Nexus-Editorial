'use client'
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './styles.module.scss'; // Import the SCSS module
import Footer from '@/components/footer/page';
import Navbar from '@/components/header/navbar';
import ClipLoader from 'react-spinners/FadeLoader';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Get the token from the params
    setToken(params.token);
  }, [params.token]);

  const validationSchema = Yup.object({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    if (!token) {
      setError('Invalid or missing token');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/reset', { token, password: values.password });
      setSuccess('Password reset successfully.');
      setError('');
      setTimeout(() => router.push('/'), 2000); // Redirect to home after success
    } catch (error) {
      console.error('Error during password reset:', error);
      setError('An error occurred while trying to reset your password.');
      setSuccess('');
    }
    setIsLoading(false);
  };

  return (
    <>
         {isLoading && (
        <div className={styles.spinnerOverlay}>
          <ClipLoader color="#2f82ff" loading={isLoading} height={35} width={35} /> {/* Adjust size here */}
        </div>
      )}
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Reset Your Password</h1>
          <p className={styles.description}>
            Enter a new password below to reset your password.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>New Password:</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your new password"
                  className={styles.input}
                />
                <ErrorMessage name="password" component="div" className={styles.error} />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password:</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  className={styles.input}
                />
                <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
              </div>
              <button type="submit" className={styles.button}>Reset Password</button>
              {success && <div className={styles.success}>{success}</div>}
              {error && <div className={styles.error}>{error}</div>}
            </Form>
          </Formik>
        </div>
      </div>
      <Footer Country={null} socialMedia={[]} categories={[]} tags={[]} newsletter={{
        title: '',
        description: '',
        placeholder: '',
        buttonText: ''
      }} />
    </>
  );
}

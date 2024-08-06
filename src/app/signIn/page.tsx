/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BiUser, BiLock, BiShow, BiHide, BiLogoFacebook, BiLogoGoogle, BiLogoTwitter, BiLogoGithub, BiLogoApple } from 'react-icons/bi';
import Footer from '@/components/footer/page';
import Header from '@/components/header/navbar';
import styles from './styles.module.scss';
import ClipLoader from 'react-spinners/FadeLoader';
import  {useRouter}  from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";


function SignInSignUp() {
  const router = useRouter();
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [IsLoading, SetIsLoading] = useState(false);
  const { data: session } = useSession();


  const togglePasswordVisibility = () => setShow(!show);
  const toggleConfirmPasswordVisibility = () => setShowConfirm(!showConfirm);
  
  const signUpForm = useFormik({
    initialValues: { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      SetIsLoading(true)
      try {
        const response = await axios.post('/api/auth/signUp', values);
        console.log('Registration successful:', response.data);
        setSuccessMessage('Registration successful!'); // Set success message on success
        setErrorMessage(''); // Clear error message on success
        // Handle success (e.g., show a message, redirect, etc
      } catch (error) {
        console.error('Registration error:', error);
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response ? error.response.data.error : 'An error occurred during registration.');
        } else {
          setErrorMessage('An unexpected error occurred.');
          console.log(setErrorMessage)
        }
        setSuccessMessage(''); // Clear success message on error
      }finally{
        SetIsLoading(false)
      }
    }
    
  });

  const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const signInForm = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      SetIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
  
      try {
        // Call NextAuth signIn function
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
  
        if (result?.error) {
          // Handle sign-in error
          setErrorMessage(result.error);
          setSuccessMessage(''); // Clear success message on error
        } else {
          // Handle successful sign-in
          setSuccessMessage('Sign-in successful');
          setTimeout(() => {
            router.push('/'); // Redirect after successful sign-in
          }, 2000);
        }
      } catch (error) {
        console.error('SignIn error:', error);
  
        setErrorMessage(
          'An unexpected error occurred during the sign-in process.'
        );
        setSuccessMessage(''); // Clear success message on error
      } finally {
        SetIsLoading(false);
      }
    },
  });
  


  return (
    <div className={styles.body}>
       {IsLoading && (
      <div className={styles.spinnerOverlay}>
        <ClipLoader color="#2f82ff" size={100} />
      </div>
    )}
      <div>
        <Header />
      </div>
      <div className={styles.mainContainer}>
        <div className={`${styles.container} ${rightPanelActive ? styles.rightPanelActive : ''}`}>
          <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
            <form className={styles.form} onSubmit={signUpForm.handleSubmit}>
              <h1>Create Account</h1>
              <div className={styles.socialContainer}>
                <a className={`${styles.social} ${styles.facebook}`} onClick={()=>signIn('facebook')}><BiLogoFacebook /></a>
                <a className={`${styles.social} ${styles.google}`} onClick={()=>signIn('google')}><BiLogoGoogle /></a>
                <a className={`${styles.social} ${styles.twitter}`} onClick={()=>signIn('twitter')}><BiLogoTwitter /></a>
                <a className={`${styles.social} ${styles.github}`} onClick={()=>signIn('github')}><BiLogoGithub /></a>
                <a className={`${styles.social} ${styles.apple}`} onClick={()=>signIn('apple')}><BiLogoApple /></a>
                <a className={`${styles.social} ${styles.auth0}`} onClick={()=>signIn('auth0')}>
                  <img src="data:image/png;base64,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"
                   alt=""
                   width={10} height={10} />
                </a>
              </div>
              <span className={styles.smallSpan}>or use your email for registration</span>
              <div className={styles.inputContainer}>
                <BiUser className={styles.icon} />
                <input type="text" name="firstname" placeholder="First Name" className={styles.input} onChange={signUpForm.handleChange} onBlur={signUpForm.handleBlur} value={signUpForm.values.firstname} />
                {signUpForm.errors.firstname && signUpForm.touched.firstname ? <span className={styles.errorSpan}>{signUpForm.errors.firstname}</span> : null}
              </div>
              <div className={styles.inputContainer}>
                <BiUser className={styles.icon} />
                <input type="text" name="lastname" placeholder="Last Name" className={styles.input} onChange={signUpForm.handleChange} onBlur={signUpForm.handleBlur} value={signUpForm.values.lastname} />
                {signUpForm.errors.lastname && signUpForm.touched.lastname ? <span className={styles.errorSpan}>{signUpForm.errors.lastname}</span> : null}
              </div>
              <div className={styles.inputContainer}>
                <BiUser className={styles.icon} />
                <input type="email" name="email" placeholder="Email" className={styles.input} onChange={signUpForm.handleChange} onBlur={signUpForm.handleBlur} value={signUpForm.values.email} />
                {signUpForm.errors.email && signUpForm.touched.email ? <span className={styles.errorSpan}>{signUpForm.errors.email}</span> : null}
              </div>
              <div className={styles.inputContainer}>
                <BiLock className={styles.icon} />
                <input type={show ? 'text' : 'password'} name="password" placeholder="Password" className={styles.input} onChange={signUpForm.handleChange} onBlur={signUpForm.handleBlur} value={signUpForm.values.password} />
                {show ? <BiShow className={styles.showHideIcon} onClick={togglePasswordVisibility} /> : <BiHide className={styles.showHideIcon} onClick={togglePasswordVisibility} />}
                {signUpForm.errors.password && signUpForm.touched.password ? <span className={styles.errorSpan}>{signUpForm.errors.password}</span> : null}
              </div>
              <div className={styles.inputContainer}>
                <BiLock className={styles.icon} />
                <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" className={styles.input} onChange={signUpForm.handleChange} onBlur={signUpForm.handleBlur} value={signUpForm.values.confirmPassword} />
                {showConfirm ? <BiShow className={styles.showHideIcon} onClick={toggleConfirmPasswordVisibility} /> : <BiHide className={styles.showHideIcon} onClick={toggleConfirmPasswordVisibility} />}
                {signUpForm.errors.confirmPassword && signUpForm.touched.confirmPassword ? <span className={styles.errorSpan}>{signUpForm.errors.confirmPassword}</span> : null}
              </div>
              <button type="submit" className={styles.button}>Sign Up</button>
              <div className={styles.message}>
                {successMessage && <div className={styles.success}>{successMessage}</div>}
                {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            </div>
            </form>
          </div>
          <div className={`${styles.formContainer} ${styles.signInContainer}`}>
            <form className={styles.form} onSubmit={signInForm.handleSubmit}>
              <h1>Sign in</h1>
              <div className={styles.socialContainer}>
                <a className={`${styles.social} ${styles.google}`} onClick={()=>signIn('google')}><BiLogoGoogle /></a>
                <a className={`${styles.social} ${styles.twitter}`} onClick={()=>signIn('twitter')}><BiLogoTwitter /></a>
                <a className={`${styles.social} ${styles.github}`} onClick={()=>signIn('github')}><BiLogoGithub /></a>
                <a className={`${styles.social} ${styles.auth0}`} onClick={()=>signIn('auth0')}>
                  <img src="data:image/png;base64,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"
                   alt=""
                   width={10} height={10} />
                </a>
              </div>
              <span className={styles.smallSpan}>or use your account</span>
              <div className={styles.inputContainer}>
                <BiUser className={styles.icon} />
                <input type="email" name="email" placeholder="Email" className={styles.input} onChange={signInForm.handleChange} onBlur={signInForm.handleBlur} value={signInForm.values.email} />
                {signInForm.errors.email && signInForm.touched.email ? <span className={styles.errorSpan}>{signInForm.errors.email}</span> : null}
              </div>
              <div className={styles.inputContainer}>
                <BiLock className={styles.icon} />
                <input type={show ? 'text' : 'password'} name="password" placeholder="Password" className={styles.input} onChange={signInForm.handleChange} onBlur={signInForm.handleBlur} value={signInForm.values.password} />
                {show ? <BiShow className={styles.showHideIcon} onClick={togglePasswordVisibility} /> : <BiHide className={styles.showHideIcon} onClick={togglePasswordVisibility} />}
                {signInForm.errors.password && signInForm.touched.password ? <span className={styles.errorSpan}>{signInForm.errors.password}</span> : null}
              </div>
              <a className={styles.forgotPassword} href="/forgot-password">Forgot your password?</a>
              <button type="submit" className={styles.button}>Sign In</button>
              <div className={styles.message}>
                {successMessage && <div className={styles.success}>{successMessage}</div>}
                {errorMessage && <div className={styles.error}>{errorMessage}</div>}
            </div>
            </form>
          </div>
          <div className={styles.overlayContainer}>
            <div className={styles.overlay}>
              <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                <h1>Welcome Back!</h1>
                <p className={styles.overlayP}>To keep connected with us please login with your personal info</p>
                <button className={styles.ghostButton} onClick={() => setRightPanelActive(false)}>Sign In</button>
              </div>
              <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                <h1>Hello, Friend!</h1>
                <p className={styles.overlayP}>Enter your personal details and start journey with us</p>
                <button className={styles.ghostButton} onClick={() => setRightPanelActive(true)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer Country={null} /> 
    </div>
  );
}

export default SignInSignUp;


  

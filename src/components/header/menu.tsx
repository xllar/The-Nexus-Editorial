/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react';
import styles from './style.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function menu() {
    const{data:session}=useSession()
    
  return (
    <div className={styles.profile}>
      {session ? (
  <div className={styles.dropdown}>
    {session.user?.image ? (
      <img src={session.user.image} alt="User" width={100} height={100} />
    ) : (
      <div>No image available</div>
    )}
    <h3>Welcome back <span>{session.user?.name}</span></h3>
    <p>{session.user?.name} enjoy latest news at your fingertips!</p>
    <ul>
      <li><a onClick={(e) => { e.preventDefault(); signOut(); }}>Sign Out</a></li>
    </ul>
  </div>
) : (
  <div className={styles.dropdown}>
    <h3>Login</h3>
    <p>Login to get verified so as to be open to our various services!</p>
    <ul>
      <li><a href="/signIn">Register</a></li>
      <li><a onClick={(e)=>{e.preventDefault(); signIn();}}>Sign In</a></li>
      <li><a href="/forgot-password">Forget password</a></li>
    </ul>
  </div>
)}
  </div>
  )
}


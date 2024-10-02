'use client'
import Header from '@/components/header/page';
import Main from '@/components/main/page';  
import Footer from '@/components/footer/page';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
interface country{
  name:string
  flag:string
}
export default function Home() {
  const [Country, setCountry]= useState<country | null>(null)
 const {data:session}=useSession()
 console.log(session)

 useEffect(()=>{
  const FetchData = async()=>{
    try{
      const response = await axios.get('https://api.ipregistry.co/?key=ghk8qlfmu33dflet');
      //console.log(response.data)
      const countryData: country={
        name: response.data.location.country.name,
        flag: response.data.location.country.flag.noto
      }
      setCountry(countryData)
    }catch(error){
     console.log('Failed to get api', error)
    }
  
  }
  FetchData()
 },[])

  return (
    <div>
      <Header country={Country }/> 
      <Main /> 
      <Footer Country={Country} socialMedia={[]} categories={[]} tags={[]} newsletter={{
        title: '',
        description: '',
        placeholder: '',
        buttonText: ''
      }}/> 
    </div>
  );
}

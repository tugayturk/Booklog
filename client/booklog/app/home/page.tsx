"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Home = () => {

  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);
  return (
    <div className='text-black'>Home</div>
  )
}

export default Home
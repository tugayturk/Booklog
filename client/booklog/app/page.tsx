"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import LoginForm from "@/components/auth/LoginForm"
import SignupForm from "@/components/auth/SignupForm"
export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLogin, setIsLogin] = useState(true)

  const images = [
    { src: "/book3.webp", alt: "Book3" },
    { src: "/book4.webp", alt: "Book4" },
    { src: "/book1.jpg", alt: "Book1" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 1200)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <main className="min-h-screen flex flex-col items-center ">

      <div className="text-center space-y-4 w-4/5">
        <h1 className="text-5xl font-serif text-primary mt-2">
          BookLog
        </h1>
        <p className="text-primary italic">
          Your quiet place to track, reflect, and remember books.
        </p>
      </div>

      <div className="w-4/5 h-auto lg:h-[75vh] flex flex-col lg:flex-row items-center justify-center lg:justify-around
       bg-miamivice rounded-sm mt-2 z-999 transition-all duration-300 hover:-translate-y-1 py-8 lg:py-0 shadow-xl shadow-gray-500">

        {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignupForm setIsLogin={setIsLogin} />}

        <div className="hidden lg:flex w-[400px] h-[400px] items-center justify-center relative overflow-hidden rounded-md bg-[url(https://upload.wikimedia.org/wikipedia/commons/d/d2/IPad_10.2%E2%80%91inch.png)] bg-contain bg-center bg-no-repeat">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={400}
              height={200}
              className={`h-[340px] w-[260px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 rounded-md ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

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
    <main className="min-h-screen flex flex-col items-center">

      <div className="text-center space-y-4 w-4/5">
        <h1 className="text-5xl font-serif text-primary">
          BookLog
        </h1>
        <p className="text-primary">
          A quiet library for thoughtful readers
        </p>
      </div>


        <div className="w-4/5 h-[70vh] flex items-center justify-around bg-linear-to-b from-blue-300 to-pink-300  rounded-xl mt-2">


          {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignupForm setIsLogin={setIsLogin} />}

          <div className="w-[400px] h-[400px] items-center justify-center flex relative overflow-hidden  rounded-md  ">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                width={400}
                height={200}
                className={`h-[395px] w-[395px] absolute transition-opacity duration-1000 rounded-md ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}
          </div>
      </div>
    </main>
  );
}

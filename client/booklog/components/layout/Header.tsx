import React from 'react'
import { ModeToggle } from '../themeToggle'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='w-full h-18 text-white flex items-center justify-between bg-[#121B28] font-serif'>
    <div className='w-[120px] flex items-center justify-center  ml-2'>
      <h1 className='text-md italic'>BookLog</h1>
    </div>

    <nav className='flex items-center justify-center gap-4 text-sm'>
      <Link className=' pr-1' href="/home">Home</Link>
      <Link className=' pr-1' href="/books">Books</Link>
      <Link className=' pr-1' href="/myLibrary">My Library</Link>
      <Link className=' pr-1' href="/addBook">Add Book</Link>
      <Link className='pr-1' href="/profile">Profile</Link>
      <ModeToggle />
    </nav>
    
  </header>
  )
}

export default Header
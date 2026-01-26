import React from 'react'
import { ModeToggle } from '../themeToggle'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='w-full h-18 bg-primary text-white flex items-center justify-between'>
    <div className='w-[120px] p-2 rounded-tr-lg rounded-bl-lg flex items-center justify-center bg-miamivice ml-2'>
      <h1 className='text-md italic font-serif'>BookLog</h1>
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
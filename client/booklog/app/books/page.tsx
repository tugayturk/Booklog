import BookList from '@/components/card/bookList'
import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Books',
  description: 'Books',
}

const Books = () => {
  return (
    <div className='container mx-auto min-h-[500px] mt-2 mb-8 px-4'>
      <BookList />
    </div>
  )
}

export default Books
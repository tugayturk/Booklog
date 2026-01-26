import React from 'react'
import { ModeToggle } from '../themeToggle'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

const Header = () => {
  return (
    <header className='w-full h-18 text-white flex items-center justify-between bg-[#121B28] font-serif'>
      <div className='w-[120px] flex items-center justify-center  ml-2'>
        <h1 className='text-md italic'>BookLog</h1>
      </div>

      <nav className='flex items-center justify-center gap-4 text-sm mr-2'>
        <div className='hidden lg:flex items-center justify-center gap-4'>
          <Link className=' pr-1' href="/home">Home</Link>
          <Link className=' pr-1' href="/books">Books</Link>
          <Link className=' pr-1' href="/myLibrary">My Library</Link>
          <Link className=' pr-1' href="/addBook">Add Book</Link>
          <Link className='pr-1' href="/profile">Profile</Link>
        </div>
         
          <div className='lg:hidden'> 
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className='text-white cursor-pointer' size="xs">
              <Menu className="h-[1.2rem] w-[1.2rem] " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href="/home">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/books">Books</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/myLibrary">My Library</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem><Link href="/addBook">Add Book</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
</div>
        <ModeToggle />
      </nav>



    </header>
  )
}

export default Header
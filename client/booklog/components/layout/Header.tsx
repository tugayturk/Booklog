import { ModeToggle } from '../themeToggle'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { Input } from '../ui/input'
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react'
import { useRouter } from 'next/navigation'



const Header = () => {

  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/books/search?title=${search}`);
      setSearch("")
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
  }

  return (
    <header className='w-full h-18 text-white flex items-center justify-between bg-[#121B28] font-serif'>
      <div className='w-[120px] flex items-center justify-center  ml-2'>
        <h1 className='text-md italic'>
          <Link href="/home">BookLog</Link>
        </h1>
      </div>

      <div className='hidden relative lg:flex lg:w-[300px] border-b border-gray-300 '>
        <Input value={search} onKeyDown={handleSearchKeyDown} onChange={handleSearch} type="text" placeholder="Search" className='border-none focus-visible:border-none 
        focus-visible:ring-0 focus-visible:ring-offset-0 outline-none' />
        <IoIosSearch className='absolute right-1 top-5 -translate-y-1/2  text-xl' />
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
                  <Link href="/" onClick={handleLogout} className=' cursor-pointer text-black-300'> Log out</Link>
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
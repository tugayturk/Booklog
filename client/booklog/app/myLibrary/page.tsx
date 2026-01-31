import MyLibrary from "./library";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Library',
  description: 'My Library',
}

const MyLibraryPage = () => {
  return (
    <MyLibrary />
  )
}
export default MyLibraryPage;
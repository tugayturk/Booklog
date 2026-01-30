import axios from "axios";

const getBookDetails = async (id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/book/${id}`);
    return response.data;
}

const createReview = async (id:any,data:any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/book/${id}/review`,data,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data
}
const searchBooks = async (search:string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/book/search?title=${search}`);
    return response.data;
}

const getUserLibrary = async (id:string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}/library`);
    return response.data;
}

export { getBookDetails,createReview,searchBooks,getUserLibrary };
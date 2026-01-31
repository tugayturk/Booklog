"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LibraryContext = createContext({});

export const LibraryProvider = ({ children }: { children: React.ReactNode }) => {
    const [library, setLibrary] = useState([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
            }
            if (user) {
                const parsedUser = JSON.parse(user);
                setUserId(parsedUser.id);
            }
        }
    }, []);

    const getUserLibrary = async () => {
        if (!userId) return;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/library`);
        setLibrary(response.data.library);
    }

    useEffect(() => {
        if (userId) {
            getUserLibrary();
        }
    }, [userId]);

    const addBookToLibrary = async (bookId: string) => {
     
        if (!userId) return;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/book/${bookId}/library`, { bookId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        await getUserLibrary();
        return response.data;
    }

    const removeBookFromLibrary = async (bookId: string) => {
        if (!userId) return;
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/book/${bookId}/library`, {
            data: { bookId },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        await getUserLibrary();
        return response.data;
    }

    return <LibraryContext.Provider value={{ library, setLibrary, addBookToLibrary, removeBookFromLibrary }}>{children}</LibraryContext.Provider>;
}

export const useLibrary = () => {
    return useContext(LibraryContext);
}
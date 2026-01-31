import {Review }from "./review"
export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
export type BookDetail = {
  id: string;
  title: string;
  description: string;
  reviews: Review[];
};


export type CreateBook = {
  title: string;
  author: string;
  description: string;
  image: string;
}
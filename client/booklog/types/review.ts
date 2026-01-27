export type Review = {
    id: string;
    user: {
      name: string;
      id: string;
    };
    rating: number;
    review: string;
    createdAt: string;
    book: {
      title: string;
      id: string;
    };
    updatedAt: string;
  };
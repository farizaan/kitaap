export interface IBook {
  _id: string;
  title: string;
  stock: number;
  reviews: IReview[];
  authors: string[];
  price: number;
  category: Categories;
  description: string;
  image: string;
  isPopularNow: boolean;
}
export interface IReview {
  _id: string;
  review: string;
  stars: number;
  userId: string;
}
export type Categories = 'NOVELS' | 'COMICS' | 'FINANCE' | 'SELFHELP' | 'EDUCATIONAL' | '';

export interface IBooksState {
  books?: IBook[];
  popularBooks?: IBook[];
  book?: IBook;
  loading?: boolean;
}

export interface IBooksServicePayload {
  search?: string;
}

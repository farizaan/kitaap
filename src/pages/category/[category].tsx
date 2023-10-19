import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useUserContext } from '@/hooks/useUserContext';
import BookCard from '@/components/BookCard/BookCard';

const Main = styled.main`
  margin: 0 5% 2rem 5%;
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(4, minmax(9.375rem, auto));
  gap: 2rem;
  border-radius: 10px;
  flex-wrap: wrap;

  .container p {
    max-width: 10rem;
  }
`;

const Title = styled.h2`
  text-transform: capitalize;
  margin: 2rem 5% 1rem 5%;
  color: #5e5c5c;
  font-size: 1.25rem;
`;

const Category = () => {
  const router = useRouter();
  const { category } = router.query;
  const [books, setBooks] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/category/${category}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const data = await res.json();
      const newBooks = data.message.map((book) => {
        let bookCopy = book;
        user?.cartItems?.map((item) => {
          if (item.bookId === book._id) {
            bookCopy['isInCart'] = true;
          }
        });
        return bookCopy;
      });
      setBooks(newBooks);
    })();
  }, [category, user]);

  if (user) {
    return (
      <Main>
        <Title>{category}</Title>
        <BookCard books={books} />
      </Main>
    );
  }
  return null;
};

export default Category;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '@/hooks/useUserContext';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import BookCard from '@/components/BookCard/BookCard';

const Container = styled.div`
  margin: 2rem 5%;
`;

const Title = styled.h3`
  color: #5e5c5c;
  font-size: 1.25rem;
`;

const Books = styled.div`
  display: flex;
  gap: 1rem;
  overflow-y: scroll;
  margin-top: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slider: React.FC<{ popularBooks: any[] }> = ({ popularBooks }) => {
  const containerRef = useHorizontalScroll();
  const { user, setUser } = useUserContext();
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const resPopularBooks = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/popularnow`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const dataPB = await resPopularBooks.json();
      console.log(dataPB);
      // @ts-ignore
      const newBooks = dataPB?.message?.map((book) => {
        let bookCopy = book;
        // @ts-ignore
        user?.cartItems?.map((item) => {
          if (item.bookId === book._id) {
            bookCopy['isInCart'] = true;
          }
        });
        return bookCopy;
      });
      setBooks(newBooks);
    })();
  }, [user]);

  return (
    <Container>
      <Title>Popular now</Title>
      <Books ref={containerRef}>
        <BookCard books={books} />
      </Books>
    </Container>
  );
};

export default Slider;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '@/hooks/useUserContext';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import BookCard from '@/components/BookCard/BookCard';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getBooksInit } from '@/store/books/actions';
import { getPopularBooks } from '@/store/books/selector';

const Container = styled.div`
  margin: 2rem 0;
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
  const { user } = useUserContext();
  const [books, setBooks] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const popBooks = useAppSelector(getPopularBooks);
  useEffect(() => {
    dispatch(getBooksInit({ search: '/popularnow' }));
  }, []);
  useEffect(() => {
    if (popBooks && popBooks?.length > 0) {
      const newBooks = popBooks.map((item) => {
        // @ts-ignore
        user?.cartItems?.map((item) => {
          if (item.bookId === item._id) {
            item['isInCart'] = true;
          }
        });
        return item;
      });
      setBooks(newBooks);
    }
  }, [popBooks, user]);

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

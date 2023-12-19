import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useUserContext } from '@/hooks/useUserContext';
import addToCart from '@/utils/addToCart';
import BookItem from '@/components/BookCard/BookItem';

const BookCardContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const BookCard = ({ books, type = 'user' }: { books: any; type?: any }) => {
  return (
    <BookCardContainer>
      {books.map((book: any) => (
        <BookItem book={book} type={type} />
      ))}
    </BookCardContainer>
  );
};

export default BookCard;

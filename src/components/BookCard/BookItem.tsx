import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import addToCart from '@/utils/addToCart';
import styled from 'styled-components';
import { useUserContext } from '@/hooks/useUserContext';
const BookContainer = styled.div`
  cursor: pointer;
`;

const BookTitle = styled.p`
  font-size: 1rem;
  line-height: 1.3rem;
  margin-top: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const Author = styled.p`
  color: #b9babd;
  font-size: 0.8rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  width: 10rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  background-color: #b9babd;
  height: 15rem;
  width: 10rem;
  border-radius: 10px;
  overflow: hidden;
`;

const AddToCart = styled.p`
  color: #e98c0b;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const AddedToCart = styled.p`
  cursor: pointer;
  color: #5e5c5c;
`;
const BookItem = (props: any) => {
  const { book, type } = props;
  const { user, setUser } = useUserContext();

  return (
    <BookContainer>
      <Link href={type === 'user' ? `/book/${book._id}` : `/admin/${book._id}`}>
        <div>
          <ImageWrapper>
            <Image
              src={
                book.image.includes('http')
                  ? book.image
                  : `${process.env.NEXT_PUBLIC_BASE_URL}${book.image}`
              }
              layout="fill"
              alt={''}
            />
          </ImageWrapper>
          <BookTitle>{book.title}</BookTitle>
          {book?.authors && <Author>{book.authors[0]}</Author>}
        </div>
      </Link>
      {user &&
        (type !== 'admin' && book?.isInCart ? (
          <AddedToCart>Added to cart</AddedToCart>
        ) : (
          type !== 'admin' && (
            <AddToCart
              onClick={() => addToCart(book._id, book.title, book.image, book.price, setUser)}
            >
              Add to cart
            </AddToCart>
          )
        ))}
    </BookContainer>
  );
};

export default BookItem;

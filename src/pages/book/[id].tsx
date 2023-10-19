import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Make sure to import addToCart from your cart utilities
import { useUserContext } from '@/hooks/useUserContext';
import WriteReview from '@/components/Review/EditReview';
import Reviews from '@/components/Review/Reviews';
import addToCart from '@/utils/addToCart';

const Container = styled.div`
  margin: 2rem 5%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  background-color: #f4e8de;
  border-radius: 10px;
`;

const BookDetails = styled.div`
  width: 70%;
`;

const ImageWrapper = styled.div`
  height: 21rem;
  width: 14rem;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  color: #545353;
`;

const Authors = styled.p`
  color: #b9babd;
  font-size: 0.9rem;
`;

const Description = styled.p`
  color: #545353;
  margin-top: 0.5rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const PrimaryButton = styled.button<{ addedToCart?: boolean }>`
  border: none;
  border-radius: 50px;
  background-color: ${(props) => (props.addedToCart ? '#6d6d6d' : '#f78f02')};
  color: white;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 2rem;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  border: none;
  border-radius: 50px;
  border: 2px solid #f78f02;
  background: none;
  font-weight: 500;
  font-size: 1rem;
  color: #6d6d6d;
  padding: 0.5rem 2rem;
  cursor: pointer;
`;

const PostHeroWrapper = styled.div`
  margin: 3rem 5%;
  position: relative;

  h2 {
    color: #545353;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const PostHero = styled.div`
  display: flex;
  gap: 2rem;
`;

const ExcerptContainer = styled.div`
  flex: 0 0 100%;
`;

const ProductPage = () => {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [book, setBook] = useState<any>({});
  const { id } = router.query;
  const [yourReviews, setYourReviews] = useState([]);
  const [otherReviews, setOtherReviews] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();

      if (user?.cartItems.length > 0) {
        user.cartItems.map((item: any) => {
          if (item.bookId === data.message._id) {
            setBook(() => {
              return { ...data.message, isInCart: true };
            });
          } else {
            setBook(() => {
              return { ...data.message, isInCart: false };
            });
          }
        });
      } else {
        setBook(() => {
          return { ...data.message, isInCart: false };
        });
      }
    })();
  }, [router.isReady, user, router.asPath]);

  useEffect(() => {
    if (book.reviews) {
      const filteredReviews = book.reviews.filter((review) => {
        if (review.userId._id === user?._id) {
          return true;
        }
      });
      setYourReviews(() => filteredReviews);
      const otherReviews = book.reviews.filter((review) => {
        if (review.userId._id !== user?._id) {
          return true;
        }
      });
      setOtherReviews(otherReviews);
    }
  }, [book]);

  return (
    <>
      <Container>
        <BookDetails>
          <Title>{book.title}</Title>
          <Authors>
            By <span>{book?.authors?.join(', ')}</span>
          </Authors>
          <Description>{book.description}</Description>
          <Buttons>
            <PrimaryButton
              addedToCart={book.isInCart}
              onClick={() => {
                if (!book.isInCart) {
                  addToCart(book._id, book.title, book.image, book.price, setUser);
                }
              }}
            >
              {book.isInCart ? 'Added to cart' : 'Add to cart'}
            </PrimaryButton>
            <SecondaryButton>Reviews</SecondaryButton>
          </Buttons>
        </BookDetails>
        <ImageContainer>
          <ImageWrapper>
            {book.image && (
              <Image
                src={
                  book.image.includes('http')
                    ? book.image
                    : `${process.env.NEXT_PUBLIC_BASE_URL}${book.image}`
                }
                layout="fill"
                alt={''}
              />
            )}
          </ImageWrapper>
        </ImageContainer>
      </Container>
      <PostHeroWrapper>
        <PostHero>
          {/*<ExcerptContainer>*/}
          {/*    <Excerpt/>*/}
          {/*</ExcerptContainer>*/}
          <div className={'reviewsContainer'}>
            <h2>Reviews</h2>
            {yourReviews.length === 0 && (
              <WriteReview id={book._id} setYourReviews={setYourReviews} />
            )}
            <Reviews
              bookId={book._id}
              reviews={{
                otherReviews: otherReviews.length > 0 ? otherReviews : [],
                yourReviews: yourReviews.length > 0 ? yourReviews : [],
              }}
              setYourReviews={setYourReviews}
            />
          </div>
        </PostHero>
      </PostHeroWrapper>
    </>
  );
};

export default ProductPage;

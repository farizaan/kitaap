import React, { useContext } from 'react';
import styled from 'styled-components';
import { useUserContext } from '@/hooks/useUserContext';
import Review from '@/components/Review/Review';

const Container = styled.div`
  .container {
    background-color: #f4e8de;
    //padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
`;

const ReviewWrapper = styled.div`
  background-color: #f4e8de;
  border-radius: 10px;
  margin-bottom: 1rem;
  width: 100%;
`;

const ReviewTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #3b3a38;
  padding: 1rem 1rem 0 1rem;
`;

const NotAvailable = styled.p`
  color: rgb(149, 157, 165);
  padding: 1rem;
`;

const Reviews: React.FC<any> = ({
  reviews: { otherReviews, yourReviews },
  bookId,
  setYourReviews,
}) => {
  const { user } = useUserContext();
  console.log('Your reviews', otherReviews.length);

  return (
    <Container>
      {yourReviews.length > 0 && (
        <ReviewWrapper>
          <Review
            bookId={bookId}
            item={yourReviews[0]}
            isUserReview={true}
            setYourReviews={setYourReviews}
          />
        </ReviewWrapper>
      )}

      {otherReviews.length > 0 ? (
        <ReviewWrapper>
          <ReviewTitle>Other reviews ({otherReviews.length})</ReviewTitle>
          {otherReviews.map((item: any) => (
            <Review bookId={bookId} key={item.id} item={item} setYourReviews={setYourReviews} />
          ))}
        </ReviewWrapper>
      ) : (
        <ReviewWrapper>
          <ReviewTitle>Other reviews ({otherReviews.length})</ReviewTitle>
          <NotAvailable>No reviews yet.</NotAvailable>
        </ReviewWrapper>
      )}
    </Container>
  );
};

export default Reviews;

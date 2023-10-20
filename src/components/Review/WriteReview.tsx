import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useUserContext } from '@/hooks/useUserContext';
import { Rating } from 'react-simple-star-rating';

const Container = styled.div`
  background-color: #f4e8de;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  margin-bottom: 1rem;
`;

const InputDiv = styled.div`
  border: none;
  border-radius: 10px;
  padding: 1rem;
  height: 5rem;
  background-color: #f5f7f9;
  color: rgba(108, 106, 106, 0.758);
  cursor: pointer;

  &:hover {
    background-color: #e2e5e5;
  }
`;

const ReviewFormWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.58);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewForm = styled.div`
  padding: 0 1rem;
  border-radius: 10px;
  background-color: #f4e8de;
  width: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ReviewTextArea = styled.textarea`
  margin-top: 1rem;
  border: none;
  resize: none;
  border-radius: 0 0 10px 10px;
  background-color: #f4e8de;
  height: 60%;
  min-height: 7rem;
  width: 100%;
  font-size: 1.15rem;
  color: #474644;
  font-family: 'poppins';

  &:focus {
    outline: none;
  }
`;

const ReviewTitle = styled.p`
  margin-top: 1rem;
  font-weight: 600;
  padding: 0 1rem;
  text-align: center;
  font-size: 1.25rem;
  display: block;
  position: relative;
  color: #474644;
`;

const ReviewTitleLine = styled.p`
  &::after {
    content: '';
    height: 1px;
    width: 100%;
    background-color: #47464446;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
  }
`;

const PrimaryButton = styled.button`
  padding: 0.6rem 0;
  border: none;
  margin: 1rem 0;
  border-radius: 10px;
  background-color: #d57f07;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
`;

const UserDetails = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const UserName = styled.div`
  font-weight: 600;
`;

const Privacy = styled.div`
  color: #656565;
  font-size: 0.9rem;

  &::before {
    content: '🌐 ';
  }
`;

const Avatar = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  height: 3rem;
  width: 3rem;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const RatingText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #474644;
`;

const WriteReview: React.FC<any> = ({ id, setYourReviews }) => {
  const { user } = useUserContext();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const reviewRef = useRef<any>(null);

  const addReview = async () => {
    if (!reviewRef.current.value) {
      return setError('Please write a review before posting.');
    }
    if (!rating) {
      return setError('Please give a star rating before posting.');
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/add`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        stars: rating,
        review: reviewRef.current.value,
      }),
    });

    const data = await res.json();
    if (data.status === 'success') {
      setYourReviews(() => [data.message]);
      setShowReviewForm(() => false);
    } else {
      setError(id);
    }
  };

  if (user)
    return (
      <>
        <Container>
          <p className={'cardTitle'}>Write a review</p>
          <InputDiv
            onClick={() => {
              setShowReviewForm(true);
            }}
          >
            Reading this book? Review and rate it here, {user.name.split(' ')[0]} ...
          </InputDiv>
        </Container>
        {showReviewForm && (
          <ReviewFormWrapper
            onClick={(e) => {
              console.log(e.target.toString());
              setShowReviewForm(false);
            }}
          >
            <ReviewForm onClick={(e) => e.stopPropagation()}>
              <ReviewTitle onClick={(e) => e.stopPropagation()}>Write review</ReviewTitle>
              <UserDetails>
                <Avatar>
                  <Image
                    src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`}
                    layout="fill"
                    alt="profile photo"
                  />
                </Avatar>
                <div>
                  <UserName>{user.name}</UserName>
                  <Privacy>Public</Privacy>
                </div>
              </UserDetails>
              <StarRating onClick={() => setError('')}>
                <Rating
                  // ratingValue={rating}
                  onClick={setRating}
                  initialValue={0}
                  iconsCount={5}
                  fillColor="#d57f07"
                  emptyColor="#a8a8a5"
                  size={28}
                />
                {rating > 0 && (
                  <RatingText>
                    ({rating} star{rating > 1 ? 's' : ''})
                  </RatingText>
                )}
              </StarRating>
              {error && <RatingText>{error}</RatingText>}
              <ReviewTextArea
                onClick={(e) => e.stopPropagation()}
                autoFocus={true}
                ref={reviewRef}
                onChange={() => {
                  setError('');
                }}
              />
              <PrimaryButton
                onClick={(e) => {
                  e.stopPropagation();
                  addReview();
                }}
              >
                Post
              </PrimaryButton>
            </ReviewForm>
          </ReviewFormWrapper>
        )}
      </>
    );

  return null;
};

export default WriteReview;

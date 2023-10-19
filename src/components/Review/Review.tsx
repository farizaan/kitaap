import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import EditReview from './EditReview'; // You need to import the EditReview component

import {useUserContext} from "@/hooks/useUserContext";
import {Rating} from "react-simple-star-rating";

const ReviewContainer = styled.div`
  background-color: #f4e8de;
  padding: 1rem;
  border-radius: 10px;
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

const ReviewTitle = styled.div`
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
  .na {
    
  }
`;

const RatingText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #474644;
`;

const CardTitle = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #3b3a38;
`;
interface IReview {
    bookId: number;
    item?: any;
    isUserReview?: boolean,
    setYourReviews?: () => {}
}

const Review: React.FC<IReview> = ({
                                   bookId,
                                   item,
                                   isUserReview = false,
                                   setYourReviews
                               }) => {
    const [showShowMore, setShowShowMore] = useState<boolean>(true);
    const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
    const reviewRef = useRef<any>(null);
    const {setUser} = useUserContext();

    useEffect(() => {
        if (reviewRef.current) {
            const node = reviewRef.current;
            if (node?.clientHeight === node.scrollHeight) {
                setShowShowMore(false);
            }
        }
    }, []);

    const deleteReview = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/delete`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: bookId,
            }),
        });

        const data = await res.json();
        if (data.status === 'success') {
            setYourReviews([]);
        }
    };

    return (
        <ReviewContainer>
            <div>
                <div>
                    <Image
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        height={50}
                        width={50}
                        alt={''}/>
                    <div>
                        <h4>{item.userId.name}</h4>
                        <StarRating>
                            <Rating initialValue={item.stars} iconsCount={5} readonly={true} fillColor="#ffcd17"
                                    emptyColor="#a8a8a5" allowHover={false} size={20}/>
                            {item.stars ? (
                                <RatingText>{`(${item.stars} stars)`}</RatingText>
                            ) : (
                                <RatingText className="na">{`Rating not available.`}</RatingText>
                            )}
                        </StarRating>
                    </div>
                </div>
            </div>
            <ReviewTextArea ref={reviewRef}
                            className={`reviewContent ${showShowMore ? 'truncate' : ''}`}>
                {item.review}
            </ReviewTextArea>
            {isUserReview && (
                <div>
                    <p className={'delete'} onClick={deleteReview}>
                        Delete
                    </p>
                    <p
                        className={'edit'}
                        onClick={() => {
                            setShowReviewForm(() => true);
                        }}
                    >
                        Edit
                    </p>
                </div>
            )}

            {showShowMore && (
                <span
                    className={'showMore'}
                    onClick={() => {
                        setShowShowMore(false);
                    }}
                >
            Show more
          </span>
            )}

            {
                isUserReview && (
                    <EditReview
                        bookId={bookId}
                        showReviewForm={showReviewForm}
                        setShowReviewForm={setShowReviewForm}
                        prevRating={item.stars}
                        prevReview={item.review}
                        setYourReviews={setYourReviews}
                    />
                )
            }
        </ReviewContainer>
    )
        ;
};

export default Review;

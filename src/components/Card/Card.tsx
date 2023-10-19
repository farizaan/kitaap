import React from 'react'; // Replace with the correct import path
import Link from 'next/link';
import styled from 'styled-components';
import illustration from "../../../public/Group.svg";
import Image from "next/image";
// Replace with the correct import path

const Container = styled.div`
  margin: 10px 5%;
  padding: 2.5rem 5rem;
  background-color: #f4e8de;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  max-width: 100rem;
`;

const Title = styled.h2`
  max-width: 25rem;
  color: #6d6d6d;
  font-size: 1.75rem;
`;

const Text = styled.div`
  p {
    color: #989898;
    max-width: 30rem;
  }
`;

const Illustrations = styled.div`
  width: 30%;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const PrimaryButton = styled.button`
  border: none;
  border-radius: 50px;
  background-color: #f78f02;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 2rem;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  border-radius: 50px;
  border: 2px solid #f78f02;
  background: none;
  font-weight: 500;
  font-size: 1rem;
  color: #6d6d6d;
  padding: 0.5rem 2rem;
  cursor: pointer;
`;

const ImageComponent = styled(Image)`
  width: 100%;
  height: 100%;
`;

const Card: React.FC = () => {
    return (
        <Container>
            <Text>
                <Title>Grow your knowledge with us</Title>
                <p>
                    Explore from hundreds of books. Easy 3 steps to find your next
                    favorite book. Search, select, and buy.
                </p>
                <Buttons>
                    <PrimaryButton>Explore</PrimaryButton>
                    <Link href="/cart">
                        <SecondaryButton>View cart</SecondaryButton>
                    </Link>
                </Buttons>
            </Text>
            <Illustrations>
                <ImageComponent src={illustration} alt={''} />
            </Illustrations>
        </Container>
    );
};

export default Card;

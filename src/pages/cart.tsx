// @ts-nocheck
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useUserContext } from '@/hooks/useUserContext';

const Container = styled.div`
  margin: 0 5%;
  padding: 2.5rem 5rem;
  background-color: #f4e8de;
  margin-top: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  max-width: 100rem;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
`;

const ItemTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 500;

  span {
    font-weight: 600;
    color: #f78f02;
  }
`;

const Remove = styled.span`
  margin-left: 1rem;
  cursor: pointer;
  color: #6d6d6d;

  &:hover {
    text-decoration: underline;
  }
`;

const ImageWrapper = styled.div`
  order: -1;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  height: 12rem;
  width: 8rem;
  height: 9rem;
  width: 6rem;
`;

const Buttons = styled.div`
  margin: 0 5%;
  padding: 2.5rem 5rem;
  display: flex;
  justify-content: space-between;
`;

const Total = styled.h3`
  color: #f78f02;

  span {
    color: #555555;
  }
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

const EmptyCart = styled.div`
  text-align: center;

  p:nth-child(1) {
    font-size: 3rem;
    color: #6d6d6d;
    font-weight: 600;
  }

  p:nth-child(2) {
    font-size: 1.2rem;
    color: #6d6d6d;
  }
`;

const Cart = () => {
  const { user, setUser } = useUserContext();
  const [cart, setCart] = useState<any>([]);

  useEffect(() => {
    if (user) {
      setCart(() => user.cartItems);
    }
  }, [user]);

  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/remove/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (data.status === 'success') {
        const cartItems = user.cartItems.filter((item) => item.bookId !== id);
        setUser((prev) => {
          return {
            ...prev,
            cartItems,
          };
        });
        setCart(() => cart.filter((item: any) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(
        cart.map((item) => {
          return { id: item.bookId, quantity: item.quantity };
        })
      ),
    });

    const { status, message } = await res.json();
    if (status === 'success') {
      window.location = message.url;
    } else {
      console.log(message);
    }
  };

  return (
    <Container>
      <h2 className={'title'}>Cart</h2>
      {cart.length === 0 && (
        <EmptyCart>
          <p>{':('}</p>
          <p>Your cart is empty</p>
        </EmptyCart>
      )}
      {cart.length > 0 &&
        cart[0]?.image &&
        cart.map((item, index) => (
          <Item key={index}>
            <div className={'itemDetails'}>
              <ItemTitle>
                {`${item.title}`} <span>(X{item.quantity})</span>
              </ItemTitle>
              <p className={'price'}>
                Rs: {item.price}{' '}
                <Remove
                  onClick={() => {
                    removeFromCart(item.bookId);
                  }}
                >
                  Remove
                </Remove>
              </p>
            </div>
            <ImageWrapper>
              {item.image && (
                <Image
                  src={
                    item.image.includes('http')
                      ? item.image
                      : `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`
                  }
                  layout="fill"
                  alt={''}
                />
              )}
            </ImageWrapper>
          </Item>
        ))}
      {cart.length > 0 && (
        <Buttons>
          <Total>
            Total:{' '}
            <span>
              {' '}
              {cart.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price * currentValue.quantity;
              }, 0)}
            </span>
          </Total>
          <PrimaryButton onClick={checkout}>Checkout</PrimaryButton>
        </Buttons>
      )}
    </Container>
  );
};

export default Cart;

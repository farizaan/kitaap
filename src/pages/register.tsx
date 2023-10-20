// @ts-nocheck
import React, { useRef, useState } from 'react';
import { PrimaryButton, SecondaryButton } from '@/components/Buttons';
import Link from 'next/link';
import {
  Card,
  Container,
  ContainerInput,
  ContainerP,
  Message,
  Strong,
  Wrapper,
} from '@/components/Login/Login.styles';
import Logo from '@/components/Logo/Logo';
import { useRouter } from 'next/router';

const Register = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // @ts-ignore
    const name = nameRef.current.value;
    // @ts-ignore
    const email = emailRef.current.value;
    // @ts-ignore
    const password = passwordRef.current.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await res.json();

    if (data?.errors) {
      setMessage(data.errors[0].msg);
    }
    if (data.status === 'success') {
      router.push('/login');
    } else if (data.status === 'error') {
      setMessage(data.message);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Logo />
        <ContainerP>
          Your go to online shop to buy all your favourite books at one place.
        </ContainerP>
        <Card>
          <Message>{message}</Message>
          <form method="POST">
            <ContainerInput type="text" placeholder="Full name" ref={nameRef} />
            <ContainerInput type="email" placeholder="Email" ref={emailRef} />
            <ContainerInput type="password" placeholder="Password" ref={passwordRef} />
            <PrimaryButton
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Register
            </PrimaryButton>
            <Strong>Already have an account? Login insted.</Strong>
            <Link href="/login">
              <SecondaryButton>Login</SecondaryButton>
            </Link>
          </form>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Register;

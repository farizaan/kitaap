import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  Container,
  ContainerInput,
  ContainerP,
  Message,
  Strong,
  Wrapper,
} from './Login.styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserContext } from '@/hooks/useUserContext';
import Logo from '@/components/Logo/Logo';
import { PrimaryButton, SecondaryButton } from '@/components/Buttons';

const LoginComponent: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const { user, setUser } = useUserContext();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email) {
      setMessage('Email cannot be empty.');
      return;
    }
    if (!password) {
      setMessage('Password cannot be empty.');
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 401) {
        return setMessage('Please recheck your login credentials.');
      }
      const data = await res.json();
      if (data.status === 'success') {
        console.log(data.user);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Logo link={'/'} />
        <ContainerP>Online shop to buy all your favorite books at one place.</ContainerP>
        <Card>
          <Message>{message}</Message>
          <form method="POST">
            <ContainerInput name="name" type="email" placeholder="Email" ref={emailRef} />
            <ContainerInput
              name="password"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
            <PrimaryButton
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Login
            </PrimaryButton>
            <Strong>Don't have an account? Register instead.</Strong>
            <Link href="/register">
              <SecondaryButton>Register</SecondaryButton>
            </Link>
          </form>
        </Card>
      </Wrapper>
    </Container>
  );
};
export default LoginComponent;

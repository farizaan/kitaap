// @ts-nocheck

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/hooks/useUserContext';
import Logo from '@/components/Logo/Logo';
import { PrimaryButton, SecondaryButton } from '@/components/Buttons';
import {
  Card,
  Container,
  ContainerInput,
  ContainerP,
  Message,
  Strong,
  Wrapper,
} from '@/components/Login/Login.styles';
const Login = () => {
  const [message, setMessage] = useState('');
  const { user, setUser } = useUserContext();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const otpFormRef = useRef(null);
  const inputCredentials = useRef({ email: null, password: null });

  useEffect(() => {
    if (user?.isAdmin) {
      router.push('/admin');
    } else if (!user?.isAdmin) {
      router.push('/admin/login');
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    const email = emailRef.current.value;
    // @ts-ignore
    const password = passwordRef.current.value;
    if (!email) {
      setMessage('Email cannot be empty.');
      return;
    }
    if (!password) {
      setMessage('Password cannot be empty.');
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin/login`, {
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
        inputCredentials.current.email = email;
        inputCredentials.current.password = password;
        setShowOtpBox(() => true);
      } else if (data.status === 'error') {
        setMessage('Plese recheck your login credentials.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOtpInput = (event) => {
    setMessage('');
    if (event.target.value.length > event.target.getAttribute('maxLength'))
      event.target.value = event.target.value.slice(0, event.target.getAttribute('maxLength'));
    else if (event.target.value.length === 1) {
      const index = parseInt(event.target.getAttribute('data-id'));
      otpFormRef.current.childNodes[index + 1]?.focus();
    }
  };
  const submitOtp = async (e) => {
    const email = inputCredentials.current.email;
    console.log(email);
    let otp = [];
    otpFormRef.current.childNodes.forEach((input) => otp.push(input.value));
    otp = otp.join('');

    if (otp.length !== 5) {
      return setMessage('OTP must be 5 digits long');
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin/login/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: inputCredentials.current.email,
        password: inputCredentials.current.password,
        otp,
      }),
    });
    console.log(res.status);
    if (res.status === 400) {
      return setMessage('Please recheck your otp.');
    }
    const data = await res.json();
    console.log(data);
    if (data.status === 'error') {
      setMessage(data.message);
    } else if (data.status === 'success') {
      setUser(data.user);
      router.push('/admin');
      setMessage('Login success!');
    }
  };
  const resendOtp = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin/login/resend-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email: inputCredentials.current.email,
        password: inputCredentials.current.password,
      }),
    });
    const data = await res.json();
    if ((data.status = 'success')) {
      setMessage('OTP resent successfully.');
      otpFormRef.current.childNodes.forEach((input) => (input.value = ''));
    }
  };

  // if (!user?.isAdmin) {
  //   return;
  // }

  return (
    <>
      <Container>
        <Wrapper>
          <Logo />
          <ContainerP>Admin Login</ContainerP>
          <Card>
            <Message>{message}</Message>
            {showOtpBox && (
              <div>
                <Strong>Please enter your OTP</Strong>
                <form ref={otpFormRef}>
                  <div style={{ display: 'flex' }}>
                    <ContainerInput
                      style={{ width: '25px' }}
                      type="number"
                      placeholder=""
                      maxLength={1}
                      onInput={handleOtpInput}
                      data-id="0"
                    />
                    <ContainerInput
                      style={{ width: '25px' }}
                      type="number"
                      placeholder=""
                      maxLength={1}
                      onInput={handleOtpInput}
                      data-id="1"
                    />
                    <ContainerInput
                      style={{ width: '25px' }}
                      type="number"
                      placeholder=""
                      maxLength={1}
                      onInput={handleOtpInput}
                      data-id="2"
                    />
                    <ContainerInput
                      style={{ width: '25px' }}
                      type="number"
                      placeholder=""
                      maxLength={1}
                      onInput={handleOtpInput}
                      data-id="3"
                    />
                    <ContainerInput
                      style={{ width: '25px' }}
                      type="number"
                      placeholder=""
                      maxLength={1}
                      onInput={handleOtpInput}
                      data-id="4"
                    />
                  </div>
                </form>
                <PrimaryButton type="submit" onClick={submitOtp}>
                  Verify OTP
                </PrimaryButton>
                <Strong>Didnt get an OTP?</Strong>
                <SecondaryButton onClick={resendOtp}>Resend OTP</SecondaryButton>
              </div>
            )}
            {!showOtpBox && (
              <form method="POST">
                <ContainerInput name="name" type="email" placeholder="Email" ref={emailRef} />
                <ContainerInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
                <PrimaryButton type="submit" onClick={handleSubmit}>
                  Login
                </PrimaryButton>
                <Strong>Next you will have to verify your OTP.</Strong>
              </form>
            )}
          </Card>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;

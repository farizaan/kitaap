import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useUserContext } from '@/hooks/useUserContext';

const Container = styled.div`
  min-height: 100vh;
  min-width: 100%;
  background-color: #f0f2f5;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 25rem;
  gap: 0.58rem;
  background-color: #fff;
  box-shadow:
    0 2px 4px rgb(0 0 0 / 10%),
    0 8px 16px rgb(0 0 0 / 10%);
  border-radius: 10px;
  padding: 1rem;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  color: rgb(103, 101, 101);
  font-weight: bold;
  letter-spacing: 1px;
`;

const FirstLetter = styled(Logo)`
  font-size: 3.5rem;
  color: #f78f02;
  font-weight: bold;
`;

const PageDescription = styled.p`
  font-size: 1.25rem;
  max-width: 25rem;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  height: 3rem;
  width: 20rem;
  font-size: 1rem;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid rgb(190, 183, 183);
  font-size: 1.15rem;
  background: none;
  margin: 1rem;
  ::placeholder {
    color: #919495;
    font-size: 1.15rem;
  }
  :focus {
    background-color: none;
    outline: 2px solid #f78f02;
    border: none;
  }
`;

const PrimaryButton = styled.button`
  border: none;
  background-color: #e99827;
  color: white;
  font-weight: 600;
  font-size: 1.15rem;
  cursor: pointer;
  position: relative;
  margin: 1rem;
  ::after {
    content: '';
    display: block;
    height: 1px;
    background-color: #919495;
    width: 100%;
    position: absolute;
    top: 4rem;
    left: 50%;
    width: 80%;
    transform: translateX(-50%);
  }
`;

const SecondaryButton = styled.button`
  margin: 1rem 1rem;
  background: none;
  border: 2px solid #e99827;
  font-weight: 500;
  font-size: 1.15rem;
  cursor: pointer;
`;

const Strong = styled.strong`
  display: block;
  margin: 1.5rem 1rem 1rem 1rem;
  font-size: 1rem;
  font-weight: 400;
`;

const Message = styled.div`
  color: rgb(201, 52, 52);
  font-size: 1.15rem;
`;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
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
      event.target.value = e.target.value.slice(0, e.target.getAttribute('maxLength'));
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
          <FirstLetter>K</FirstLetter>itaap
          <PageDescription>Admin Login</PageDescription>
          <Card>
            <Message>{message}</Message>
            {showOtpBox && (
              <div>
                <Strong>Please enter your OTP</Strong>
                <form ref={otpFormRef}>
                  <Input
                    type="number"
                    placeholder=""
                    maxLength={1}
                    onInput={handleOtpInput}
                    data-id="0"
                  />
                  <Input
                    type="number"
                    placeholder=""
                    maxLength={1}
                    onInput={handleOtpInput}
                    data-id="1"
                  />
                  <Input
                    type="number"
                    placeholder=""
                    maxLength={1}
                    onInput={handleOtpInput}
                    data-id="2"
                  />
                  <Input
                    type="number"
                    placeholder=""
                    maxLength={1}
                    onInput={handleOtpInput}
                    data-id="3"
                  />
                  <Input
                    type="number"
                    placeholder=""
                    maxLength={1}
                    onInput={handleOtpInput}
                    data-id="4"
                  />
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
                <Input name="name" type="email" placeholder="Email" ref={emailRef} />
                <Input name="password" type="password" placeholder="Password" ref={passwordRef} />
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

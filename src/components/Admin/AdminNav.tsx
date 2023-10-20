import React, { useRef, useState } from 'react';
// import styled from 'styled-components';

import { useRouter } from 'next/router';
import { useUserContext } from '@/hooks/useUserContext';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import Logo from '@/components/Logo/Logo';

const NavContainer = styled.nav`
  display: flex;
  padding: 2rem 5%;
  justify-content: space-between;
  position: sticky;
  top: -0.5rem;
  transition: 0.2s padding;
  z-index: 99;
  background-color: white;

  &.isPinned {
    padding: 1.2rem 5% 0.7rem 5%;
    background-color: white;
  }
`;

const SearchWrapper = styled.div`
  flex: 7;
  display: flex;
  align-items: stretch;
  justify-content: center;
  position: relative;
`;

const Search = styled.div`
  width: 80%;
  max-width: 40rem;
  border: none;
  display: block;
  position: relative;
`;

const SearchInput = styled.input`
  color: #909193;
  border-radius: 10px;
  font-size: 1rem;
  width: 100%;
  border: none;
  background-color: #f5f7f9;
  padding: 0.75rem 3rem 0.75rem 1rem;

  &::placeholder {
    color: #bfc4c6;
    font-size: 0.9rem;
  }

  &:focus {
    outline: 2px solid #f78f02;
    border-radius: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  flex: 1;
`;

const UserIcon = styled.div`
  height: 2rem;
  width: 2rem;
  position: relative;
  border-radius: 999px;
  cursor: pointer;

  &::after {
    content: attr(data-content);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    color: white;
    font-weight: 600;
  }
`;

const UserDetails = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 0.5rem;
  font-size: 1rem;
  width: 15rem;
  padding: 1rem;
  background-color: #eddbcc;
  border-radius: 10px;

  h5 {
    color: #555;
  }
`;

const UserLink = styled.div`
  color: #555555;
  font-weight: 500;

  span {
    font-weight: 400;
  }
`;

const CartIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  font-size: 0.9rem;
  justify-content: center;
  gap: 1.5rem;
  color: #b9babd;
  font-weight: 500;

  &.active {
    color: #f78f02;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::after {
      content: '';
      height: 0.3rem;
      width: 0.3rem;
      background-color: #f78f02;
      display: block;
      border-radius: 9999px;
    }
  }
`;

const SearchList = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  width: 100%;
  background-color: rgb(240, 238, 238);
  max-height: 50vh;
  overflow-y: scroll;
  cursor: pointer;
`;

const SearchTitle = styled.div`
  color: rgb(140, 134, 134);
`;

const Authors = styled.div`
  color: rgb(193, 192, 192);
`;

const SearchItem = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 2rem;
  border-bottom: 2px solid rgba(91, 89, 89, 0.573);
`;

const Nav = () => {
  const navRef = useRef(null);
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const [showUserDetails, setShowUserDetails] = useState(false);

  const logout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    if (data.status === 'success') {
      router.push('/admin/login');
      setUser(null);
    }
  };

  const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle(`${'isPinned'}`, e.intersectionRatio < 1),
    { threshold: [1] }
  );

  if (navRef.current) {
    observer.observe(navRef.current);
  }

  if (showUserDetails) {
    window.onmousedown = () => setShowUserDetails(() => false);
  }

  return (
    <>
      <NavContainer ref={navRef}>
        <Logo link={'/admin'} />
        <SearchWrapper>
          <Search>
            <SearchInput
              type="text"
              className={'searchField'}
              placeholder="Search by title or author"
            />
          </Search>
        </SearchWrapper>
        <UserInfo>
          <UserIcon
            title="User"
            onClick={() => setShowUserDetails((prev) => !prev)}
            data-content={user.name[0]}
          >
            <Image src="/user.png" height={35} width={35} alt={''} />
            <UserDetails className={!showUserDetails ? 'show' : ''}>
              <h5>Signed in as</h5>
              <UserLink>
                Name: <span>{user.name}</span>
              </UserLink>
              <UserLink>
                Email: <span>{user.email}</span>
              </UserLink>
            </UserDetails>
          </UserIcon>
          {user && (
            <CartIcon onClick={logout} title="Logout">
              <Image alt={''} src="/logout.png" height={20} width={20} />
            </CartIcon>
          )}
        </UserInfo>
      </NavContainer>
    </>
  );
};

export default Nav;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/hooks/useUserContext';
import Link from 'next/link';
import Image from 'next/image';
import { NavLinks, StyledIcon, UserDetails, UserInfo } from '@/components/Nav/Nav.styles';
import Logo from '@/components/Logo/Logo';
import Search from '@/components/Search/Search';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import DrawerComponent from '@/components/Nav/DrawerComponent';
import { Tabs } from '@/pages/admin';
// import DrawerComponent from '@/components/Nav/DrawerComponent';
export interface IBooks {
  _id: string;
  image: string;
  title: string;
  authors: string[];
}
const tabs = [
  { id: 'add', label: 'Add new book' },
  { id: 'edit', label: 'Edit existing book' },
];
const Nav = () => {
  const navRef = useRef(null);
  const [searchResult] = useState<IBooks[] | []>([]);
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const [showUserDetails, setShowUserDetails] = useState(false);
  const observer = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();
  const [currentAdminTab, setCurrentAdminTab] = useState('ANB');

  const logout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    if (data.status === 'success') {
      setUser(null);
      // router.push('/login');
    }
  };
  useEffect(() => {
    // @ts-ignore
    observer.current = new IntersectionObserver(
      ([e]) => e.target.classList.toggle(`isPinned`, e.intersectionRatio < 1),
      { threshold: [1] }
    );
  }, []);
  useEffect(() => {
    if (navRef.current) {
      // @ts-ignore
      observer.current?.observe(navRef.current);
    }
  }, []);
  useEffect(() => {
    if (showUserDetails) {
      window.onmousedown = () => setShowUserDetails(() => false);
    }
  }, [showUserDetails]);
  const currentTab = () => {
    if (router.asPath.includes('comics')) return 'comics';
    else if (router.asPath.includes('novels')) return 'novels';
    else if (router.asPath.includes('finance')) return 'finance';
    else if (router.asPath.includes('selfhelp')) return 'selfhelp';
    else if (router.asPath.includes('novels')) return 'novels';
    else return 'home';
  };

  console.log('searchResult', searchResult);
  const onClickUserIcon = useCallback(() => {
    if (user) {
      setShowUserDetails((prev) => !prev);
      return;
    }
    router.push('/login');
  }, [user]);
  const onAdminTabClick = useCallback((tab) => {
    setCurrentAdminTab(tab.id);

    router.push(`/admin?tab=${tab.id}`);
  }, []);
  return (
    <>
      <Flex
        ref={navRef}
        alignItems={'center'}
        justifyContent={'space-between'}
        paddingY={'2rem'}
        position={'sticky'}
        top={'-0.5rem'}
        transition={'0.2s padding'}
        backgroundColor={'white'}
        zIndex={99}
        width={'100%'}
      >
        <Logo link={'/'} />
        <Search />
        <Flex alignItems={'center'} display={{ base: 'none', md: 'block' }}>
          <UserInfo>
            <div className={'user'}>
              <StyledIcon title="User" onClick={onClickUserIcon}>
                <Image src={'/user.png'} height={35} width={35} alt={''}></Image>

                <UserDetails className={`${!showUserDetails && 'show'}`}>
                  <h5>Signed in as</h5>
                  <p>
                    Name: <span>{user?.name}</span>
                  </p>
                  <p>
                    Email: <span>{user?.email}</span>
                  </p>
                </UserDetails>
              </StyledIcon>
            </div>
            {user?.isUser && (
              <Link href={'/cart'}>
                <StyledIcon
                  title="Cart"
                  amount={user?.cartItems?.length}
                  data-content={`${user?.cartItems?.length}`}
                >
                  <Image src={'/cart.png'} height={35} width={35} alt={''} />
                </StyledIcon>
              </Link>
            )}
            {user?.isUser && (
              <StyledIcon onClick={logout} title="Logout">
                <Image src={'/logout.png'} height={20} width={20} alt={''} />
              </StyledIcon>
            )}
          </UserInfo>
        </Flex>
        <Button
          display={{ base: 'block', md: 'none' }}
          ref={btnRef}
          onClick={onOpen}
          backgroundColor={'#fff'}
          _hover={{ backgroundColor: '#fff' }}
          boxSize={6}
        >
          <HamburgerIcon />
        </Button>
        <DrawerComponent isOpen={isOpen} onClose={onClose} btnRef={btnRef} logout={logout} />
      </Flex>

      {/* Linksssssssssss--------- */}
      {!user?.isAdmin && (
        <NavLinks>
          <p className={currentTab() === 'home' ? 'active' : ''}>
            <Link href="/">Home</Link>
          </p>
          <p className={currentTab() === 'comics' ? 'active' : ''}>
            <Link href="/category/comics">Comics</Link>
          </p>
          <p className={currentTab() === 'finance' ? 'active' : ''}>
            <Link href="/category/finance">Finance</Link>
          </p>
          <p className={currentTab() === 'selfhelp' ? 'active' : ''}>
            <Link href="/category/selfhelp">Self help</Link>
          </p>
          <p className={currentTab() === 'novels' ? 'active' : ''}>
            <Link href="/category/novels">Novels</Link>
          </p>
        </NavLinks>
      )}
      {user?.isAdmin && (
        <Tabs>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={currentAdminTab === tab.id ? 'tab activeTab' : 'tab'}
              onClick={() => onAdminTabClick(tab)}
            >
              {tab.label}
            </div>
          ))}
        </Tabs>
      )}
    </>
  );
};

export default Nav;

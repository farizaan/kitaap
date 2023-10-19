import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/router";
import {useUserContext} from "@/hooks/useUserContext";
import Link from "next/link";
import Image from "next/image";
import {
    Authors, NavLinks,
    SearchItem,
    SearchList,
    SearchTitle,
    SearchWrapper, StyledIcon,
    StyledLogo,
    StyledNav,
    StyledSearch, UserDetails, UserInfo
} from "@/components/Nav/Nav.styles";
interface IBooks {
    _id: string;
    image: string;
    title: string;
    authors: string[];
}
const Nav = () => {

    const navRef = useRef(null);
    const [searchResult, setSearchResult] = useState<IBooks[] | []>([]);
    const router = useRouter();
    const { user, setUser } = useUserContext();
    const [showUserDetails, setShowUserDetails] = useState(false);
    const observer = useRef();
    const logout = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/logout`,
            {
                method: "POST",
                credentials: "include",
            }
        );
        const data = await res.json();
        if (data.status === "success") {
            setUser(null);
            router.push("/login");
        }
    };
    useEffect(() => {
        // @ts-ignore
        observer.current = new IntersectionObserver(
            ([e]) =>
                e.target.classList.toggle(`isPinned`, e.intersectionRatio < 1),
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
        console.log(router.asPath);
        if (router.asPath.includes("comics")) return "comics";
        else if (router.asPath.includes("novels")) return "novels";
        else if (router.asPath.includes("finance")) return "finance";
        else if (router.asPath.includes("selfhelp")) return "selfhelp";
        else if (router.asPath.includes("novels")) return "novels";
        else return "home";
    };

    const handleOnChange = async (e:any) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/search/${e.target.value}`,
            {
                credentials: "include",
            }
        );
        const data = await res.json();
        console.log(data);
        console.log(data.message);

        if (data.status === "success") setSearchResult(() => data.message);
    };
    console.log("searchResult", searchResult);
    return (
        <>
            <StyledNav ref={navRef}>
                <Link href={"/"}>
                    <StyledLogo>Kitaap</StyledLogo>
                </Link>
                <SearchWrapper>
                    <StyledSearch>
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={handleOnChange}
                        />
                        <SearchList>
                            {searchResult.map((item, idx) => {

                                return (
                                    <Link href={`/book/${item?._id}`} key={idx}>
                                        <SearchItem>
                                            <Image
                                                src={
                                                    item?.image.includes("http")
                                                        ? item?.image
                                                        : `${process.env.NEXT_PUBLIC_BASE_URL}/${item?.image}`
                                                }
                                                height={90}
                                                width={60}
                                             alt={''}/>
                                            <div>
                                                <SearchTitle>{item?.title}</SearchTitle>
                                                <Authors>
                                                    {item?.authors.join(", ")}
                                                </Authors>
                                            </div>
                                        </SearchItem>
                                    </Link>
                                );
                            })}
                        </SearchList>
                    </StyledSearch>
                </SearchWrapper>
                <UserInfo>
                    <div className={'user'}>
                        <StyledIcon
                            title="User"
                            onClick={() => setShowUserDetails((prev) => !prev)}
                        >
                            <Image src={"/user.png"} height={35} width={35} alt={''}></Image>

                            <UserDetails
                                className={`${!showUserDetails && 'show'}`}
                            >
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
                    <Link href={"/cart"}>
                        <StyledIcon
                            title="Cart"
                            amount = {user?.cartItems?.length}
                            data-content={`${user.cartItems.length}`}
                        >
                            <Image src={"/cart.png"} height={35} width={35} alt={''}/>
                        </StyledIcon>
                    </Link>
                    {user?.isUser && (
                        <StyledIcon onClick={logout} title="Logout">
                            <Image src={"/logout.png"} height={20} width={20} alt={''}/>
                        </StyledIcon>
                    )}
                </UserInfo>
            </StyledNav>
            {/* Linksssssssssss--------- */}
            <NavLinks>
                <p className={currentTab() === "home" ? 'active' : ''}>
                    <Link href="/">Home</Link>
                </p>
                <p className={currentTab() === "comics" ? 'active' : ''}>
                    <Link href="/category/comics">Comics</Link>
                </p>
                <p className={currentTab() === "finance"  ? 'active' : ''}>
                    <Link href="/category/finance">Finance</Link>
                </p>
                <p className={currentTab() === "selfhelp"  ? 'active' : ''}>
                    <Link href="/category/selfhelp">Self help</Link>
                </p>
                <p className={currentTab() === "novels" ? 'active' : ''}>
                    <Link
                        href="/category/novels"
                        className={currentTab() === "novels" ? 'active' : ''}
                    >
                        Novels
                    </Link>
                </p>
            </NavLinks>
        </>
    );
};

export default Nav;
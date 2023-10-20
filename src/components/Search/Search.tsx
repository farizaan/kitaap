import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { IBooks } from '@/components/Nav/Nav';
export const SearchWrapper = styled('div')`
  flex: 7;
  display: flex;
  align-items: stretch;
  justify-content: center;
  position: relative;
`;
export const StyledSearch = styled('div')`
  width: 80%;
  max-width: 40rem;
  border: none;
  display: block;
  position: relative;

  &::after {
    background-image: url('/search.svg');
    background-size: 1.5rem 1.5rem;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 1rem;
    top: 20%;
    content: '';
  }
  input {
    color: #909193;
    border-radius: 10px;
    font-size: 1rem;
    width: 100%;
    border: 10px;
    border: none;
    background-color: #f5f7f9;
    padding: 0.75rem 3rem 0.75rem 1rem;
  }
  input:focus {
    outline: 2px solid #f78f02;
    border-radius: 10px;
  }
  input::placeholder {
    color: #bfc4c6;
    font-size: 0.9rem;
  }
`;

export const SearchList = styled('div')<{ show?: boolean }>`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  width: 100%;
  background-color: rgb(240, 238, 238);
  max-height: 50vh;
  overflow-y: scroll;
  cursor: pointer;
`;
export const SearchTitle = styled('p')`
  color: rgb(140, 134, 134);
`;

export const Authors = styled('p')`
  color: rgb(193, 192, 192);
`;
export const SearchItem = styled('div')`
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 2rem;
  border-bottom: 2px solid rgba(91, 89, 89, 0.573);
`;
const Search = () => {
  const [searchResult, setSearchResult] = useState<IBooks[] | []>([]);
  const handleOnChange = async (e: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/search/${e.target.value}`,
      {
        credentials: 'include',
      }
    );
    const data = await res.json();
    console.log(data);
    console.log(data.message);

    if (data.status === 'success') {
      setSearchResult(() => data.message);
      return;
    }
    setSearchResult([]);
  };
  return (
    <SearchWrapper>
      <StyledSearch>
        <input type="text" placeholder="Search by title or author" onChange={handleOnChange} />
        <SearchList show={searchResult.length > 0}>
          {searchResult.map((item, idx) => {
            return (
              <Link href={`/book/${item?._id}`} key={idx}>
                <SearchItem>
                  <Image
                    src={
                      item?.image.includes('http')
                        ? item?.image
                        : `${process.env.NEXT_PUBLIC_BASE_URL}/${item?.image}`
                    }
                    height={90}
                    width={60}
                    alt={''}
                  />
                  <div>
                    <SearchTitle>{item?.title}</SearchTitle>
                    <Authors>{item?.authors.join(', ')}</Authors>
                  </div>
                </SearchItem>
              </Link>
            );
          })}
        </SearchList>
      </StyledSearch>
    </SearchWrapper>
  );
};

export default Search;

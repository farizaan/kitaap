import styled from "styled-components";
import exp from "constants";

export const StyledNav = styled('nav')`
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

  
`
export const StyledLogo = styled('div')`
  flex: 1;
  cursor: pointer;

    font-size: 1.3rem;
    color: rgb(103, 101, 101);
    font-weight: 700;
    letter-spacing: 1px;
  
  &::first-letter {
    font-size: 2rem;
    color: #f78f02;
    font-weight: 800;
  }
`

export const SearchWrapper = styled('div')`
  flex: 7;
  display: flex;
  align-items: stretch;
  justify-content: center;
  position: relative;
`
export const StyledSearch = styled('div')`
  
    width: 80%;
    max-width: 40rem;
    border: none;
    display: block;
    position: relative;
  
  &::after {
    background-image: url("/search.svg");
    background-size: 1.5rem 1.5rem;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 1rem;
    top: 20%;
    content: "";
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
`

 export const SearchList = styled('div')`
    display: none;
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: rgb(240, 238, 238);
    max-height: 50vh;
    overflow-y: scroll;
    cursor: pointer;
`
export const SearchTitle =  styled('p')`
    color: rgb(140, 134, 134);
`

export const Authors =  styled('p') `
    color: rgb(193, 192, 192);
   `
export const SearchItem =  styled('div')`
    display: flex;
    padding: 0.5rem 1rem;
    align-items: center;
    gap: 2rem;
    border-bottom: 2px solid rgba(91, 89, 89, 0.573);
 `
export const UserInfo = styled('div')`
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  flex: 1;

  .cart,
  .user {
    height: 2rem;
    width: 2rem;
    position: relative;
    border-radius: 999px;
    cursor: pointer;
  }
`
export const UserDetails = styled('div')`
  position: absolute;
  top: 100%;
  margin-top: 0.5rem;
  font-size: 1rem;
  width: 15rem;
  padding: 1rem;
  background-color: #eddbcc;
  border-radius: 10px;
  
  &.show {
    display: none;
  }
  h5 {
    color: #555;
  }
  p {
    color: #555555;
    font-weight: 500;
  }
  p span {
    font-weight: 400;
  }
`
// .cart,
// .user {
//     height: 2rem;
//     width: 2rem;
//     position: relative;
//     border-radius: 999px;
//     cursor: pointer;
// }



export const StyledIcon= styled('div')<{amount?: any}>`

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
`
export const NavLinks = styled('div')   `
  
    display: flex;
    font-size: 0.9rem;
    justify-content: center;
    gap: 1.5rem;
    color: #b9babd;
    font-weight: 500;
  
  .active {
    color: #f78f02;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .active::after {
    content: "";
    height: 0.3rem;
    width: 0.3rem;
    background-color: #f78f02;
    display: block;
    border-radius: 9999px;
  }
`

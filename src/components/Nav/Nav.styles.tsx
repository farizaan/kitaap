import styled from 'styled-components';

export const UserInfo = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
`;
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
`;
// .cart,
// .user {
//     height: 2rem;
//     width: 2rem;
//     position: relative;
//     border-radius: 999px;
//     cursor: pointer;
// }

export const StyledIcon = styled('div')<{ amount?: any }>`
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
`;
export const NavLinks = styled('div')`
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
    content: '';
    height: 0.3rem;
    width: 0.3rem;
    background-color: #f78f02;
    display: block;
    border-radius: 9999px;
  }
`;

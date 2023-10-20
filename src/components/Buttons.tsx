import styled from 'styled-components';

export const PrimaryButton = styled.button`
  border: none;
  height: 3rem;
  width: 20rem;
  background-color: #e99827;
  color: white;
  font-weight: 600;
  font-size: 1.15rem;
  cursor: pointer;
  position: relative;
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;

  &::after {
    content: '';
    display: block;
    height: 1px;
    background-color: #919495;
    position: absolute;
    top: 4rem;
    left: 50%;
    width: 80%;
    transform: translateX(-50%);
  }
`;

export const SecondaryButton = styled.button`
  margin: 1rem 1rem;
  background: none;
  border: 2px solid #e99827;
  font-weight: 500;
  font-size: 1.15rem;
  cursor: pointer;
  height: 3rem;
  width: 20rem;
  border-radius: 10px;
`;

import styled from 'styled-components';

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
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1rem;
`;

const ContainerP = styled.p`
  font-size: 1.25rem;
  max-width: 25rem;
  text-align: center;
`;

const ContainerInput = styled.input`
  display: block;
  height: 3rem;
  width: 20rem;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid rgb(190, 183, 183);
  font-size: 1.15rem;
  background: none;
  margin: 1rem;

  &::placeholder {
    color: #919495;
    font-size: 1.15rem;
  }

  &:focus {
    background-color: none;
    outline: 2px solid #f78f02;
    border: none;
  }
`;

const Strong = styled.strong`
  display: block;
  margin: 1.5rem 1rem 1rem 1rem;
  font-size: 1rem;
  font-weight: 400;
`;

const Message = styled.p`
  color: rgb(201, 52, 52);
  font-size: 1.15rem;
`;

export { Container, Wrapper, Card, ContainerP, ContainerInput, Strong, Message };

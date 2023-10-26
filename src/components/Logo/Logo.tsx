import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledLogo = styled('div')`
  flex: 1;
  cursor: pointer;

  font-size: 1.5rem;
  color: rgb(103, 101, 101);
  font-weight: 700;
  letter-spacing: 1px;

  &::first-letter {
    font-size: 2rem;
    color: #f78f02;
    font-weight: 800;
  }
`;

const Logo = (props: { link?: string }) => {
  return (
    <Link href={props.link ?? '#'}>
      <StyledLogo>Kitaap</StyledLogo>
    </Link>
  );
};

export default Logo;

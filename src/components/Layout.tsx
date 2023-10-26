import React, { ReactNode } from 'react';
import Nav from '@/components/Nav/Nav';
import { useUserContext } from '@/hooks/useUserContext';
import { Container } from '@chakra-ui/react';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const { user } = useUserContext();
  return (
    <Container maxW="container.xl">
      <Nav />
      {/*{user?.isUser && <Nav />}*/}
      {/*{user?.isAdmin && <AdminNav />}*/}
      {children}
    </Container>
  );
};

export default Layout;

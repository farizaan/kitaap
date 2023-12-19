import React, { ReactNode } from 'react';
import Nav from '@/components/Nav/Nav';
import { useUserContext } from '@/hooks/useUserContext';
import { Container } from '@chakra-ui/react';
import AdminNav from '@/components/Admin/AdminNav';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useUserContext();
  return (
    <Container maxW="container.xl">
      {/*{!user?.isAdmin && <Nav />}*/}
      <Nav />
      {/*{user?.isUser && <Nav />}*/}
      {/*{user?.isAdmin && <AdminNav />}*/}
      {children}
    </Container>
  );
};

export default Layout;

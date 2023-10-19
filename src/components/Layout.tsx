import React, { ReactNode, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import Nav from '@/components/Nav/Nav';
import { useUserContext } from '@/hooks/useUserContext';
import AdminNav from '@/components/Admin/AdminNav';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useUserContext();

  return (
    <div>
      {user?.isUser && <Nav />}
      {user?.isAdmin && <AdminNav />}
      {children}
    </div>
  );
};

export default Layout;

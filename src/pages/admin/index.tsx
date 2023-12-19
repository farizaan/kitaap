import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddNewBook from '@/components/Admin/AddNewBook';
import { useRouter } from 'next/router';
import { useUserContext } from '@/hooks/useUserContext';
import EditBooks from '@/components/Admin/EditBooks';

// Define styled components
const Container = styled.div`
  padding: 20px 5%;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  .tab {
    font-size: 1rem;
    font-weight: 500;
    color: rgb(103, 101, 101);
    cursor: pointer;
  }
  .activeTab {
    color: rgb(46, 46, 46);

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: #f79102a1;
    }
  }
`;

const tabs = [
  { id: 'ANB', label: 'Add new book' },
  { id: 'EEB', label: 'Edit existing book' },
];

function EditExistingBook() {
  return null;
}

const Index = () => {
  const [currentTab, setCurrentTab] = useState('add');
  const router = useRouter();
  const { tab } = router.query;

  const { user, setUser } = useUserContext();
  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/admin/login');
    }
  }, []);
  if (user?.isAdmin) {
    return (
      <Container>
        {!Boolean(tab) || (tab === 'add' && <AddNewBook />)}
        {tab === 'edit' && <EditBooks />}
      </Container>
    );
  }
};
export default Index;

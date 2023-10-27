import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BookCard from '@/components/BookCard/BookCard';
import { alertService } from '@/services/alertService';

const Container = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 5rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding: 0 5%;
`;

const Form = styled.form`
  width: 60%;
  min-width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const RecentlyAddedWrapper = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
`;

const Sidebar = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 1rem;
  display: block;
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid rgb(190, 183, 183);
  font-size: 1.15rem;
  background: none;

  &::placeholder {
    color: #b5bbbd;
    font-size: 1.15rem;
  }

  &:focus {
    background-color: none;
    outline: 2px solid #f78f02;
    border: none;
  }
`;

const Textarea = styled.textarea`
  resize: none;
  height: 10rem;
`;

const Select = styled.select`
  height: 3rem;
  width: 100%;
  border-radius: 10px;
  font-size: 1.1rem;
  color: #606364;
  padding-left: 1rem;
`;

const CustomFileInput = styled.input`
  &::-webkit-file-upload-button {
    border: 2px solid #f79102d4;
    padding: 1rem 1rem;
    cursor: pointer;
    border-radius: 10px;
    width: 50%;
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-start;
  padding: 1rem;
  border: none;
  background-color: #f78f02;
  border-radius: 10px;
  width: 100%;
  color: #252323;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }
`;

const Message = styled.p`
  width: 10rem;
  overflow: hidden;
`;

const AddNewBook = () => {
  const imageRef = useRef(null);
  const formRef = useRef(null);
  const [addedBooks, setAddedBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status === 'success') {
        setAddedBooks(() => data.message.slice(-10).reverse());
      }
    })();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    const formData = new FormData(formRef.current);
    // @ts-ignore
    for (const [key, value] of formData) {
      console.log(key, value);
      if (key !== 'image' && value === '') {
        setMessage('Please input all fields');
        return;
      }
      if (key === 'image' && value.name === '') {
        setMessage('Please upload an image.');
      }
    }
    if (message !== '') {
      return;
    }
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/admin/add`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();
      if (data.status === 'success') {
        // @ts-ignore
        setAddedBooks((prev) => [data.message, ...prev]);
        // @ts-ignore
        formRef.current.reset();
        alertService.success('Book successfully added!');
      } else if (data.status === 'error') {
        alertService.error('Something went wrong...!');
        setMessage(() => data.message);
      }
      // @ts-ignore
      console.log(...formData);
    })();
  };

  const handleOnChange = () => {};

  return (
    <>
      <Message>{message}</Message>
      <Container>
        <Form encType="multipart/form-data" ref={formRef} onSubmit={handleSubmit}>
          <h2>Add new book</h2>
          <div>
            <Label>Book title</Label>
            <Input
              name="title"
              type="text"
              placeholder="Eg: Ice and fire"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea name="description" placeholder="Eg: Description" />
          </div>
          <div>
            <Label>Authors</Label>
            <Input name="authors" type="text" placeholder="Eg: Bishal Niroula, Mohan Bisunke" />
          </div>
          <div>
            <Label>Category</Label>
            <Select name="category">
              <option value="UNCATEGORISED">Uncategorised</option>
              <option value="COMICS">Comics</option>
              <option value="NOVELS">Novels</option>
              <option value="FINANCE">Finance</option>
              <option value="SELFHELP">Self help</option>
              <option value="EDUCATIONAL">Educational</option>
            </Select>
          </div>
          <div>
            <Label>Price(NRs)</Label>
            <Input type="number" placeholder="Eg: 1200" name="price" />
          </div>
          <div>
            <Label>Stock</Label>
            <Input type="number" placeholder="Eg: 100" name="stock" />
          </div>
          <div>
            <Label>Image</Label>
            <CustomFileInput
              type="file"
              accept="image/png, image/gif, image/jpeg"
              ref={imageRef}
              name="image"
            />
          </div>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </Form>
        <Sidebar>
          <h3>Recently added</h3>
          {addedBooks.length === 0 && <p className={'na'}>No books added recently</p>}
          <RecentlyAddedWrapper>
            {addedBooks.length > 0 && <BookCard books={addedBooks} type="admin" />}
          </RecentlyAddedWrapper>
        </Sidebar>
      </Container>
    </>
  );
};

export default AddNewBook;

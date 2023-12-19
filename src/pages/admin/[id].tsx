import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ApiInstance } from '@/services/instance';
import { useRouter } from 'next/router';
import {
  Container,
  CustomFileInput,
  Form,
  Input,
  Label,
  Select,
  SubmitButton,
  Textarea,
} from '@/components/Admin/AddNewBook';
import { alertService } from '@/services/alertService';

const EditBook = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<any>({});
  const { title } = book;
  const [message, setMessage] = useState('');

  const imageRef = useRef(null);
  const formRef = useRef({ title });
  useEffect(() => {
    ApiInstance({
      method: 'get',
      url: `/api/books/${id}`,
    }).then((data) => {
      console.log('data', data);
      setBook(data?.data?.message);
    });
  }, []);
  const handleOnChange = useCallback(
    (type) => (event) => {
      setBook({ ...book, [type]: event.target.value });
    },
    [book]
  );
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const body = {
      title: book.title,
      id: book._id,
      description: book.description,
      price: book.price,
      stock: book.stock,
      authors: book.authors,
      category: book.category,
      image: imageRef.current?.value,
    };
    console.log('Form', body);

    // @ts-ignore
    ApiInstance({
      method: 'put',
      url: `/api/books/${id}`,
      body: body,
    }).then((data) => {
      console.log('data', data);
    });
  };
  return (
    <Container>
      <Form encType="multipart/form-data" ref={formRef} onSubmit={handleSubmit}>
        <h2>Edit book</h2>
        <div>
          <Label>Book title</Label>
          <Input
            name="title"
            type="text"
            value={book.title}
            placeholder="Eg: Ice and fire"
            onChange={(e) => handleOnChange('title')(e)}
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            style={{ width: '100%' }}
            value={book.description}
            onChange={(e) => handleOnChange('description')(e)}
            name="description"
            placeholder="Eg: Description"
          />
        </div>
        <div>
          <Label>Authors</Label>
          <Input
            name="authors"
            type="text"
            value={book.authors}
            onChange={(e) => handleOnChange('authors')(e)}
            placeholder="Eg: Fariza Nussipova, Nazzere Oryngozha"
          />
        </div>
        <div>
          <Label>Category</Label>

          <Select
            name="category"
            value={book.category}
            onChange={(e) => handleOnChange('category')(e)}
          >
            <option value="UNCATEGORISED">Uncategorised</option>
            <option value="COMICS">Comics</option>
            <option value="NOVELS">Novels</option>
            <option value="FINANCE">Finance</option>
            <option value="SELFHELP">Self help</option>
            <option value="EDUCATIONAL">Educational</option>
          </Select>
        </div>
        <div>
          <Label>Price(Tng)</Label>
          <Input
            type="number"
            value={book.price}
            onChange={(e) => handleOnChange('price')(e)}
            placeholder="Eg: 1200"
            name="price"
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            value={book.stock}
            onChange={(e) => handleOnChange('stock')(e)}
            placeholder="Eg: 100"
            name="stock"
          />
        </div>
        <div>
          <Label>Image</Label>
          <CustomFileInput
            type="file"
            accept="image/png, image/gif, image/jpeg"
            ref={imageRef}
            name="image"
            // value={book.image}
            // onChange={(e) => handleOnChange('image')(e)}
          />
        </div>
        <SubmitButton onClick={handleSubmit}>Save</SubmitButton>
      </Form>
    </Container>
  );
};

export default EditBook;

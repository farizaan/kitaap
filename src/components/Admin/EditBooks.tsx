import React, { useEffect, useState } from 'react';
import BookItem from '@/components/BookCard/BookItem';
import { Flex, Grid, Spacer } from '@chakra-ui/react';
import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
  usePagination,
} from '@ajna/pagination';
const EditBooks = () => {
  const [books, setBooks] = useState([]);
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: books?.length,
    limits: {
      outer: 2,
      inner: 2,
    },
    initialState: {
      pageSize: 8,
      isDisabled: false,
      currentPage: 1,
    },
  });
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status === 'success') {
        setBooks(() => data.message);
      }
    })();
  }, []);
  const [curItems, setCurItems] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getList = (currentPage, pageSize) => {
      setCurItems(books.slice(offset, offset + pageSize));
    };
    getList(currentPage, pageSize);
  }, [currentPage, pageSize, books, offset]);
  const normalStyles = {
    bg: 'white',
  };

  const activeStyles = {
    bg: 'blue.300',
  };

  return (
    <>
      <Grid gap={4} mt={7} px={20} templateColumns="repeat(4, 1fr)" templateRows="repeat(2, 1fr)">
        {curItems?.map((book) => (
          <BookItem book={book} type={'admin'} />
        ))}
      </Grid>
      <Flex>
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          isDisabled={false}
          onPageChange={handlePageChange}
        >
          <PaginationContainer align="center" justify="space-between" p={4} w="full">
            <PaginationPrevious
              _hover={{
                bg: '#f78f02',
              }}
              bg="white"
              onClick={() =>
                console.log(
                  'Im executing my own function along with Previous component functionality'
                )
              }
            >
              Previous
            </PaginationPrevious>
            <PaginationPageGroup
              isInline
              align="center"
              separator={
                <PaginationSeparator
                  onClick={() =>
                    console.log(
                      'Im executing my own function along with Separator component functionality'
                    )
                  }
                  bg="blue.300"
                  fontSize="sm"
                  w={7}
                  jumpSize={11}
                />
              }
            >
              {pages.map((page: number) => (
                <PaginationPage
                  w={7}
                  bg="white"
                  key={`pagination_page_${page}`}
                  page={page}
                  onClick={() =>
                    console.log(
                      'Im executing my own function along with Page component functionality'
                    )
                  }
                  fontSize="sm"
                  _hover={{
                    bg: '#f78f02',
                  }}
                  _current={{
                    bg: '#f78f02',
                    fontSize: 'sm',
                    w: 7,
                  }}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext
              _hover={{
                bg: '#f78f02',
              }}
              bg="white"
              onClick={() =>
                console.log('Im executing my own function along with Next component functionality')
              }
            >
              Next
            </PaginationNext>
          </PaginationContainer>
        </Pagination>
        {/*<Paginator onPageChange={handlePageChange} pagesQuantity={pagesQuantity - 1}>*/}
        {/*  <Previous bg="white">*/}
        {/*    <CgChevronLeft />*/}
        {/*  </Previous>*/}
        {/*  <PageGroup>*/}
        {/*    {generatePages(pagesQuantity)?.map((page) => (*/}
        {/*      <Page*/}
        {/*        key={`paginator_page_${page}`}*/}
        {/*        page={page}*/}
        {/*        normalStyles={normalStyles}*/}
        {/*        activeStyles={activeStyles}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </PageGroup>*/}
        {/*  <Next bg="white">*/}
        {/*    <CgChevronRight />*/}
        {/*  </Next>*/}
        {/*</Paginator>*/}
      </Flex>
    </>
  );
};

export default EditBooks;

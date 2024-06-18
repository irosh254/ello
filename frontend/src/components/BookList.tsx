import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Card from './Card';
import { Book } from '../models';


interface BookListProps {
  books: Book[];
  onAdd: (book: Book) => void;
}

const ROWS_TO_SHOW = 2;
const BOOKS_PER_ROW = 4;

const BookList: React.FC<BookListProps> = ({ books, onAdd }) => {
  
  const [rowsToShow, setRowsToShow] = useState(ROWS_TO_SHOW);

  const loadMore = () => {
    setRowsToShow((prev) => prev + ROWS_TO_SHOW);
  };

  const booksToShow = books.slice(0, rowsToShow * BOOKS_PER_ROW);

  return (
    <Box>
      <Grid container spacing={2}>
        {booksToShow.map((book, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card book={book} onAdd={onAdd} />
          </Grid>
        ))}
      </Grid>
      {books.length > booksToShow.length && (
        <Box display="flex" justifyContent="flex-end" mt={2} ml={4}>
          <Typography
            variant="body2"
            component="span"
            onClick={loadMore}
            sx={{ color: '#335c6e', cursor: 'pointer', textDecoration: 'underline',ml: 4 , fontFamily: 'Mulish, sans-serif' }}
          >
            Load More...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BookList;

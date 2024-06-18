import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Book } from '../models';
import Card from './Card';

interface ReadingListProps {
  books: Book[];
  onRemove: (book: Book) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({ books, onRemove }) => {
  return (
    <Box sx={{ mt: 4 }}>
      {books.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <iframe 
            src="https://giphy.com/embed/Pn1h5Un3LZD9uq3u07" 
            width="100" 
            height="100" 
            style={{ border: 'none' }} 
            allowFullScreen
            title="Crying Animation"
          ></iframe>
          <Typography variant="body2" sx={{ ml: 4, mt: 2, fontFamily: 'Mulish' }}>
            No books added to reading list yet
          </Typography>
        </Box>
      ) :  (
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item key={book.title} xs={12} sm={6} md={4} lg={3}>
              <Card book={book} onRemove={onRemove} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    
  );
};

export default ReadingList;

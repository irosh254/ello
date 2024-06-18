import React from 'react';
import { Book } from '../models';
import { Box, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { styled } from '@mui/system';

interface BookSuggestionsProps {
  books: Book[];
  onSelect: (book: Book) => void; // Add onSelect prop
}

const SuggestionBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  borderRadius: '25px',
  zIndex: 1,
  maxHeight: '200px',
  overflowY: 'auto',
  padding: '8px',
  boxSizing: 'border-box',

  // Ensuring the scrollbar stays within the rounded corners
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '25px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '25px',
  },
}));

const BookSuggestions: React.FC<BookSuggestionsProps> = ({ books, onSelect }) => {
  return (
    <SuggestionBox>
      <List dense>
        {books.map((book, index) => (
          <ListItem key={index} button onClick={() => onSelect(book)}>
            <Avatar
              src={`${process.env.PUBLIC_URL}/${book.coverPhotoURL}`}
              alt={book.title}
              sx={{ marginRight: '8px', width: '40px', height: '40px' }}
            />
            <ListItemText primary={book.title} />
          </ListItem>
        ))}
      </List>
    </SuggestionBox>
  );
};

export default BookSuggestions;

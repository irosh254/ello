import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookSuggestions from './BookSuggestions';
import { Book } from '../models';

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  books: Book[];
  onSelect: (book: Book) => void; // Add onSelect prop
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, books, onSelect }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(value.toLowerCase())
  );

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100); // Delay to allow click events
  };

  return (
    <div style={{ position: 'relative', width: '66.7%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for books"
        value={value}
        onChange={onChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        sx={{
          backgroundColor: 'white',
          borderRadius: '25px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '25px',
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {showSuggestions && filteredBooks.length > 0 && (
        <BookSuggestions books={filteredBooks} onSelect={onSelect} />
      )}
    </div>
  );
};

export default SearchBar;

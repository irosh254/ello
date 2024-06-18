import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Box, CssBaseline, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import ReadingList from './components/ReadingList';
import { Book } from './models';
import { gql, useQuery } from '@apollo/client';

// Query to fetch books
const GET_BOOKS = gql`
  query GetBooks {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [readingList, setReadingList] = useState<Book[]>([]);
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredBooks(data.books);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const filtered = data.books.filter((book: Book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, data]);

  const addToReadingList = (book: Book) => {
    setReadingList((prevList) => [...prevList, book]);
  };

  const removeFromReadingList = (book: Book) => {
    setReadingList((prevList) => prevList.filter((b) => b.title !== book.title));
  };

  const handleSelectBook = (book: Book) => {
    addToReadingList(book);
    setSearchTerm(''); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books.</p>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ bgcolor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <img src="assets/logoEllo.svg" alt="Ello Logo" width="54px" />
            </Box>
          </Box>
          <Box>
            <IconButton edge="end" sx={{color: '#335c6e'}}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{  mt: '84px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            books={data ? data.books : []}
            onSelect={handleSelectBook}
          />
        </Box>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2, ml: 4, fontFamily: 'Mulish, sans-serif' }}>
          All Books
        </Typography>
        <Box mt={4}>
          <BookList books={filteredBooks} onAdd={addToReadingList} />
        </Box>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2, ml: 4, fontFamily: 'Mulish, sans-serif' }}>
          Reading List
        </Typography>
        <Box mt={4}>
          <ReadingList books={readingList} onRemove={removeFromReadingList} />
        </Box>
      </Container>
    </Box>
  );
};

export default App;

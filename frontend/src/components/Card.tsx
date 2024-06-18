import React from 'react';
import { Book } from '../models';
import { styled } from '@mui/system';
import { Box, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface CardProps {
  book: Book;
  onAdd?: (book: Book) => void;
  onRemove?: (book: Book) => void;
}

const CardContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '220px',
  margin: '0 auto 20px',
  borderRadius: '25px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    borderColor: '#ffe6dc',
    borderWidth: '2px',
    borderStyle: 'solid',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%', 
  },
}));

const BookImage = styled('img')({
  display: 'block',
  userSelect: 'none',
  margin: 'auto',
  cursor: 'zoom-in',
  backgroundColor: 'rgb(230, 230, 230)',
  transition: 'background-color 300ms ease 0s',
  height: '242px',
  width: '100%',
  borderTopLeftRadius: '25px',
  borderTopRightRadius: '25px',
});

const FavoriteIcon = styled('div')({
  position: 'absolute',
  top: '12px',
  right: '12px',
  background: 'white',
  borderRadius: '16px',
  padding: '7px 13px',
});

const ThumbsUpIcon = styled(ThumbUpIcon)({
  color: '#f76434', 
  fontSize: '1.5rem', 
});

const CardContent = styled(Box)({
  background: 'white',
  textAlign: 'center',
  padding: '20px',
  borderBottomRightRadius: '25px',
  borderBottomLeftRadius: '25px',
  paddingTop: '10px',
  paddingBottom: '0px',
});

const CardTitle = styled(Typography)({
  margin: '0px',
  fontSize: '0.7rem',
});

const CardDescription = styled(Typography)({
  padding: '11px',
  fontSize: '0.8rem',
  lineHeight: '1',
  margin: '0px',
});

const AddButton = styled(Button)({
  backgroundColor: '#5ACCCC',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4AA3A3',
  },
  borderRadius: '20px',
  padding: '10px 20px',
    marginTop: '10px',
  marginBottom: '20px',
  fontSize: '0.7rem',
});

const RemoveButton = styled(Button)({
  backgroundColor: '#f76434',
  color: 'white',
  '&:hover': {
    backgroundColor: '#d4562c',
  },
  borderRadius: '20px',
  padding: '10px 20px',
    marginTop: '10px',
  marginBottom: '20px',
  fontSize: '0.7rem',
});

const Card: React.FC<CardProps> = ({ book, onAdd, onRemove }) => {
  const { coverPhotoURL, title, author, readingLevel } = book;
  const imageUrl = `${process.env.PUBLIC_URL}/${coverPhotoURL}`;

  return (
    <CardContainer>
      <BookImage src={imageUrl} alt={title} />
      <FavoriteIcon>
        <ThumbsUpIcon />
      </FavoriteIcon>
      <CardContent>
        <CardTitle variant="h1" sx={{ fontWeight: 'bold' }}>{title}</CardTitle>
        <CardDescription variant="body2">
          {author} - Reading Level: {readingLevel}
        </CardDescription>
        {onAdd && <AddButton onClick={() => onAdd(book)}>Add to Reading List</AddButton>}
        {onRemove && <RemoveButton startIcon={<DeleteIcon />} onClick={() => onRemove(book)}>Remove</RemoveButton>}
      </CardContent>
    </CardContainer>
  );
};

export default Card;

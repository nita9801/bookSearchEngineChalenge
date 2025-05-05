import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { User } from '../models/User';
import Auth from '../utils/auth';

const SavedBooks = () => {
  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: null,
    savedBooks: [],
  });

  const { data } = useQuery(GET_ME);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (!data) {
          throw new Error('something went wrong!');
        }

        setUserData(data.me);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [data]);

  const [removeBook] = useMutation(REMOVE_BOOK);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
      await removeBook({
        variables: { bookId },
      });
    try {
      // Update local user data after removing the book
      setUserData((prevUserData) => ({
        ...prevUserData,
        savedBooks: prevUserData.savedBooks.filter((book) => book.bookId !== bookId),
      }));

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }
      // if (!response.data) {
      //   throw new Error('something went wrong!');
      // }

      // const updatedUser = await response.json();
      // const updatedUser = response.data.removeBook;
      
      // setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userData.savedBooks.length) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book: any) => {
            return (
              <Col md='4'>
                <Card key={book.bookId} border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
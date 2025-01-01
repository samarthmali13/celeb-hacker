import axios from 'axios';

export const fetchBooks = (title, sortOrder) => async (dispatch) => {
    const response = await axios.get(
        `http://64.227.142.191:8080/application-test-v1.1/books?title=${title}&DIR=${sortOrder}`
    );
    dispatch({ type: 'FETCH_BOOKS', payload: response.data.data });
};

export const addBook = (book) => async (dispatch) => {
    const response = await axios.post(
        'http://64.227.142.191:8080/application-test-v1.1/books',
        book
    );
    dispatch({ type: 'ADD_BOOK', payload: response.data.data });
};

export const updateBook = (book) => async (dispatch) => {
    const response = await axios.put(
        `http://64.227.142.191:8080/application-test-v1.1/books/${book.id}`,
        book
    );
    dispatch({ type: 'UPDATE_BOOK', payload: response.data.data });
};
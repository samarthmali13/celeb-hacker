const initialState = {
    books: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_BOOKS':
            return { ...state, books: action.payload };
        case 'ADD_BOOK':
            return { ...state, books: [...state.books, action.payload] };
        case 'UPDATE_BOOK':
            return {
                ...state,
                books: state.books.map((book) =>
                    book.id === action.payload.id ? action.payload : book
                ),
            };
        default:
            return state;
    }
};

export default reducer;
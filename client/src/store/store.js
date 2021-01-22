import {combineReducers} from '@reduxjs/toolkit';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {booksListReducer} from "./reducers/booksReducer";

const initialState = {
    books: {
        booksList: []
    },
};

const reducer = combineReducers({
    books: booksListReducer,
});

// connect to Redux Devtool Extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;

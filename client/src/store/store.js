import {combineReducers} from '@reduxjs/toolkit';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {userCartReducer} from "./reducers/userCartReducer";
import {booksListReducer} from "./reducers/booksReducer";

const initialState = {
    books: {
        booksList: []
    },
    userCart: {
        cartItems: localStorage.getItem("userCart") ?
            JSON.parse(localStorage.getItem("userCart"))
            :
            [],
        cartCopyItem: localStorage.getItem("userCopyCart") ?
            JSON.parse(localStorage.getItem("userCopyCart"))
            :
            null
    },
};

const reducer = combineReducers({
    books: booksListReducer,
    userCart: userCartReducer,
});

// connect to Redux Devtool Extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;

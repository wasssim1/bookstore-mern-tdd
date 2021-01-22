import Axios from 'axios';
import {
    BOOK_BORROW_COPY_FAIL,
    BOOK_BORROW_COPY_REQUEST,
    BOOK_BORROW_COPY_SUCCESS,
    BOOK_BORROW_FAIL,
    BOOK_BORROW_REQUEST,
    BOOK_BORROW_SUCCESS,
    BOOK_LIST_FAIL,
    BOOK_LIST_REQUEST,
    BOOK_LIST_SUCCESS
} from "../constants/booksConstants";
import {CART_ADD_ITEM, CART_ADD_ITEM_COPY} from "../constants/userCartConstants";

export const listBooks = () => async dispatch => {
    dispatch({type: BOOK_LIST_REQUEST});
    try {
        const {data} = await Axios.get("/api/books/stock");
        dispatch({type: BOOK_LIST_SUCCESS, payload: data});
    } catch (err) {
        dispatch({type: BOOK_LIST_FAIL, payload: err.message});
    }
};

export const borrowBook = book => async (dispatch, getState) => {
    dispatch({type: BOOK_BORROW_REQUEST});
    try {
        const {data} = await Axios.put(`/api/books/${book._id}`, null);
        dispatch({type: BOOK_BORROW_SUCCESS, payload: data});
        dispatch({type: CART_ADD_ITEM, payload: book});
        localStorage.setItem("userCart", JSON.stringify(getState().userCart.cartItems));
    } catch (err) {
        dispatch({type: BOOK_BORROW_FAIL, payload: err.message});
    }
};

export const borrowCopy = bookCopy => async (dispatch, getState) => {
    dispatch({type: BOOK_BORROW_COPY_REQUEST});
    try {
        const {data} = await Axios.put(`/api/books/${bookCopy._id}/copy`, null);
        dispatch({type: BOOK_BORROW_COPY_SUCCESS, payload: data});
        await dispatch({type: CART_ADD_ITEM_COPY, payload: bookCopy,});
        localStorage.setItem("userCopyCart", JSON.stringify(getState().userCart.cartCopyItem));
    } catch (err) {
        dispatch({type: BOOK_BORROW_COPY_FAIL, payload: err});
    }
};

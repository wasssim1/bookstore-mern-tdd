import Axios from 'axios';
import {BOOK_LIST_FAIL, BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS} from "../constants/booksConstants";

export const listBooks = () => async dispatch => {
    dispatch({type: BOOK_LIST_REQUEST});
    try {
        const {data} = await Axios.get("/api/books/stock");
        dispatch({type: BOOK_LIST_SUCCESS, payload: data});
    } catch (err) {
        dispatch({type: BOOK_LIST_FAIL, payload: err.message});
    }
};

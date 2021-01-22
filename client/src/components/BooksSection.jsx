import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listBooks} from "../store/actions/booksActions";

function BooksSection() {
    const dispatch = useDispatch();

    const books = useSelector(state => state.books);
    const {booksList, loading, error} = books;

    useEffect(() => {
        dispatch(listBooks());
    }, [dispatch]);


    return (
        <div className="app_leftSide">
            <h3>Available Books</h3>
            <ul>
                {booksList?.map((book, index) => (
                    <li key={index}>
                        {book.title}
                    </li>)
                )}
            </ul>
        </div>
    );
}

export default BooksSection;

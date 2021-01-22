import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {borrowBook, borrowCopy, listBooks} from "../store/actions/booksActions";

function BooksSection() {
    const dispatch = useDispatch();

    const books = useSelector(state => state.books);
    const {booksList, loading, error} = books;

    const userCart = useSelector(state => state.userCart);
    const {cartItems, cartCopyItem} = userCart;

    useEffect(() => {
        dispatch(listBooks());
    }, [dispatch, cartItems, cartCopyItem]);

    const onClickBorrowBook = async book => {
        if (cartItems.length >= 2) {
            alert("You have a borrowing limit of 2 books!");
        } else {
            if (cartItems.find(x => x?._id === book._id)) {
                alert("You had already borrowed this book!")
            } else {
                dispatch(borrowBook(book));
            }
        }
    };

    const onClickBorrowBookCopy = async book => {
        if (cartCopyItem) {
            alert("Only 1 copy of a book can be borrowed!");
        } else {
            dispatch(borrowCopy(book));
        }
    };

    return (
        <div className="app_leftSide">
            <h3>Available Books</h3>
            <ul>
                {booksList?.map((book, index) => (
                    <li key={index}>
                        <div>
                            <b>{book.title}</b>{' '}
                            <button style={{margin: 10}}
                                    onClick={() => onClickBorrowBook(book)}
                                    disabled={!book.inStock > 0}
                            >
                                <b>Borrow</b><br/>In Stock({book.inStock})
                            </button>
                            <button style={{margin: 10}}
                                    onClick={() => onClickBorrowBookCopy(book)}
                                    disabled={!book.copiesInStock > 0}
                            >
                                <b>Borrow A Copy</b><br/>In Stock({book.copiesInStock})
                            </button>
                            <br/><br/>
                        </div>
                    </li>)
                )}
            </ul>
        </div>
    );
}

export default BooksSection;

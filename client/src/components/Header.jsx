import React from 'react';
import Axios from 'axios';
import {useSelector} from "react-redux";

function Header() {
    const books = useSelector(state => state.books);
    const {booksList} = books;

    const onClickFillData = () => {
        alert('hey')
        Axios.get("/api/books/seed")
            .then(() => console.log("Data filled!"))
            .then(err => console.error(err));
    };

    return (
        <div className="app_header">
            {!booksList?.length > 0 &&
            <button onClick={() => onClickFillData()}>Fill data</button>
            }
            <h1>Books Store</h1>
        </div>
    );
}

export default Header;

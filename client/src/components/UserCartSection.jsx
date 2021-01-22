import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {returnBook, returnCopy} from "../store/actions/booksActions";

function UserCartSection() {
    const dispatch = useDispatch();

    const userCart = useSelector(state => state.userCart);
    const {cartItems, cartCopyItem} = userCart;

    const onClickRemoveFromCart = bookId => {
        dispatch(returnBook(bookId));
    };

    const onClickRemoveCopyFromCart = bookId => {
        dispatch(returnCopy(bookId));
    };

    return (
        <div className="app_rightSide">
            <h3>Your Borrowed Books</h3>
            <ul>
                {cartItems?.map((item, index) => (
                    <li key={index}>
                        <span>{item.title}{' '}</span>
                        <button onClick={() => onClickRemoveFromCart(item._id)}>Return</button>
                        <br/><br/>
                    </li>
                ))}
                {
                    cartCopyItem &&
                    <li>
                        {`${cartCopyItem.title} (Copy)`}{' '}
                        <button onClick={() => onClickRemoveCopyFromCart(cartCopyItem._id)}>Return</button>
                    </li>
                }
            </ul>
        </div>
    );
}

export default UserCartSection;

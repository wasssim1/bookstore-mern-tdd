import React from 'react';
import {useSelector} from "react-redux";

function UserCartSection() {
    const userCart = useSelector(state => state.userCart);
    const {cartItems, cartCopyItem} = userCart;

    return (
        <div className="app_rightSide">
            <h3>Your Borrowed Books</h3>
            <ul>
                {cartItems?.map((item, index) => (
                    <li key={index}>
                        {item.title}
                    </li>
                ))}
                {
                    cartCopyItem &&
                    <li>
                        {`${cartCopyItem.title} (Copy)`}
                    </li>
                }
            </ul>
        </div>
    );
}

export default UserCartSection;

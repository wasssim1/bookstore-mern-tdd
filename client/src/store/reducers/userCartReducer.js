import {CART_ADD_ITEM, CART_ADD_ITEM_COPY} from "../constants/userCartConstants";

export const userCartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            return {...state, cartItems: [...state.cartItems, action.payload]};
        case CART_ADD_ITEM_COPY:
            return {...state, cartCopyItem: action.payload};
        default:
            return state;
    }
};

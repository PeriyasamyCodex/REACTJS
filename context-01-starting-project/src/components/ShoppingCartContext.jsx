import { createContext, useReducer, useState } from "react";
import { DUMMY_PRODUCTS } from '../dummy-products.js';
export const ShoppingContext = createContext({
    items: [],
    handleUpdateCartItemQuantity: () => { },
    handleAddItemToCart: () => { }
});

function shoppingCartReducer(state, actions) {

    if (actions.type === "ADD_ITEM") {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === actions.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === actions.payload);
            updatedItems.push({
                id: actions.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            items: updatedItems,
        };
    }
    if (actions.type === "UPDATE_ITEM") {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === actions.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += actions.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            items: updatedItems
        };
    }
}


export default function ShoppingCartContext({ children }) {

    const [shoppingCart, dispatchShoppingCart] = useReducer(shoppingCartReducer, {
        items: [],
    });

    function handleAddItemToCart(id) {

        dispatchShoppingCart({
            type: "ADD_ITEM",
            payload: id
        });

    }

    function handleUpdateCartItemQuantity(productId, amount) {

        dispatchShoppingCart({
            type: "UPDATE_ITEM",
            payload: { productId, amount }

        });
    }

    const shopCtxValue = {
        items: shoppingCart.items,
        handleAddItemToCart: handleAddItemToCart,
        handleUpdateCartItemQuantity: handleUpdateCartItemQuantity
    }

    return <ShoppingContext.Provider value={shopCtxValue}>{children}</ShoppingContext.Provider>
}
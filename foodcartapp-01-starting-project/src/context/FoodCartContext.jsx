import { createContext, useEffect, useReducer } from "react";

export const FoodContext = createContext({
    cartItems: [],
    openModal: () => { },
    addItemToCart: () => { },
    onCartIncrease: () => { },
    onCartDecrease: () => { },
    openCheckOutMOdal: () => {}
});

function foodCartReducer(state, actions) {

    if (actions.type === 'ADD_CART_ITEM') {
        const prevCartItems = [...state.cartItems];
        const isItemAlreadyExists = prevCartItems.find((item) => (item.id === actions.payload.id));
        if(isItemAlreadyExists){
            const updatedCartItem = prevCartItems.map((item) => (item.id === actions.payload.id)  ? {...item, qty: item.qty++} : item);
            console.log('ADD_CART_ITEM'+JSON.stringify(updatedCartItem));
            return {
                ...state,
                cartItems: updatedCartItem
            }
        }     
        return {
            ...state,
            cartItems: [actions.payload, ...state.cartItems]
        }
        
       
    }
    if (actions.type === 'REMOVE_CART_ITEM') {
        const prevCartItems = [...state.cartItems];
        const itemsAfterRemoval = prevCartItems.filter((item) => item.id !== actions.payload);
        return {
            ...state,
            cartItems: [itemsAfterRemoval]
        }
    }
    if (actions.type === 'TOGGLE_OPEN_MODEL_FLAG') {
        console.log('cartItems.openModal ' + state.openModal);
        return {
            ...state,
            openModal: !state.openModal
        }
    }

    if (actions.type === 'CART_ITEM_INCREASE') {
        const prevCartItems = [...state.cartItems];
        const updatedCartItem = prevCartItems.map((item) => (item.id === actions.payload)  ? {...item, qty: item.qty++} : item);
        console.log('CART_ITEM_INCREASE'+JSON.stringify(updatedCartItem));
        return {
            ...state,
            cartItems: updatedCartItem
        }
    }

    if (actions.type === 'CART_ITEM_DECREASE') {
        const prevCartItems = [...state.cartItems];
        let updatedCartItem = prevCartItems.map((item) => (item.id === actions.payload)  ? {...item, qty: item.qty--} : item);
        updatedCartItem =  updatedCartItem.filter((item) => item.qty > 0);
        console.log('CART_ITEM_DECREASE'+JSON.stringify(updatedCartItem));
        return {
            ...state,
            cartItems: updatedCartItem
        }
    }

    if (actions.type === 'TOGGLE_OPEN_CHECKOUT_MODEL_FLAG') {
        console.log('cartItems.openModal ' + state.checkoutModal);
        return {
            ...state,
            openCheckOutMOdal: !state.openCheckOutMOdal
        }
    }


}


export default function FoodCartContext({ children }) {
    // const mealsFetched = useFetch(fetchMeals,[],'http://localhost:3000/meals');
    const [cartItems, dispatchCartItems] = useReducer(foodCartReducer, {
        cartItems: [],
        openModal: false,
        openCheckOutMOdal: false
    });

    function addItemToCart(cartItem) {
        dispatchCartItems({
            type: 'ADD_CART_ITEM',
            payload: cartItem
        })
    }
    function removeItemToCart(id) {
        dispatchCartItems({
            type: 'REMOVE_CART_ITEM',
            payload: id
        })
    }

    function toggleOpenModelFlag() {
        dispatchCartItems({
            type: 'TOGGLE_OPEN_MODEL_FLAG'
        })
    }

    function onCartIncrease(id) {
        dispatchCartItems({
            type: 'CART_ITEM_INCREASE',
            payload: id
        })
    }

    function onCartDecrease(id) {
        dispatchCartItems({
            type: 'CART_ITEM_DECREASE',
            payload: id
        })
    }

    function toggleOpenCheckoutModelFlag() {
        dispatchCartItems({
            type: 'TOGGLE_OPEN_CHECKOUT_MODEL_FLAG'
        })
    }

    const ctxValue = {
        cartItems: cartItems,
        openModal: toggleOpenModelFlag,
        addItemToCart: addItemToCart,
        removeItemToCart: removeItemToCart,
        onCartIncrease: onCartIncrease,
        onCartDecrease: onCartDecrease,
        openCheckOutMOdal: toggleOpenCheckoutModelFlag
    };

    return <FoodContext.Provider value={ctxValue}>{children}</FoodContext.Provider>
}
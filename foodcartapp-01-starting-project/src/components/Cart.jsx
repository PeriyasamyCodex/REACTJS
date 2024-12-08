import { useContext, useRef } from "react";
import Modal from "./Modal";
import { FoodContext } from "../context/FoodCartContext";
import CartItem, { currencyFormatter } from "./CartItem";
import Button from "./Button";

export default function Cart() {
  
    const {cartItems, openModal, openCheckOutMOdal} = useContext(FoodContext);
    const modelRef = useRef();
    console.log('Cart rendered'+JSON.stringify(cartItems));
    if (cartItems.openModal) {
        console.log('cartItems.openModal 1'+cartItems.openModal);
        modelRef.current.open();
    }else {
        modelRef.current && modelRef.current.close();
    }

    const cartTotal = cartItems.cartItems.reduce((totalPrice,item) => totalPrice + item.qty * item.price, 0);
  

    return (
       <Modal className="cart" ref={modelRef} onClose={cartItems.cartItems.openModal}>
      
        <h2>Your Cart</h2>
        <ul >
        {cartItems.cartItems && cartItems.cartItems.map((item) => (
            <CartItem key= {item.id} item={item}/>
           ))}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button className="button" onClick={openModal}>
          Close
        </Button>
        {cartItems.cartItems.length > 0 && (
          <Button className="button" onClick={() => {
            openModal();
            openCheckOutMOdal();
          }}>Go to Checkout</Button>
        )}
      </p>
       </Modal>
    );
}
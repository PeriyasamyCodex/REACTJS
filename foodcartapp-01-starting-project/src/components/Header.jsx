import { useContext } from 'react';
import titleImg from '../assets/logo.jpg'
import { FoodContext } from '../context/FoodCartContext';

export default function Header() {
    const {cartItems, openModal}  = useContext(FoodContext);
    console.log('Header ->'+cartItems.cartItems.length);
    return (
        <div id="main-header">
                <span id="title">
                    <img src={titleImg} alt='React Food Title Image' />
                    <h1>REACTFOOD</h1>
                </span>
                <button className='text-button' onClick={openModal}>Cart{cartItems.cartItems && `(${cartItems.cartItems.length})`}</button>
        </div>
    );
}
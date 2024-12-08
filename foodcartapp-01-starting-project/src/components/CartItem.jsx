import { useContext } from "react";
import { FoodContext } from "../context/FoodCartContext";

export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

export default function CartItem({item}) {

    const {onCartIncrease,onCartDecrease} = useContext(FoodContext);


    return (
        <li key={item.id} className="cart-item">
          <p>
        {item.name} - {item.qty} x {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
      <span>{item.qty}</span>
         <button onClick={() => onCartDecrease(item.id)}>-</button>
        <span>{item.qty}</span>
        <button onClick={() => onCartIncrease(item.id)}>+</button> 
      </p>
        </li>
    );
}
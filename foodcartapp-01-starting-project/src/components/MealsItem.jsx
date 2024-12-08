import { useContext } from "react";
import  { FoodContext } from "../context/FoodCartContext";

export default function MealsItem({data}) {

    const {openModal,addItemToCart} = useContext(FoodContext);
   
    return (
        <li key={data.id} className="meal-item">
            <article>
                <img src={`http://localhost:3000/${data.image}`} alt={data.name}/>
                <h3>{data.name}</h3>
                <span className="meal-item-price">${data.price}</span>
                <p className="meal-item-description">{data.description}</p>
                <button className="button" onClick={() => addItemToCart({...data, qty: 1})}>Add To Cart</button>
            </article>
        </li>
    );
}
import { useContext, useRef, useState } from "react";
import Button from "./Button";
import { currencyFormatter } from "./CartItem";
import Input from "./Input";
import Modal from "./Modal";
import { FoodContext } from "../context/FoodCartContext";
import useFetch from "../hooks/useFetch";

const requestConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

export default function Checkout() {

    const  {cartItems, openCheckOutMOdal} = useContext(FoodContext);
    const {respData, sendRequest, error} =  useFetch('http://localhost:3000/orders', requestConfig);
    const checkoutModal  = useRef();
    const [isOrderSuccess, setIsOrderSucess] = useState(false);

    console.log('Checkout '+JSON.stringify(cartItems));

    function handleClose() {
        setIsOrderSucess(false);
        checkoutModal.current.close();
       // openCheckOutMOdal();
      
    }

    if (cartItems && cartItems.openCheckOutMOdal) {
        console.log('cartItems.openCheckOutMOdal '+cartItems.openCheckOutMOdal);
        checkoutModal.current.open();
    }

    function handleSubmit(event) {

        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
    console.log('Form Data'+JSON.stringify(customerData));

        sendRequest(JSON.stringify({
            order: {
              items: cartItems.cartItems,
              customer: customerData,
            },
          }));  
        //  handleClose();
       //   openCheckOutMOdal();
         
          if (respData && !error ) {
            setIsOrderSucess(true);
          }
          

    }


 

    return (
        <Modal  ref={checkoutModal} onClose={handleClose}>
           {isOrderSuccess && (
            <>
             <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleClose}>Okay</Button>
        </p>
        </>
           )}
           {!isOrderSuccess && (
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(0)}</p>

                <Input label="Full Name" type="text" id="name" required/>
                <Input label="E-Mail Address" type="email" id="email" required/>
                <Input label="Street" type="text" id="street" required/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" required maxLength="6"/>
                    <Input label="City" type="text" id="city" required/>
                </div>



                <p className="modal-actions">
                    <Button type="button" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit">Submit Order</Button>
                </p>
            </form>
           )}
        </Modal>
    );
}
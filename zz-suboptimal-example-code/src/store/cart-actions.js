
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {

    return async(dispatch) => {
        
        const fetchData = async () => {
            const response = await fetch('https://joe-react-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Failed to Fetch Cart Data');
            }

            const respData = response.json();

            return respData;

        }

        try {
            const response = await fetchData();
            dispatch(cartActions.replaceCart(response));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Storing Cart Data Failed'
            }));
            console.log('error +'+error);
        }

    }
}

const sendCartData = (cart) => {

    return async(dispatch) => {
        const requestConfig = {
            method: 'PUT',
            body: JSON.stringify(cart)
        }
        const fetchData = async () => {
            const response = await fetch('https://joe-react-default-rtdb.firebaseio.com/cart.json', requestConfig);

            if (!response.ok) {
                throw new Error('Failed to Store Cart Data');
            }

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Successfully saved Cart Data'
            }));

        }

        try {
            await fetchData();
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Storing Cart Data Failed'
            }));
            console.log('error +'+error);
        }

    }
}

export default sendCartData;
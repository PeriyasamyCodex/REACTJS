import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import sendCartData, { fetchCartData } from './store/cart-actions';
import Notification from './components/UI/Notification';

let initial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const cart = useSelector((state) => state.cart);

  const notification = useSelector((state) => state.ui.notification)

  const dispatch = useDispatch();

  useEffect(() => {

    if(initial) {
      initial = false;
      dispatch(fetchCartData());
    }


    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
   
  },[cart,dispatch]);

  return (
    <Fragment>
      {notification && <Notification title={notification.title} status={notification.status} message={notification.message} />}
      
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;

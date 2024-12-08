import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import FoodCartContext from "./context/FoodCartContext";

function App() {
  return (
    <FoodCartContext>
      <Header />
      <Meals />
      <Cart />
    <Checkout />
    </FoodCartContext>
  );
}

export default App;

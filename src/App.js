import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import items from './api/items';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import logo from './logo.svg';
import './App.css';
const apiKey = process.env.REACT_APP_STRIPE_API_KEY;

export default function App() {
  const [itemsInCart, setItemsInCart] = useState([]);

  const handleAddToCartClick = id => {
    setItemsInCart(itemsInCart => {
      const itemInCart = itemsInCart.find(item => item.id === id);

      // if item is already in cart, update the quantity
      if (itemInCart) {
        return itemsInCart.map(item => {
          if (item.id !== id) return item;
          return { ...itemInCart, quantity: item.quantity + 1 };
        });
      }

      // otherwise, add new item to cart
      const item = items.find(item => item.id === id);
      return [...itemsInCart, { ...item, quantity: 1 }];
    });
  };

  const totalCost = itemsInCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
  );

  return (
      <div className="App">
        <main className="App-shop">
          <form>
            <input type={"text"} placeholder={"Last Name"}/>
            <input type={"text"} placeholder={"Preferred First Name"}/>
            <input type={"text"} placeholder={"Street Address"}/>
            <input type={"text"} placeholder={"City"}/>
            <input type={"text"} placeholder={"State"}/>
            <input type={"text"} placeholder={"Zip"}/>
            <input type={"text"} placeholder={"Work Address"}/>
            <input type={"text"} placeholder={"Cell Phone"}/>
            <input type={"text"} placeholder={"Home Phone"}/>
            <input type={"text"} placeholder={"Work Phone"}/>
            <input type={"text"} placeholder={"Job Title"}/>
            <input type={"number"} placeholder={"Number of Tickets"}/>
            <select>
              <option value={"Student"}>Student</option>
              <option value={"Family"}>Family</option>
              <option value={"Professional CEC Member"}>Professional CEC Member</option>
              <option value={"Professional Non-member"}>Professional CEC Member</option>
              <option value={"Group Rate"}>Group Rate</option>
              <option value={"Early Bird"}>Early Bird</option>
              <option value={"At-the-door"}>At-the-door</option>
            </select>
            <div>
              <StripeProvider apiKey={apiKey}>
                <Elements>
                  <CheckoutForm totalCost={totalCost} />
                </Elements>
              </StripeProvider>
            </div>
            <input type={"radio"} name={"paymentStatus"} id={"creditCard"} value={"Credit Card"}/>
            <input type={"radio"} name={"paymentStatus"} id={"check"} value={"Check"}/>
            <input type={"radio"} name={"paymentStatus"} id={"payAtDoor"} value={"Pay At Door"}/>
            <input type={"radio"} name={"paymentStatus"} id={"invoice"} value={"Pay By Invoice"}/>
            <input type={"text"} placeholder={"Payment #"}/>
            <input type={"text"} placeholder={"Payment Date"}/>
            <button type={"submit"}>Register</button>
          </form>
        </main>
      </div>
  );
}
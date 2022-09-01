import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LoadingBar from 'react-top-loading-bar'

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value : null})
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
    const token = localStorage.getItem('token')
    if(token){
      setUser({ value : token})
    }
    setKey(Math.random())
  }, [router.query]);

  // function for logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser({ value : null});
    setKey(Math.random());
    router.push('/');
  }
  // save items into the localstorage
  const saveCart = (myCart) => {
    if (myCart !== undefined) {
      // console.log(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      // calculatin subTotal of items
      let subt = 0;
      let keys = Object.keys(myCart);
      console.log(keys);
      for (let i = 0; i < keys.length; i++) {
        subt += myCart[keys[i]].price * myCart[keys[i]].qty;
      }
      setSubTotal(subt);
    }
  };
  // function for adding product into the cart
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    // checkin if an item is already exists in the cart then add new items
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    // if item in not into the cart then add new item into the cart
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  // function for buy now product
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = { itemCode: { qty: 1, price, name, size, variant } };

    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  // function for remove product into the cart
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    console.log(itemCode);
    let newCart = JSON.parse(JSON.stringify(cart));
    // checkin if an item is already exists in the cart then add new items
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  // function for clear cart items
  const clearCart = () => {
    setCart({});
    saveCart({});
    console.log("Cart has been cleared");
  };
  return (
    <>
    <LoadingBar
        color='#f72585'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      {key && <Navbar
        key={key}
        user={user}
        cart={cart}
        logout={logout}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
      />}
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        buyNow={buyNow}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;

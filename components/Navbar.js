import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ user, cart, addToCart, removeFromCart, clearCart, subTotal, logout }) => {
  const [dropDown, setDropDown] = useState(false)
  const ref = useRef();

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

 
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-xl sticky top-0 bg-white z-10">
      <div className="logo mr-auto md:mx-5">
        <Link href={"/"}>
          <a>
            <Image src="/logo.png" alt="logo" width={200} height={40} />
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-4 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <a>
              <li>Thsirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"}>
            <a>
              <li>Hoodies</li>
            </a>
          </Link>
          
          <Link href={"/mugs"}>
            <a>
              <li>Mugs</li>
            </a>
            </Link>
          <Link href={"/stickers"}>
            <a>
              <li>Stickers</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="cart items-center absolute right-0 top-4 mx-5 cursor-pointer flex">
        <a onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
        {dropDown &&  <div onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)} className="absolute py-4 right-8 bg-pink-300 top-7 rounded-md px-5 w-36">
          <ul>
            <Link href={'/myaccount'}><a><li className="py-1 text-sm hover:text-pink-800 text-bold">My Account</li></a></Link>
            <Link href={'/orders'}><a><li className="py-1 text-sm hover:text-pink-800 text-bold">Order</li></a></Link>
            <li onClick={logout} className="py-1 text-sm hover:text-pink-800 text-bold">LogOut</li>
          </ul>
        </div>}
      {user.value && <MdAccountCircle className="text-xl md:text-2xl mx-2"  />}
      </a>
        {!user.value && <Link href={"/login"}>
          <a>
            <button className="bg-pink-500 px-2 py-1 rounded-md text-sm text-white mx-2">Login</button>
          </a>
        </Link>}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-2xl"
        />
      </div>

      {/* cart */}
      <div
        ref={ref}
        className={`w-72 h-[100vh] sidecart overflow-y-scroll absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform 
        ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 text-2xl text-pink-500 cursor-pointer"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="mt-4 font-normal">Your cart is empty!...</div>
          )}
          {Object.keys(cart).map((item) => {
            console.log(item);
            return (
              <li key={item}>
                <div className="item flex my-3">
                  <div className="w-2/3 font-semibold">
                    {cart[item].name}({cart[item].size}/{cart[item].variant})
                  </div>
                  <div className="flex items-center font-semibold justify-center w-1/3 text-lg">
                    {" "}
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          item,
                          1,
                          cart[item].price,
                          cart[item].name,
                          cart[item].size,
                          cart[item].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />{" "}
                    <span className="mx-2 text-sm"> {cart[item].qty} </span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          item,
                          1,
                          cart[item].price,
                          cart[item].name,
                          cart[item].size,
                          cart[item].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="font-bold my-2">Subtotal : {subTotal}</div>
        <div className="flex">
          <Link href={"/checkout"}>
            <button className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" /> CheckOut
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

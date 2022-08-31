import React from "react";
import Link from "next/link";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  return (
    <div className="container px-2 sm:m-auto ">
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-bold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="email" class="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="name" class="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div class=" mb-4">
          <label htmlFor="address" class="leading-7 text-sm text-gray-600">
            Name
          </label>
          <textarea
            type="text"
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="phone" class="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="city" class="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="state" class="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div class=" mb-4">
            <label htmlFor="pincode" class="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <h2 className="font-bold text-xl">2. Review Cart Items & Pay</h2>
      <div className=" sidecart bg-pink-100 p-6 my-2 ">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="mt-4 font-normal">Your cart is empty!...</div>
          )}
          {Object.keys(cart).map((item) => {
            return (
              <li key={item}>
                <div className="item flex my-3">
                  <div className="font-semibold">{cart[item].name}</div>
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
        <span className="font-bold">Subtotal : {subTotal}</span>
      </div>
      <div className="mx-4">
        <Link href={"/checkout"}>
          <button className="flex mr-2  text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
            <BsFillBagCheckFill className="m-1" /> Pay Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;

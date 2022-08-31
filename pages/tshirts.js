import mongoose from "mongoose";
import Link from "next/link";
import React from "react";
import Product from "../models/Product";

const Tshirts = ({ products }) => {
  console.log(products);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {products.map((product) => {
              return (
                <Link
                  key={product._id}
                  passHref={true}
                  href={`/product/${product.slug}`}
                >
                  <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto md:mx-0 h=[30vh] md:h-[36vh] block"
                        src={product.img}
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {product.title}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        Wear The Code
                      </h2>
                      <p className="mt-1">₹{product.price}</p>
                      <p className="mt-1">{product.size}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "T-Shirts" });

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Tshirts;

"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const limit = 8;

  const getAllProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
    const data = await res.json();
    const productsData = data.products;
    console.log(productsData);
    setProducts(productsData);
    console.log(productsData);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="py-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Featured Products
        </h2>
        <p className="mt-1 text-sm text-muted">
          Explore our handpicked collection
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const { thumbnail, brand, title, price, rating, discountPercentage } =
            product;
          return (
           <article
          key={title}
          className="rounded-card border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="relative flex aspect-square items-center justify-center bg-surface p-5">
            <Image
              src={thumbnail}
              alt={title}
              width={300}
              height={300}
              className="h-full w-full object-contain"
            />

            <span className="absolute left-3 top-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {Math.round(discountPercentage)}% OFF
            </span>

            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium">
              <FaStar className="text-amber-500" />
              {rating}
            </span>
          </div>

          {/* Product Details */}
          <div className="space-y-3 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              {brand || "Shop's Product"}
            </p>

            <h3 className="min-h-12 text-sm font-semibold leading-6">
              {title}
            </h3>

            <div className="flex items-center gap-2">
              <p className="text-lg font-bold">
                ${price}
              </p>

              <p className="text-xs text-muted">
                Incl. discount
              </p>
            </div>

            <button
              type="button"
              className="w-full rounded-lg btn-primary"
            >
              View Product
            </button>
          </div>
        </article>
          );
        })}
      </div>
<div className="flex justify-center items-center">
      <Link href="/products" className="btn-primary btn-hover">Explore</Link>

</div>
    </section>
  );
};

export default Featured;

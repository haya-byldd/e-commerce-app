"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;
  const totalPages = Math.ceil(totalProduct / limit);
  const skip = (currentPage - 1) * limit;
  console.log(skip);
  console.log(totalPages);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage-1)

  }

  const handleNextPage = () => {
    setCurrentPage(currentPage+1)

  }

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data = await res.json();
    const productsData = data.products;
    setTotalProduct(data.total);
    setProducts(productsData);
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <section className="py-8 space-y-6 flex-1">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          All Featured Products
        </h2>
        <p className="mt-1 text-sm text-muted">{totalProduct} Products</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const { id,thumbnail, brand, title, price, rating, discountPercentage } =
            product;
          return (
            <article
              key={id}
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
                  <p className="text-lg font-bold">${price}</p>

                  <p className="text-xs text-muted">Incl. discount</p>
                </div>

                <button type="button" className="w-full rounded-lg btn-primary">
                  View Product
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <div className="flex justify-center items-center gap-10 mt-10">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}
          className="sm:w-35 py-2 px-4 sm:px-8 w-25 btn-primary rounded-lg font-semibold disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 cursor-pointer"
        >
          Previous
        </button>
        <p className="font-medium text-sm">{currentPage} of {totalPages}</p>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="sm:w-35 py-2 px-4 sm:px-8 w-25 btn-primary rounded-lg font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductList;

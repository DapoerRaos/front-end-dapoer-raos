"use client";

import { getOrderByDate } from "@/libs/order-libs";
import { formatDate } from "date-fns";
import React, { useEffect, useState } from "react";

const ProductInformation = ({ token }) => {
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const orderData = await getOrderByDate(
        token,
        null,
        formatDate(new Date(), "yyyy-MM-dd"),
        formatDate(new Date(), "yyyy-MM-dd")
      );
      if (orderData && orderData.status === "Success") {
        const orderItems = orderData.data.order_list.flatMap(
          (order) => order.OrderItems
        );
        const outOfStock = orderItems
          .map((item) => item.Product)
          .filter((product) => product.stock === 0);

        const uniqueOutOfStock = Array.from(
          new Map(outOfStock.map((item) => [item.id, item])).values()
        );

        setOutOfStockProducts(uniqueOutOfStock);
      }
      console.log(outOfStockProducts.length);
    };
    fetchData();
  }, [token]);

  return (
    <div className="mt-4">
      <div className=" shadow-md p-4 rounded-xl hover:shadow-xl transition-all border-l-8 border-pink-700">
        <h2 className="text-lg font-medium mb-2">
          Daftar produk yang habis dari pesanan hari ini -{" "}
          {formatDate(new Date(), "dd MMM yyyy")}
        </h2>
        {outOfStockProducts.length === 0 ? (
          <p>Belum ada produk yang habis</p>
        ) : (
          <ul>
            {outOfStockProducts.map((product) => (
              <li key={product.id}>
                {product.name} - Stok: {product.stock}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductInformation;

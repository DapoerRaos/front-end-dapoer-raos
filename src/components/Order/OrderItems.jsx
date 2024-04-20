"use client";

import { formatPrice } from "@/libs/utils/PriceFormat";
import { Image } from "@chakra-ui/react";
import Link from "next/link";

const OrderItems = ({ orderItems }) => {
  return (
    <ul>
      {orderItems
        .sort((a, b) => a.id - b.id)
        .map((item) => {
          return (
            <li key={item.id} className="flex py-4 border-b">
              <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image
                  src={`http://localhost:3001/products/${item.Product.image_path}`}
                  alt={item.Product.name}
                  className="object-cover object-center aspect-square"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                <div className="flex justify-between">
                  <Link
                    href={`/products/detail/${item.Product.id}`}
                    className="sm:text-lg font-semibold text-black line-clamp-2"
                  >
                    <p>{item.Product.name}</p>
                  </Link>
                </div>
                <div className="flex flex-col flex-1 text-sm font-medium gap-1 mt-2">
                  <p>{formatPrice(parseFloat(item.Product.price))}</p>
                  <p>Total Item: {item.quantity}</p>
                  <p>Subtotal: {formatPrice(parseFloat(item.total_price))}</p>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default OrderItems;

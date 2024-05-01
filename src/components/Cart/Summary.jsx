"use client";

import { formatPrice } from "@/libs/utils/PriceFormat";
import ButtonCheckOut from "./ButtonCheckOut";

const Summary = ({ userCart, token }) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">Ringkasan Pesanan</h2>
      {userCart.cart_items
        .sort((a, b) => a.id - b.id)
        .map((item, index) => {
          return (
            <div key={item.id} className="mt-2 flex justify-between">
              <p className="text-sm">
                {index + 1}. {item.Product.name} ({item.quantity})
              </p>
              <p className="text-sm">
                {formatPrice(parseFloat(item.total_price))}
              </p>
            </div>
          );
        })}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">
            <p>Total Pesanan</p>
          </div>
          <p>{formatPrice(userCart.cart.grand_price)}</p>
        </div>
        <ButtonCheckOut userCart={userCart} cookieToken={token} />
      </div>
    </div>
  );
};

export default Summary;

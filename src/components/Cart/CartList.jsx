"use client";

import { removeCartItem, updateQuantityCartItem } from "@/libs/cart-libs";
import { Image, Button, IconButton, useToast } from "@chakra-ui/react";
import { DeleteIcon, MinusIcon, AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { formatPrice } from "@/libs/utils/PriceFormat";

const CartList = ({ token, userCart }) => {
  const toast = useToast();

  const handleRemoveCartItems = async (id) => {
    try {
      const response = await removeCartItem(id, token);
      location.reload();
      successToast(response.message);
    } catch (err) {
      failedToast(err.response.data.message);
    }
  };

  const handleDecreaseQuantity = async (cart_item_id, newQuantity) => {
    try {
      const response = await updateQuantityCartItem(
        token,
        cart_item_id,
        newQuantity
      );
      location.reload();
      successToast(response.message);
    } catch (err) {
      failedToast(err.response.data.message);
    }
  };

  const handleIncreaseQuantity = async (cart_item_id, newQuantity) => {
    try {
      const response = await updateQuantityCartItem(
        token,
        cart_item_id,
        newQuantity
      );
      location.reload();
      successToast(response.message);
    } catch (err) {
      failedToast(err.response.data.message);
    }
  };

  const successToast = (message) => {
    toast({
      title: message,
      status: "success",
      duration: 2000,
      position: "top",
    });
  };

  return (
    <ul>
      {userCart.cart_items
        .sort((a, b) => a.id - b.id)
        .map((item) => {
          return (
            <li key={item.id} className="flex py-6 border-b">
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
                  <Button
                    size={"sm"}
                    as={IconButton}
                    icon={<DeleteIcon />}
                    color={"#feab3b"}
                    bgColor={"orange.50"}
                    _hover={{
                      bg: "#febb3b",
                      color: "white",
                    }}
                    onClick={() => handleRemoveCartItems(item.id)}
                  />
                </div>
                <div className="flex flex-col flex-1 justify-between font-medium gap-4 mt-2">
                  <p>{formatPrice(parseFloat(item.Product.price))}</p>
                  <div className="flex items-center gap-4">
                    <button
                      className=" transition-all bg-orange-50 text-[#feab3b] hover:bg-[#febb3b] hover:text-white px-2 py-1 rounded-lg"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        handleDecreaseQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <MinusIcon />
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className=" transition-all bg-orange-50 text-[#feab3b] hover:bg-[#febb3b] hover:text-white px-2 py-1 rounded-lg"
                      disabled={item.quantity >= item.Product.stock}
                      onClick={() =>
                        handleIncreaseQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default CartList;

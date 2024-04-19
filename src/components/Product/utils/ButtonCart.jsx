"use client";

import { addItemToCart } from "@/libs/cart-libs";
import { Button, useToast, Box } from "@chakra-ui/react";
import { ShoppingCart } from "@phosphor-icons/react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ButtonCart = ({ token, product_id }) => {
  const [isCustomer, setIsCustomer] = useState(false);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const tokenDecoded = jwtDecode(token);
      setIsCustomer(tokenDecoded.role === "customer");
    }
  }, [token]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!token) {
      router.push("/auth/login");
    } else {
      try {
        const response = await addItemToCart(product_id, token);
        location.reload();
        successToast(response.message);
      } catch (err) {
        failedToast(err.response.data.message);
      }
    }
  };

  const successToast = (message) => {
    toast({
      title: message,
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const failedToast = (message) => {
    toast({
      title: message,
      position: "top",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      {(isCustomer || !token) && (
        <Button
          onClick={handleClick}
          rounded={"full"}
          color={"#feab3b"}
          bgColor={"orange.50"}
          _hover={{
            bg: "#febb3b",
            color: "white",
          }}
        >
          <ShoppingCart size={20} />
        </Button>
      )}
    </>
  );
};

export default ButtonCart;

"use client";

import { Button } from "@chakra-ui/react";
import { ShoppingCart } from "@phosphor-icons/react";

const ButtonCart = () => {
  const handleClick = (e) => {
    e.preventDefault();
    alert("Added to cart");
  };

  return (
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
  );
};

export default ButtonCart;

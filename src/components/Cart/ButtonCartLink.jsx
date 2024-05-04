"use client";

import { getCartByUserCartId } from "@/libs/cart-libs";
import { Flex, Text } from "@chakra-ui/react";
import { ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ButtonCartLink = ({ token, cartRoute }) => {
  const [item, setItem] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCartByUserCartId(token);
        setItem(response.data.total_items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <Link href={cartRoute}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        color={"#feab3b"}
        bgColor={"orange.50"}
        _hover={{
          bg: "#febb3b",
          color: "white",
        }}
        transition={"all 0.2s"}
        rounded={"full"}
        py={2}
        px={3}
        gap={3}
        fontWeight={"medium"}
      >
        <ShoppingCart size={20} />
        <Text>{item}</Text>
      </Flex>
    </Link>
  );
};

export default ButtonCartLink;

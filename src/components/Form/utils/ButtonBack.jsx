"use client";

import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonBack = () => {
  const router = useRouter();
  const handleButton = () => {
    router.back();
  };
  return (
    <Box
      _hover={{ cursor: "pointer", paddingLeft: 2, color: "#feab3b" }}
      transition={"all 0.2s"}
      position="absolute"
      top={4}
      left={4}
      display={"flex"}
      alignItems={"center"}
      onClick={() => handleButton()}
    >
      <ChevronLeftIcon boxSize={6} />
      <Text>Kembali</Text>
    </Box>
  );
};

export default ButtonBack;

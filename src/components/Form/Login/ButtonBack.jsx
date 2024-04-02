"use client";

import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const ButtonBack = () => {
  return (
    <Link href="/">
      {" "}
      <Box
        _hover={{ cursor: "pointer", paddingLeft: 2, color: "#feab3b" }}
        transition={"all 0.2s"}
        position="absolute"
        top={4}
        left={4}
        display={"flex"}
        alignItems={"center"}
      >
        <ChevronLeftIcon boxSize={6} />
        <Text>Kembali</Text>
      </Box>
    </Link>
  );
};

export default ButtonBack;

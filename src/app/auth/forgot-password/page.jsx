import EmailConfirmation from "@/components/Form/EmailConfirmation";
import ButtonBack from "@/components/Form/utils/ButtonBack";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/");
  }
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
      <Stack spacing={4} mx={"auto"} w={{ base: "sm", md: "md" }} py={4} px={6}>
        <ButtonBack />
        <EmailConfirmation />
      </Stack>
    </Flex>
  );
};

export default page;

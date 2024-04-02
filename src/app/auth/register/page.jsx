import { Flex, Stack, Text, Image } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ButtonBack from "@/components/Form/Register/ButtonBack";
import RegisterForm from "@/components/Form/Register";

export default function Register() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/");
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
      <Stack
        spacing={2}
        mx={"auto"}
        w={{ base: "sm", md: "md" }}
        py={12}
        px={6}
      >
        <ButtonBack />
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Image
            src="/images/dapoer-raos-logo.png"
            alt="logo"
            width={12}
            height={12}
          />
          <Text fontWeight={"semibold"} fontSize={"xl"}>
            Dapoer Raos by <span className="text-[#feab3b]">Dee</span>
          </Text>
        </Flex>
        <RegisterForm />
      </Stack>
    </Flex>
  );
}

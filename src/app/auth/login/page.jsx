import LoginForm from "@/components/Form/Login";
import ButtonBack from "@/components/Form/Login/ButtonBack";
import { Flex, Stack, Text, Image } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Login() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/");
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
      <Stack spacing={4} mx={"auto"} w={{ base: "sm", md: "md" }} py={4} px={6}>
        <ButtonBack />
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Image
            src="/images/dapoer-raos-logo.png"
            alt="logo"
            width={14}
            height={14}
          />
          <Text fontWeight={"semibold"} fontSize={"2xl"}>
            Dapoer Raos by <span className="text-[#feab3b]">Dee</span>
          </Text>
        </Flex>
        <LoginForm />
      </Stack>
    </Flex>
  );
}

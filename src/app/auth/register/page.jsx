import { Flex, Stack, Text, Image } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/Form/Register";
import ButtonBack from "@/components/Form/utils/ButtonBack";

export default function Register() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/");
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
      <div>
        <ButtonBack />
        <Flex justifyContent={"center"} alignItems={"center"} mb={4}>
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
      </div>
    </Flex>
  );
}

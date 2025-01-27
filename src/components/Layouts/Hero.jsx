"use client";

import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Hero() {
  return (
    <Container maxW={"7xl"} px={10}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 14, md: 24 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "#feab3b",
                zIndex: -1,
              }}
            >
              Dapoer Raos by
            </Text>
            <br />
            <Text as={"span"} color={"#feab3b"}>
              Dewi Ratnasari
            </Text>
          </Heading>
          <Text color={"gray.500"} textAlign={"justify"}>
            Selamat datang di Dapoer Raos, tempat yang menyajikan beragam kue
            kering untuk menemani Anda dalam momen santai, serta koleksi frozen
            food yang siap mempermudah Anda dalam menyajikan hidangan lezat di
            meja makan.
          </Text>
          <Stack spacing={{ base: 4, sm: 6 }} direction={"row"}>
            <Link href={"/products"}>
              <Button
                rounded={"full"}
                size={"md"}
                fontWeight={"medium"}
                color={"white"}
                px={4}
                bg={"#feab3b"}
                _hover={{ bg: "#febb3b" }}
              >
                Lihat Produk
              </Button>
            </Link>
            <Link href={"/location"}>
              <Button rounded={"full"} size={"md"} fontWeight={"medium"} px={4}>
                Belanja Langsung
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              // align={"center"}
              w={"100%"}
              h={"100%"}
              src={"/images/banner.jpeg"}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

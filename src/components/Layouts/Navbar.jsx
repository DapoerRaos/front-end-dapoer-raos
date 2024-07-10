"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { validateToken } from "@/hooks/tokenValidation";
import { logoutUser } from "@/libs/auth-libs";
import { useRouter } from "next/navigation";
import ButtonCartLink from "../Cart/ButtonCartLink";

const NavUserIcon = ({ routeProfile, isAdmin }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/auth/login");
    toast({
      title: "Berhasil Logout",
      status: "success",
      duration: 2000,
      position: "top",
    });
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"sm"} src={"/images/default-avatar.png"} />
      </MenuButton>
      <MenuList>
        {isAdmin ? (
          <Link href={routeProfile}>
            <MenuItem>Dashboard</MenuItem>
          </Link>
        ) : (
          <Link href={routeProfile}>
            <MenuItem>Profil</MenuItem>
          </Link>
        )}
        <MenuItem onClick={onOpen}>Keluar</MenuItem>
      </MenuList>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems={"center"}>
          <ModalHeader>Apakah anda yakin ingin keluar?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Tekan &quot;Logout&quot; jika ingin keluar</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleLogout} colorScheme={"red"}>
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Menu>
  );
};

const NavLoginRegister = () => {
  return (
    <>
      <Link href={"/auth/login"}>
        <Button
          px={4}
          py={2}
          rounded={"xl"}
          bg={"#feab3b"}
          color={"white"}
          fontWeight={"medium"}
          transition={"all 0.2s"}
          _hover={{
            bg: "#febb3b",
          }}
        >
          Masuk
        </Button>
      </Link>
      <Link href={"/auth/register"}>
        <Button
          px={4}
          py={2}
          rounded={"xl"}
          fontWeight={"medium"}
          transition={"all 0.2s"}
          _hover={{
            bg: "gray.300",
          }}
        >
          Daftar
        </Button>
      </Link>
    </>
  );
};

const Navbar = ({ token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [routeProfile, setRouteProfile] = useState();
  const [cartRoute, setCartRoute] = useState();

  useEffect(() => {
    const checkToken = () => {
      const result = validateToken(token);
      const { id } = result;

      if (result) {
        setIsTokenValid(true);
        setRouteProfile(`/profile/user/${id}`);
        setCartRoute(`/cart/users/${id}`);
        if (result.role === "admin") {
          setIsAdmin(true);
          setRouteProfile(`/admin/dashboard`);
        }
      } else {
        setIsTokenValid(false);
      }
    };
    checkToken();
  }, [token]);

  return (
    <Box
      boxShadow={"md"}
      px={4}
      position={"sticky"}
      top={0}
      bg={"white"}
      zIndex={10}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box display={{ base: "none", md: "block" }}>
            <Link href={"/"}>
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                _hover={{ cursor: "pointer" }}
              >
                <Image
                  src="/images/dapoer-raos-logo.png"
                  alt="Dapoer Raos Logo"
                  width={50}
                  height={50}
                />
                <Text fontSize={"lg"} fontWeight={"semibold"}>
                  DapoerRaos
                </Text>
              </Flex>
            </Link>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Box
              as="a"
              px={2}
              py={1}
              rounded={"md"}
              fontWeight={"medium"}
              _hover={{
                textDecoration: "none",
                color: "#feab3b",
                pb: 2,
              }}
              transition={"all 0.2s"}
              fontStyle={"capitalize"}
              href={"/products"}
            >
              Katalog Produk
            </Box>
            <Box
              as="a"
              px={2}
              py={1}
              rounded={"md"}
              fontWeight={"medium"}
              _hover={{
                textDecoration: "none",
                color: "#feab3b",
                pb: 2,
              }}
              transition={"all 0.2s"}
              fontStyle={"capitalize"}
              href={"/location"}
            >
              Lokasi Toko
            </Box>
          </HStack>
        </HStack>

        <Flex alignItems={"center"} gap={4}>
          {isTokenValid ? (
            <>
              {!isAdmin && (
                <ButtonCartLink token={token} cartRoute={cartRoute} />
              )}
              <NavUserIcon routeProfile={routeProfile} isAdmin={isAdmin} />
            </>
          ) : (
            <NavLoginRegister />
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Box
              as="a"
              px={2}
              py={1}
              rounded={"md"}
              fontWeight={"medium"}
              _hover={{
                textDecoration: "none",
                color: "white",
                bg: "#feab3b",
              }}
              transition={"all 0.2s"}
              fontStyle={"capitalize"}
              href={"/products"}
            >
              Katalog Produk
            </Box>
            <Box
              as="a"
              px={2}
              py={1}
              rounded={"md"}
              fontWeight={"medium"}
              _hover={{
                textDecoration: "none",
                color: "white",
                bg: "#feab3b",
              }}
              transition={"all 0.2s"}
              fontStyle={"capitalize"}
              href={"/location"}
            >
              Lokasi Toko
            </Box>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;

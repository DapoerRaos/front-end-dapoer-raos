"use client";

import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { List, House, Storefront } from "@phosphor-icons/react";
import Link from "next/link";

const SidebarAdmin = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={"white"}
      borderRight="1px"
      borderRightColor={"gray.200"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex alignItems={"center"}>
          <Image
            src={"/images/dapoer-raos-logo.png"}
            alt="logo"
            width={50}
            height={50}
          />
          <Text fontWeight={"semibold"} fontSize={"lg"}>
            Dapoer Raos
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Link href={"/admin/dashboard"} aria-label="Home">
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "#feab3b",
            color: "white",
          }}
        >
          <Icon mr="4" fontSize={20} as={House} />
          Dashboard
        </Flex>
      </Link>
      <Link href={"/admin/dashboard/products"}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "#feab3b",
            color: "white",
          }}
        >
          <Icon mr="4" fontSize={20} as={Storefront} />
          Produk
        </Flex>
      </Link>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="14"
      alignItems="center"
      bg={"white"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.200"}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<List />}
      />
      <Flex alignItems={"center"}>
        <Image
          display={{ base: "flex", md: "none" }}
          src={"/images/dapoer-raos-logo.png"}
          alt="logo"
          width={50}
          height={50}
        />
        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="xl"
          fontWeight="semibold"
        >
          Dapoer Raos
        </Text>
      </Flex>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <HStack>
            <Avatar
              size={"sm"}
              src={
                "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">Dewi Ratnasari</Text>
              <Text fontSize="xs" color="gray.600">
                Admin
              </Text>
            </VStack>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

const DashboardLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={"gray.50"}>
      <SidebarAdmin
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarAdmin onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      {children}
    </Box>
  );
};

export default DashboardLayout;

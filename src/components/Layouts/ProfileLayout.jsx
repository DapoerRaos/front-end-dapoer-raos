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
import { List, UserCircleGear, Swap } from "@phosphor-icons/react";
import Link from "next/link";
import DashboardHeader from "../utils/DashboardHeader";
import ButtonLogout from "../utils/ButtonLogout";

const SidebarUser = ({ onClose, userData, ...rest }) => {
  return (
    <Box
      transition="3s ease"
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
          <Link href={"/"}>
            <Text fontWeight={"semibold"} fontSize={"lg"} color={"#1c2434"}>
              Dapoer Raos
            </Text>
          </Link>
        </Flex>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          color={"#1c2434"}
          _hover={{ bg: "#1c2434", color: "white" }}
          onClick={onClose}
        />
      </Flex>
      <Flex flexDirection={"column"} gap={1}>
        <Link href={`/profile/user/${userData.user_id}`} aria-label="Home">
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            transition={"all 0.3s"}
            color="#1c2434"
            _hover={{
              bg: "#1c2434",
              color: "white",
            }}
          >
            <Icon mr="4" fontSize={20} as={Swap} />
            <Text fontWeight={"medium"}>Transaksi</Text>
          </Flex>
        </Link>
        <Link href={`/profile/user/${userData.user_id}/edit`}>
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            transition={"all 0.3s"}
            color="#1c2434"
            _hover={{
              bg: "#1c2434",
              color: "white",
            }}
          >
            <Icon mr="4" fontSize={20} as={UserCircleGear} />
            <Text fontWeight={"medium"}>Edit Profil</Text>
          </Flex>
        </Link>
        <ButtonLogout isAdmin={false} />
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, userData, ...rest }) => {
  return (
    <Flex
      position={"sticky"}
      top={0}
      zIndex={10}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="14"
      alignItems="center"
      bg={"white"}
      shadow={"md"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.300"}
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
            <Avatar size={"sm"} src={"/images/default-avatar.png"} />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">{userData.fullname}</Text>
            </VStack>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

const ProfileLayout = ({
  children,
  title,
  description,
  linkTitle,
  linkHref,
  customerData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={"gray.50"}>
      <SidebarUser
        userData={customerData}
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
          <SidebarUser onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} userData={customerData} />
      <DashboardHeader
        title={title}
        description={description}
        linkTitle={linkTitle}
        linkHref={linkHref}
      >
        {children}
      </DashboardHeader>
    </Box>
  );
};

export default ProfileLayout;

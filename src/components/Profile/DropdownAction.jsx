"use client";

import { updateOrderStatus } from "@/libs/order-libs";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Check, DotsThree } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useState } from "react";

const DropdownAction = ({
  id,
  userId,
  shipping_id,
  status,
  shipping_type,
  shipping_status,
  token,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmOrder = async () => {
    try {
      setIsLoading(true);
      const updateData = {
        shipping_id,
        shipping_status: "Barang Telah Diterima",
      };
      await updateOrderStatus(token, id, updateData);
      onClose();
      toast({
        title: "Pesanan telah diterima",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<DotsThree />}
        variant="outline"
        rounded={"full"}
        size={"sm"}
      />
      <MenuList>
        <Link href={`/profile/user/${userId}/detail/${id}`}>
          <MenuItem icon={<ViewIcon />}>Detail</MenuItem>
        </Link>
        {shipping_type === "Delivery" &&
          shipping_status !== "Barang Telah Diterima" &&
          status === "Lunas" && (
            <MenuItem icon={<Check />} onClick={onOpen}>
              Konfirmasi Pesanan
            </MenuItem>
          )}
      </MenuList>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Konfirmasi Pesanan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Konfirmasi Pesanan Sudah Diterima</Text>
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              Note:
            </Text>
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              Anda hanya dapat melakukan konfirmasi pesanan 1 kali!
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              size={"sm"}
              mr={3}
              isDisabled={isLoading}
              onClick={onClose}
            >
              Kembali
            </Button>
            <Button
              colorScheme="green"
              size={"sm"}
              isDisabled={isLoading}
              onClick={() => handleConfirmOrder()}
            >
              Konfirmasi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Menu>
  );
};

export default DropdownAction;

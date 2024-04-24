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
} from "@chakra-ui/react";
import { Check, DotsThree } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const DropdownAction = ({
  id,
  userId,
  status,
  shipping_type,
  shipping_status,
  token,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleConfirmOrder = async () => {
    const updateData = {
      shipping_status: "Received",
    };
    await updateOrderStatus(token, id, updateData);
    onClose();
    location.reload();
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
          shipping_status !== "Received" &&
          status === "Paid" && (
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
            <Button colorScheme="red" size={"sm"} mr={3} onClick={onClose}>
              Kembali
            </Button>
            <Button
              colorScheme="green"
              size={"sm"}
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

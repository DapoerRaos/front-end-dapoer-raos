"use client";

import { deleteProduct } from "@/libs/product-libs";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
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
import { DotsThree } from "@phosphor-icons/react";
import Link from "next/link";

const DropdownAction = ({ id, token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDeleteProduct = async () => {
    const response = await deleteProduct(id, token);
    onClose();
    location.reload();
    toast({
      title: response.message,
      status: "success",
      duration: 2000,
      position: "top",
    });
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
        <Link href={`/admin/dashboard/products/detail/${id}`}>
          <MenuItem icon={<ViewIcon />}>Detail</MenuItem>
        </Link>
        <Link href={`/admin/dashboard/products/edit/${id}`}>
          <MenuItem icon={<EditIcon />}>Edit</MenuItem>
        </Link>
        <MenuItem icon={<DeleteIcon />} onClick={onOpen}>
          Hapus
        </MenuItem>
      </MenuList>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"sm"} textAlign={"center"}>
            Apakah anda yakin ingin menghapus produk ini?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <Text>Tekan &quot;Hapus Produk&quot; untuk menghapus</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleDeleteProduct} colorScheme={"red"}>
              Hapus Produk
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Menu>
  );
};

export default DropdownAction;

import { deleteProduct } from "@/libs/product-libs";
import {
  Button,
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
import { useRouter } from "next/navigation";

const ButtonDeleteProduct = ({ id, token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const handleDeleteProduct = async () => {
    const response = await deleteProduct(id, token);
    onClose();
    router.push("/admin/dashboard/products");
    toast({
      title: response.message,
      status: "success",
      duration: 2000,
      position: "top",
    });
  };
  return (
    <>
      <Button colorScheme={"red"} onClick={onOpen}>
        Hapus
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems={"center"}>
          <ModalHeader fontSize={"md"} textAlign={"center"}>
            Apakah anda yakin ingin menghapus produk ini?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Tekan &quot;Hapus Produk&quot; untuk menghapus</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleDeleteProduct} colorScheme={"red"}>
              Hapus Produk
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ButtonDeleteProduct;

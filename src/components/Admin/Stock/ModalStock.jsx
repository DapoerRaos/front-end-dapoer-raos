import { getProductById, updateStock } from "@/libs/product-libs";
import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ModalStock = ({ id, token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState({});
  const [defaultStock, setDefaultStock] = useState(0);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
        setDefaultStock(response.data.stock);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateStock = async (data) => {
    const response = await updateStock(id, token, data);
    onClose();
    toast({
      title: response.message,
      status: "success",
      duration: 2000,
      position: "top",
    });
    location.reload();
  };

  const handleCloseModal = () => {
    onClose();
    reset({ stock: defaultStock });
  };

  return (
    <div>
      <Button
        as={IconButton}
        icon={<EditIcon />}
        size={"sm"}
        colorScheme={"blue"}
        onClick={onOpen}
      />
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>
            Update Stok ({product.name})
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              id="stokProduk"
              mb={3}
              w={{ base: "100%", md: "66%" }}
              isInvalid={!!errors.stokProduk}
            >
              <FormLabel fontSize={"sm"}>Stok Produk</FormLabel>
              <Input
                {...register("stock")}
                type="number"
                focusBorderColor="#feab3b"
                fontSize={"sm"}
                borderColor={"gray.300"}
                defaultValue={product.stock}
              />
              <FormErrorMessage>
                {errors.stokProduk && errors.stokProduk.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleCloseModal}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit(handleUpdateStock)}
              colorScheme={"blue"}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalStock;

"use client";

import { deleteProduct, getProductById } from "@/libs/product-libs";
import { formatPrice } from "@/libs/utils/PriceFormat";
import {
  Button,
  Divider,
  Image,
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DetailProductCard = ({ id, token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState({});
  const router = useRouter();
  const toast = useToast();

  const fetchProduct = async () => {
    const response = await getProductById(id);
    setProduct(response.data);
  };

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

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="border border-gray-300 p-6 rounded-lg grid md:grid-cols-2 gap-2">
      <div className="max-w-full md:max-w-[400px]">
        <Image
          className="rounded-xl aspect-square object-cover w-full h-full"
          src={`http://localhost:3001/products/${product.image_path}`}
          alt={product.name}
        />
      </div>
      <div className="flex justify-between flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Text fontSize={"2xl"} fontWeight={"semibold"}>
            {product.name}
          </Text>
          <Text fontSize={"xl"}>{formatPrice(product.price)}</Text>
          <Divider border={"1px"} color={"gray.400"} rounded={"full"} />
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            Description:
          </Text>
          <Text fontSize={"sm"}>{product.category_name}</Text>
          <Text fontSize={"sm"}>Stok Tersedia: {product.stock}</Text>
          <Text fontSize={"sm"}>{product.description}</Text>
        </div>
        <div className="flex gap-4">
          <Link href={`/admin/dashboard/products/edit/${product.id}`}>
            <Button colorScheme={"blue"}>Edit</Button>
          </Link>
          <Button colorScheme={"red"} onClick={onOpen}>
            Hapus
          </Button>
        </div>
      </div>
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
    </div>
  );
};

export default DetailProductCard;

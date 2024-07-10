"use client";

import { addItemToCart } from "@/libs/cart-libs";
import { getProductById } from "@/libs/product-libs";
import { formatPrice } from "@/libs/utils/PriceFormat";
import { formatWeight } from "@/libs/utils/WeightFormatter";
import { Button, Divider, Image, Text, useToast } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const DetailProductCard = ({ id, token }) => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [product, setProduct] = useState({});
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (token) {
      const tokenDecoded = jwtDecode(token);
      setIsCustomer(tokenDecoded.role === "customer");
    }
  }, [token]);

  const handleAddToCart = async (product_id) => {
    if (!token) {
      router.push("/auth/login");
    } else {
      try {
        const response = await addItemToCart(product_id, token);
        location.reload();
        successToast(response.message);
      } catch (err) {
        failedToast(err.response.data.message);
      }
    }
  };

  const successToast = (message) => {
    toast({
      title: message,
      position: "top",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const failedToast = useCallback(
    (message) => {
      toast({
        title: message,
        position: "top",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
    [toast]
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        failedToast(err.response.data.message);
      }
    };
    fetchProduct();
  }, [id, failedToast]);

  return (
    <div className="border border-gray-300 p-6 rounded-lg md:flex md:justify-around gap-4">
      <div className="max-w-full md:max-w-[400px]">
        <Image
          className="rounded-xl aspect-square object-cover w-full h-full"
          src={`http://localhost:3001/products/${product.image_path}`}
          alt={product.name}
        />
      </div>
      <div className="flex justify-around flex-col gap-4 mt-6">
        <div className="flex flex-col gap-2">
          <Text fontSize={"2xl"} fontWeight={"semibold"}>
            {product.name}
          </Text>
          <Text fontSize={"xl"}>{formatPrice(product.price)}</Text>
          <Divider border={"1px"} color={"gray.400"} rounded={"full"} />
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            Deskripsi:
          </Text>
          <Text fontSize={"sm"}>{product.description}</Text>
          <div>
            <Text fontSize={"sm"}>Kategori: {product.category_name}</Text>
            <Text
              fontSize={"sm"}
              className={`${product.stock <= 3 ? "text-red-500" : ""}`}
            >
              {product.stock === 0
                ? `Stok Habis`
                : product.stock <= 3
                ? `Stok tersisa ${product.stock}`
                : `Stok tersedia ${product.stock}`}
            </Text>
            <Text fontSize={"sm"}>Berat: {formatWeight(product.weight)}</Text>
          </div>
        </div>
        {(isCustomer || !token) && (
          <>
            {product.stock === 0 ? (
              <Button
                color={"white"}
                bg={"gray.400"}
                _hover={{ bg: "gray.500" }}
                cursor={"not-allowed"}
              >
                Stok Habis
              </Button>
            ) : (
              <Button
                onClick={() => handleAddToCart(product.id)}
                color={"white"}
                bg={"#feab3b"}
                _hover={{ bg: "#fecb3b" }}
              >
                Tambah Ke Keranjang
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DetailProductCard;

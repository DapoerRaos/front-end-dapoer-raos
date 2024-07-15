"use client";

import { getProductById } from "@/libs/product-libs";
import { formatPrice } from "@/libs/utils/PriceFormat";
import { Button, Divider, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonDeleteProduct from "./utils/ButtonDeleteProduct";

const DetailProductCard = ({ id, token }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="border border-gray-300 p-6 rounded-lg shadow-md grid md:grid-cols-2 gap-2">
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
            Deskripsi:
          </Text>
          <Text fontSize={"sm"}>{product.description}</Text>
          <div>
            <Text fontSize={"sm"}>Kategori: {product.category_name}</Text>
            <Text
              fontSize={"sm"}
              className={`${product.stock <= 3 ? "text-red-500" : ""}`}
            >
              {product.stock <= 3
                ? `Stok tersisa: ${product.stock}`
                : `Stok tersedia: ${product.stock}`}
            </Text>
            <Text fontSize={"sm"}>Berat: {product.weight} Kg</Text>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href={`/admin/dashboard/products/edit/${product.id}`}>
            <Button colorScheme={"blue"}>Edit</Button>
          </Link>
          <ButtonDeleteProduct id={product.id} token={token} />
        </div>
      </div>
    </div>
  );
};

export default DetailProductCard;

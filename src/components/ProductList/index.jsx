"use client";
import { formatPrice } from "@/libs/utils/PriceFormat";
import { Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import ButtonCart from "./ButtonCart";
import { useEffect, useState } from "react";

const ProducList = ({ api }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (api && api.data) {
      setProductData(api.data);
    }
  }, [api]);

  if (productData.length === 0) {
    return (
      <div className="grid place-items-center grid-cols-1 rounded-xl shadow-lg h-[200px] mx-8 hover:shadow-2xl duration-300 transition-all cursor-pointer">
        Produk tidak tersedia saat ini.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-8">
      {productData.map((product) => {
        return (
          <Link key={product.id} href={`/product/details/${product.id}`}>
            <div className="p-4 shadow-lg max-w-[400px] border border-gray-200 hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-2 h-full">
              <Image
                className="rounded-xl aspect-square object-cover"
                src={`http://localhost:3001/products/${product.image_path}`}
                alt={product.name}
                sizes="200"
              />
              <Text color={"gray.600"} fontSize={"sm"}>
                {product.category_name}
              </Text>
              <Text fontWeight={"bold"} fontSize={{ base: "sm", md: "md" }}>
                {product.name}
              </Text>
              <div className="flex justify-between items-center">
                <Text color={"#feab3b"} fontWeight={"semibold"}>
                  {formatPrice(product.price)}
                </Text>
                <ButtonCart />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProducList;

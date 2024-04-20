"use client";

import { formatPrice } from "@/libs/utils/PriceFormat";
import { Image, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ButtonCart from "./utils/ButtonCart";
import Pagination from "../utils/Pagination";
import { getProducts } from "@/libs/product-libs";

const ProductWithPagination = ({ searchKeyword, token }) => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  const failedToast = useCallback(
    (message) => {
      toast({
        title: message,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    },
    [toast]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts(page, searchKeyword);
        setProductData(response.data);
        setTotalPages(response.pagination.totalPages);
      } catch (err) {
        failedToast(err.response.data.message);
      }
    };
    fetchData();
  }, [page, searchKeyword, failedToast]);

  if (productData.length === 0) {
    return (
      <div className="grid place-items-center grid-cols-1 h-full mx-8 my-20 cursor-pointer">
        Produk tidak tersedia saat ini.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-8 mb-4">
        {productData.map((product) => {
          return (
            <Link key={product.id} href={`/products/detail/${product.id}`}>
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
                  {product.stock !== 0 && (
                    <ButtonCart token={token} product_id={product.id} />
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default ProductWithPagination;

"use client";

import { formatPrice } from "@/libs/utils/PriceFormat";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import DropdownAction from "./utils/DropdownAction";
import { getProducts } from "@/libs/product-libs";
import Pagination from "@/components/utils/Pagination";
import { formatWeight } from "@/libs/utils/WeightFormatter";

const ProductTable = ({ searchKeyword, token }) => {
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

  return (
    <>
      <TableContainer border={"1px"} borderColor={"gray.200"} rounded={"lg"}>
        <Table size={"sm"} variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama</Th>
              <Th>Harga</Th>
              <Th>Berat</Th>
              <Th>Stok</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productData.length === 0 ? (
              <Tr>
                <Td colSpan={6} textAlign={"center"}>
                  Produk Masih Kosong
                </Td>
              </Tr>
            ) : (
              productData.map((product, index) => {
                return (
                  <Tr
                    key={index}
                    className={
                      product.stock === 0
                        ? "bg-red-500 text-white"
                        : "text-gray-600"
                    }
                  >
                    <Td>{index + 1}</Td>
                    <Td>
                      {product.stock === 0
                        ? `${product.name} (Stok habis)`
                        : product.stock <= 3
                        ? `${product.name} (Stok Menipis)`
                        : product.name}
                    </Td>
                    <Td>{formatPrice(product.price)}</Td>
                    <Td>{formatWeight(product.weight)}</Td>
                    <Td>{product.stock}</Td>
                    <Td color={"gray.600"} bg={"white"}>
                      <DropdownAction id={product.id} token={token} />
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
};

export default ProductTable;

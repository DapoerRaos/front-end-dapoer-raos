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
import React, { useEffect, useState } from "react";
import DropdownAction from "./utils/DropdownAction";
import { getProducts } from "@/libs/product-libs";
import Pagination from "./utils/Pagination";

const ProductTable = ({ seacrhKeyword, token }) => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const response = await getProducts(page, seacrhKeyword);
      setProductData(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      failedToast(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, seacrhKeyword]);

  const failedToast = (message) => {
    toast({
      title: message,
      status: "error",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  return (
    <>
      <TableContainer border={"1px"} borderColor={"gray.200"} rounded={"lg"}>
        <Table size={"sm"} variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama</Th>
              <Th>Kategori</Th>
              <Th>Harga</Th>
              <Th>Stok</Th>
              <Th>Action</Th>
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
                  <Tr key={index} color={"gray.600"}>
                    <Td>{index + 1}</Td>
                    <Td>{product.name}</Td>
                    <Td>{product.category_name}</Td>
                    <Td>{formatPrice(product.price)}</Td>
                    <Td>{product.stock}</Td>
                    <Td>
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

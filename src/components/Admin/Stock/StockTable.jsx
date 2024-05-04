"use client";

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
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "@/libs/product-libs";
import ModalStock from "./ModalStock";
import Pagination from "@/components/utils/Pagination";

const StockTable = ({ searchKeyword, token }) => {
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
      <TableContainer border={"1px"} borderColor={"gray.300"} rounded={"lg"}>
        <Table size={"sm"} variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Nama</Th>
              <Th>Kategori</Th>
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
                  <Tr key={index} color={"gray.600"}>
                    <Td>{index + 1}</Td>
                    <Td>{product.name}</Td>
                    <Td>{product.category_name}</Td>
                    <Td>{product.stock}</Td>
                    <Td>
                      <ModalStock id={product.id} token={token} />
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

export default StockTable;

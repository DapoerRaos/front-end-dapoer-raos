"use client";

import { getOrderByCustomerId } from "@/libs/order-libs";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { formatPrice } from "@/libs/utils/PriceFormat";
import Pagination from "@/components/utils/Pagination";
import DropdownAction from "./DropdownAction";

const TransactionSummary = ({ searchKeyword, token, customerData }) => {
  const [orderData, setOrderData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderItems = await getOrderByCustomerId(
          token,
          page,
          searchKeyword
        );
        setOrderData(orderItems.data.order_list);
        setTotalPages(orderItems.pagination.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token, page, searchKeyword]);

  return (
    <>
      <TableContainer border={"1px"} borderColor={"gray.200"} rounded={"lg"}>
        <Table size={"sm"} variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Order Id</Th>
              <Th>Total Belanja</Th>
              <Th>Status</Th>
              <Th>Metode Pembayaran</Th>
              <Th>Bank</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderData.length === 0 ? (
              <Tr>
                <Td colSpan={6} textAlign={"center"}>
                  Daftar Pesanan Tidak Ditemukan
                </Td>
              </Tr>
            ) : (
              orderData.map((item, index) => {
                return (
                  <Tr key={index} color={"gray.600"}>
                    <Td>{index + 1}</Td>
                    <Td>{item.id}</Td>
                    <Td>{formatPrice(item.total_price)}</Td>
                    <Td>
                      <p
                        className={`text-sm font-medium uppercase text-center ${
                          item.status === "Paid"
                            ? "text-green-500 bg-green-100 p-1 rounded-lg"
                            : item.status === "Pending"
                            ? "text-blue-500 bg-blue-100 p-1 rounded-lg"
                            : item.status === "Canceled"
                            ? "text-red-500 bg-red-100 p-1 rounded-lg"
                            : ""
                        }`}
                      >
                        {item.status}
                      </p>
                    </Td>
                    <Td>
                      <p className="text-sm capitalize">
                        {item.payment_method
                          ? item.payment_method.split("_").join(" ")
                          : ""}
                      </p>
                    </Td>
                    {item.bank !== "" && (
                      <Td>
                        <p className="text-sm uppercase">{item.bank}</p>
                      </Td>
                    )}
                    <Td>
                      <DropdownAction
                        id={item.id}
                        userId={customerData.user_id}
                        status={item.status}
                      />
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

export default TransactionSummary;

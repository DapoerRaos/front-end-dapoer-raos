"use client";

import { getOrders } from "@/libs/order-libs";
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

const OrderTable = ({ searchKeyword, token }) => {
  const [orderData, setOrderData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrders(token, page, searchKeyword);
        setOrderData(response.data.order_list);
        setTotalPages(response.data.pagination.totalPages);
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
              <Th>Nama Customer</Th>
              <Th>Total</Th>
              <Th>Status</Th>
              <Th>Tipe Pengiriman</Th>
              <Th>Status Pengiriman</Th>
              <Th>Metode Pembayaran</Th>
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
                    {/* <Td>{item.id}</Td> */}
                    <Td>{item.Customer.fullname}</Td>
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
                    <Td>{item.shipping_type}</Td>
                    <Td>
                      {item.shipping_status === "Canceled"
                        ? "Dibatalkan"
                        : item.shipping_status === "Waiting"
                        ? "Menunggu Pembayaran"
                        : item.shipping_status === "Packaged"
                        ? "Barang di Kemas"
                        : item.shipping_status === "Ready"
                        ? "Barang Siap Diambil"
                        : item.shipping_status === "Delivered"
                        ? "Barang Dikirim"
                        : item.shipping_status === "Picked Up"
                        ? "Barang Telah Diambil"
                        : item.shipping_status === "Received" &&
                          "Barang Telah Diterima"}
                    </Td>
                    <Td>
                      <p className="text-sm capitalize">
                        {item.payment_method
                          ? item.payment_method.split("_").join(" ")
                          : ""}
                      </p>
                    </Td>
                    {/* {item.bank !== "" && (
                      <Td>
                        <p className="text-sm uppercase">{item.bank}</p>
                      </Td>
                    )} */}
                    <Td>
                      <DropdownAction
                        id={item.id}
                        status={item.status}
                        shippingStatus={item.shipping_status}
                        shipping_type={item.shipping_type}
                        token={token}
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

export default OrderTable;
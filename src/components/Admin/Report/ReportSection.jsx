"use client";

import { getOrderByDate } from "@/libs/order-libs";
import { formatPrice } from "@/libs/utils/PriceFormat";
import {
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { DownloadSimple } from "@phosphor-icons/react";
import React, { useRef, useState } from "react";
import Document from "./Document";
import { useReactToPrint } from "react-to-print";
import { formatDate } from "date-fns";

const ReportSection = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const toast = useToast();

  const fetchOrders = async () => {
    try {
      if (startDate && endDate && startDate > endDate) {
        toast({
          title: "Tanggal Mulai harus lebih awal dari Tanggal Berakhir",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      const orderData = await getOrderByDate(
        token,
        keyword,
        startDate,
        endDate
      );
      setOrders(orderData.data.order_list);
      setTotalPages(orderData.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <label>
            <p className="mr-2 text-sm">Tanggal Mulai:</p>
            <Input
              borderColor={"gray.300"}
              size="sm"
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </label>
          <label>
            <p className="mr-2 text-sm">Tanggal Berakhir:</p>
            <Input
              borderColor={"gray.300"}
              size="sm"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </label>
          <label>
            <p className="mr-2 text-sm">Cari Data Pesanan:</p>
            <Input
              w={"300px"}
              borderColor={"gray.300"}
              placeholder="Kata Kunci: Status, Metode Pembayaran"
              type="search"
              size="sm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </label>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchOrders}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded"
          >
            Tampilkan Data
          </button>
          <button
            onClick={() => {
              setOrders([]);
              setStartDate("");
              setEndDate("");
            }}
            className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </div>
      <div>
        {orders.length !== 0 && (
          <div className="flex justify-start">
            <button
              onClick={handlePrint}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm py-2 px-3 rounded gap-2 flex items-center mb-2"
            >
              Unduh Laporan <DownloadSimple />
            </button>
          </div>
        )}
        <TableContainer
          mb={4}
          border={"1px"}
          borderColor={"gray.200"}
          rounded={"lg"}
        >
          <Table size={"sm"} variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Total Transaksi</Th>
                <Th>Status </Th>
                <Th>Metode Pembayaran</Th>
                <Th>Tanggal Transaksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.length === 0 ? (
                <Tr>
                  <Td colSpan={6} textAlign={"center"}>
                    Data Tidak Ditemukan
                  </Td>
                </Tr>
              ) : (
                orders.map((order, index) => {
                  return (
                    <Tr key={index} color={"gray.600"}>
                      <Td>{index + 1}</Td>
                      <Td>{formatPrice(order.total_price)}</Td>
                      <Td>{order.status}</Td>
                      <Td className="capitalize">
                        {order.payment_method
                          ? order.payment_method.split("_").join(" ")
                          : ""}
                      </Td>
                      <Td>{formatDate(order.payment_date, "dd MMM yyyy")}</Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </TableContainer>
        <div className="hidden">
          <div ref={printRef}>
            <Document data={orders} startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSection;

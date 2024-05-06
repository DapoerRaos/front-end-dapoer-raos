"use client";

import { getTransactionStatus, updateOrderStatus } from "@/libs/order-libs";
import { formatPrice } from "@/libs/utils/PriceFormat";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalDetailCustomer from "./ModalDetailCustomer";
import { getCustomerDetailById } from "@/libs/customer-libs";

const OrderDetailSummary = ({ token, data, orderItems }) => {
  const [expireTime, setExpireTime] = useState("");
  const [customer, setCustomer] = useState({});
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const userCustomer = await getCustomerDetailById(token, data.customer_id);
      const response = await getTransactionStatus(token, data.id);
      setCustomer(userCustomer.data);
      setExpireTime(response.data.expiry_time);
    };

    fetchData();
  }, [token, data.id, data.customer_id]);

  const handleReCheckStatus = async (id) => {
    const response = await getTransactionStatus(token, id);
    if (response.data.transaction_status === "settlement") {
      const updateData = {
        newStatus: "Paid",
        shipping_status: "Packaged",
      };
      await updateOrderStatus(token, id, updateData);
      location.reload();
      toast({
        title: "Pesanan Sudah Terbayar",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } else if (response.data.transaction_status === "expire") {
      const stock_product = {
        stock_products: orderItems.map((item) => ({
          product_id: item.product_id,
          stock: item.Product.stock + item.quantity,
        })),
      };
      await updateOrderStatus(token, id, { newStatus: "Canceled" });
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/stock`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: `token=${cookieToken}`,
        },
        credentials: "include",
        body: JSON.stringify(stock_product),
      });
      location.reload();
      toast({
        title: "Pesanan Sudah Kadaluarsa, Lakukan Pesananan Ulang",
        status: "error",
        duration: 2000,
        position: "top",
      });
    } else {
      toast({
        title: "Pesanan Belum Terbayar",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  return (
    <div>
      {data.status === "Pending" && data.payment_method === "bank_transfer" && (
        <div className="mb-4 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="text-base font-medium text-gray-900">
              <p className="text-sm font-medium">Re-check Status Pembayaran</p>
            </div>
            <button
              onClick={() => handleReCheckStatus(data.id)}
              className="text-sm py-1 px-2 font-medium rounded-lg text-[#feab3b] bg-orange-100 hover:bg-[#feab3b] hover:text-white transition-all"
            >
              Cek Status
            </button>
          </div>
        </div>
      )}
      <ModalDetailCustomer customerData={customer} />
      <div>
        <h2 className="text-lg font-medium text-gray-900">Informasi Pesanan</h2>
        <div className="mt-2 flex justify-between">
          <p className="text-sm">Order Id</p>
          <p className="text-sm font-medium">{data.id}</p>
        </div>
        <div className="mt-2 flex justify-between">
          <p className="text-sm">Metode Pembayaran</p>
          <p className="text-sm font-medium capitalize">
            {data.payment_method
              ? data.payment_method.split("_").join(" ")
              : ""}
          </p>
        </div>
        {data.bank !== "-" && (
          <div className="mt-2 flex justify-between">
            <p className="text-sm">Bank</p>
            <p className="text-sm font-medium uppercase">{data.bank}</p>
          </div>
        )}
        {data.va_number !== "-" && data.status === "Pending" && (
          <div className="mt-2 flex justify-between">
            <p className="text-sm">Nomor Virtual Account</p>
            <p className="text-sm font-medium uppercase">{data.va_number}</p>
          </div>
        )}
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm">Status Pembayaran</p>
          <p
            className={`text-sm font-medium uppercase ${
              data.status === "Paid"
                ? "text-green-500 bg-green-100 p-1 rounded-lg"
                : data.status === "Pending"
                ? "text-blue-500 bg-blue-100 p-1 rounded-lg"
                : data.status === "Canceled"
                ? "text-red-500 bg-red-100 p-1 rounded-lg"
                : ""
            }`}
          >
            {data.status}
          </p>
        </div>
        <div className="mt-2 flex justify-between">
          <p className="text-sm">Metode Pengiriman</p>
          <p className="text-sm font-medium">{data.shipping_type}</p>
        </div>
        {/* {data.payment_method !== "COD" && data.shipping_type !== "Pick Up" && ( */}
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm">Status Pengiriman</p>
          <p className="text-sm font-medium">
            {data.shipping_status === "Waiting"
              ? "Menunggu Pembayaran"
              : data.shipping_status === "Packaged"
              ? "Barang di Kemas"
              : data.shipping_status === "Ready"
              ? "Barang Siap Diambil"
              : data.shipping_status === "Delivered"
              ? "Barang Dikirim"
              : data.shipping_status === "Picked Up"
              ? "Barang Telah Diambil"
              : data.shipping_status === "Received" && "Barang Telah Diterima"}
          </p>
        </div>
        {/* )} */}
        {data.status === "Pending" &&
          data.payment_method === "bank_transfer" && (
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm">Lakukan Pembayaran Sebelum</p>
              <p className="text-sm font-medium uppercase">{expireTime}</p>
            </div>
          )}
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm">Tanggal Transaksi</p>
          <p className="text-sm font-medium uppercase">{data.payment_date}</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-lg font-medium">Total Pembayaran</p>
          <p className="text-lg font-medium">
            {formatPrice(parseFloat(data.total_price))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSummary;

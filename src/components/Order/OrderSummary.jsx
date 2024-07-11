"use client";

import { getTransactionStatus, updateOrderStatus } from "@/libs/order-libs";
import { updateProductStock } from "@/libs/product-libs";
import { formatPrice } from "@/libs/utils/PriceFormat";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const OrderSummary = ({ token, data, orderItems, customerData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [expireTime, setExpireTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactionStatus(token, data.id);
        setExpireTime(response.data.expiry_time);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [token, data.id]);

  const handleReCheckStatus = async (id) => {
    try {
      setIsLoading(true);
      const response = await getTransactionStatus(token, id);
      if (response.data.transaction_status === "settlement") {
        const updateData = {
          shipping_id: data.Shipping?.id,
          newStatus: "Lunas",
          shipping_status:
            data.Shipping?.type === "Delivery"
              ? "Barang di Kemas"
              : data.Shipping?.type === "Pick Up" && "Barang Siap Diambil",
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
        const updateData = {
          newStatus: "Canceled",
        };
        await updateOrderStatus(token, id, updateData);
        await updateProductStock(token, stock_product);
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
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>Detail Pesanan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="mb-2">
              <p className="text-sm font-semibold">
                Nama:{" "}
                <span className="font-normal">{customerData.fullname}</span>
              </p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-semibold">
                Telephone:{" "}
                <span className="font-normal">{customerData.telephone}</span>
              </p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-semibold">
                Metode Pengiriman:{" "}
                <span className="font-normal">{data.Shipping?.type}</span>
              </p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-semibold">
                Status Pengiriman:{" "}
                <span className="font-normal">{data.Shipping?.status}</span>
              </p>
            </div>
            {data.Shipping?.type === "Delivery" && (
              <>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    ID Pengiriman:{" "}
                    <span className="font-normal">{data.Shipping?.id}</span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Kurir Pengiriman:{" "}
                    <span className="font-normal uppercase">
                      {data.Shipping?.courier}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Layanan Pengiriman:{" "}
                    <span className="font-normal">
                      {data.Shipping?.service}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Provinsi Tujuan:{" "}
                    <span className="font-normal">
                      {data.Shipping?.province}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Kota Tujuan:{" "}
                    <span className="font-normal">{data.Shipping?.city}</span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Alamat Tujuan:{" "}
                    <span className="font-normal">
                      {data.Shipping?.address}
                    </span>
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-sm font-semibold">
                    Estimasi Waktu Pengiriman:{" "}
                    <span className="font-normal">
                      {data.Shipping?.etd}{" "}
                      {data.Shipping?.courier === "pos" ? "" : "Hari"}
                    </span>
                  </p>
                </div>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" size={"sm"} mr={3} onClick={onClose}>
              Kembali
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {data.status === "Pending" && data.payment_method === "bank_transfer" && (
        <div className="mb-4 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="text-base font-medium text-gray-900">
              <p className="text-sm font-medium">Re-check Status Pembayaran</p>
            </div>
            <button
              disabled={isLoading}
              onClick={() => handleReCheckStatus(data.id)}
              className="text-sm py-1 px-2 font-medium rounded-lg text-[#feab3b] bg-orange-100 hover:bg-[#feab3b] hover:text-white transition-all"
            >
              Cek Status
            </button>
          </div>
        </div>
      )}
      <div className="mb-4 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="text-base font-medium text-gray-900">
            <p className="text-sm font-medium">Detail Pesanan</p>
          </div>
          <button
            onClick={onOpen}
            className="text-sm py-1 px-2 font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition-all"
          >
            Lihat Detail
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-medium text-gray-900">Informasi Pesanan</h2>
        <div className="mt-2 flex justify-between">
          <p className="text-sm">Id Pesanan</p>
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
              data.status === "Lunas"
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
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm">Tanggal Transaksi</p>
          <p className="text-sm font-medium">{data.payment_date}</p>
        </div>
        {data.status === "Pending" &&
          data.payment_method === "bank_transfer" && (
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm">Lakukan Pembayaran Sebelum</p>
              <p className="text-sm font-medium">{expireTime}</p>
            </div>
          )}
        {data.Shipping?.type === "Delivery" && (
          <div className="mt-2 flex justify-between items-center">
            <p className="text-sm">Ongkos Kirim</p>
            <p className="text-sm font-medium uppercase">
              {formatPrice(data.Shipping?.cost)}
            </p>
          </div>
        )}
        <div className="mt-2 flex justify-between items-center">
          <p className="text-sm">Total Harga Barang</p>
          <p className="text-sm font-medium uppercase">
            {formatPrice(data.total_price - data.Shipping?.cost)}
          </p>
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

export default OrderSummary;

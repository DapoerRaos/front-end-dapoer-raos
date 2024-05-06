import { updateOrderStatus } from "@/libs/order-libs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const ModalUpdate = ({
  token,
  order_id,
  isOpen,
  onClose,
  title,
  paymentStatus,
  shippingStatus,
  shipping_type,
  orderItems,
}) => {
  const [paymentStatusValue, setPaymentStatusValue] = useState("");
  const [shippingStatusValue, setShippingStatusValue] = useState("");

  const handlePaymentStatusChange = (event) => {
    const selectedPaymentStatus = event.target.value;
    setPaymentStatusValue(selectedPaymentStatus);
  };

  const handleShippingStatusChange = (event) => {
    const selectedShippingStatus = event.target.value;
    setShippingStatusValue(selectedShippingStatus);
  };

  const handleUpdatePaymentStatus = async (status) => {
    const updateData = {
      newStatus: status,
    };
    await updateOrderStatus(token, order_id, updateData);
    if (status === "Canceled") {
      const stock_product = {
        stock_products: orderItems.map((item) => ({
          product_id: item.product_id,
          stock: item.Product.stock + item.quantity,
        })),
      };
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/stock`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        body: JSON.stringify(stock_product),
      });
    }
    onClose();
    location.reload();
  };

  const handleUpdateShippingStatus = async (status) => {
    const updateData = {
      shipping_status: status,
    };
    await updateOrderStatus(token, order_id, updateData);
    onClose();
    location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title === "Payment Status"
            ? "Update Status Pembayaran"
            : title === "Shipping Status" && "Update Status Pengiriman"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {title === "Payment Status" ? (
            <FormControl
              id="orderStatus"
              mb={3}
              w={{ base: "100%", md: "66%" }}
            >
              <Text fontSize="sm" mb={4}>
                Status Pembayaran Saat ini: {paymentStatus}
              </Text>
              <FormLabel fontSize="sm">Perbarui Status Pembayaran</FormLabel>
              <Select
                placeholder="Status Pembayaran"
                focusBorderColor="#feab3b"
                fontSize="sm"
                borderColor="gray.300"
                value={paymentStatusValue}
                onChange={handlePaymentStatusChange}
              >
                {paymentStatus !== "Paid" && <option value="Paid">Paid</option>}
                {paymentStatus !== "Pending" && (
                  <option value="Pending">Pending</option>
                )}
                {paymentStatus !== "Canceled" && (
                  <option value="Canceled">Canceled</option>
                )}
              </Select>
            </FormControl>
          ) : (
            title === "Shipping Status" && (
              <>
                <Text fontSize="sm" mb={4}>
                  Status Pengiriman Saat ini:{" "}
                  {shippingStatus === "Waiting"
                    ? "Menunggu Pembayaran"
                    : shippingStatus === "Packaged"
                    ? "Barang di Kemas"
                    : shippingStatus === "Ready"
                    ? "Barang Siap Diambil"
                    : shippingStatus === "Delivered"
                    ? "Barang Dikirim"
                    : shippingStatus === "Picked Up"
                    ? "Barang Telah Diambil"
                    : shippingStatus === "Received" && "Barang Telah Diterima"}
                </Text>
                <FormControl
                  id="shippingStatus"
                  mb={3}
                  w={{ base: "100%", md: "66%" }}
                >
                  <FormLabel fontSize="sm">
                    Perbarui Status Pengiriman
                  </FormLabel>
                  <Select
                    placeholder="Status Pengiriman"
                    focusBorderColor="#feab3b"
                    fontSize="sm"
                    borderColor="gray.300"
                    value={shippingStatusValue}
                    onChange={handleShippingStatusChange}
                  >
                    {paymentStatus === "Pending" && (
                      <option value="Waiting">Menunggu Pembayaran</option>
                    )}
                    {shipping_type === "Pick Up" ? (
                      <>
                        <option value="Canceled">Dibatalkan</option>
                        <option value="Ready">Barang Siap Diambil</option>
                        <option value="Picked Up">Barang Telah Diambil</option>
                      </>
                    ) : (
                      shipping_type === "Delivery" && (
                        <>
                          <option value="Packaged">Barang Dikemas</option>
                          <option value="Delivered">Barang Dikirim</option>
                          <option value="Received">
                            Barang Telah Diterima
                          </option>
                        </>
                      )
                    )}
                  </Select>
                </FormControl>
              </>
            )
          )}
        </ModalBody>
        <ModalFooter>
          {title === "Payment Status" ? (
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdatePaymentStatus(paymentStatusValue)}
            >
              Update
            </Button>
          ) : (
            title === "Shipping Status" && (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleUpdateShippingStatus(shippingStatusValue)}
              >
                Update
              </Button>
            )
          )}
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdate;

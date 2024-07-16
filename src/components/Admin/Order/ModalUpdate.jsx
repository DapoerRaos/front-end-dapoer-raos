import { updateOrderStatus } from "@/libs/order-libs";
import { updateProductStock } from "@/libs/product-libs";
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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

const ModalUpdate = ({
  token,
  order_id,
  shipping_id,
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
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
      shipping_id: shipping_id,
      newStatus: status,
      shipping_status:
        status === "Lunas"
          ? shipping_type === "Delivery"
            ? "Barang di Kemas"
            : shipping_type === "Pick Up"
            ? "Barang Telah Diambil"
            : ""
          : status === "Canceled"
          ? "Dibatalkan"
          : "",
    };
    await updateOrderStatus(token, order_id, updateData);
    if (status === "Canceled") {
      const stock_product = {
        stock_products: orderItems.map((item) => ({
          product_id: item.product_id,
          stock: item.Product.stock + item.quantity,
        })),
      };
      await updateProductStock(token, stock_product);
    }
    toast({
      title: "Status Pembayaran berhasil diperbarui",
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
    onClose();
    location.reload();
  };

  const handleUpdateShippingStatus = async (status) => {
    try {
      setIsLoading(true);
      const updateData = {
        shipping_id: shipping_id,
        shipping_status: status,
      };
      await updateOrderStatus(token, order_id, updateData);
      onClose();
      toast({
        title: "Status Pembayaran berhasil diperbarui",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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
                {paymentStatus !== "Lunas" && (
                  <option value="Lunas">Lunas</option>
                )}
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
                  Status Pengiriman Saat ini: {shippingStatus}
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
                      <option value="Menunggu Pembayaran">
                        Menunggu Pembayaran
                      </option>
                    )}
                    {shipping_type === "Pick Up" ? (
                      <>
                        <option value="Dibatalkan">Dibatalkan</option>
                        <option value="Barang Siap Diambil">
                          Barang Siap Diambil
                        </option>
                        <option value="Barang Telah Diambil">
                          Barang Telah Diambil
                        </option>
                      </>
                    ) : (
                      shipping_type === "Delivery" && (
                        <>
                          <option value="Dibatalkan">Dibatalkan</option>
                          <option value="Barang Dikemas">Barang Dikemas</option>
                          <option value="Barang Dikirim">Barang Dikirim</option>
                          <option value="Barang Telah Diterima">
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
                isDisabled={isLoading}
              >
                Update
              </Button>
            )
          )}
          <Button variant="ghost" onClick={onClose} isDisabled={isLoading}>
            Batal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUpdate;

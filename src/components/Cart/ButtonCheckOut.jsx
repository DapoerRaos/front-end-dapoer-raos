"use client";

import { deleteCartItemByCartId } from "@/libs/cart-libs";
import { calculateShippingCost } from "@/libs/utils/CalculateShippingCost";
import { formatPrice } from "@/libs/utils/PriceFormat";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ButtonCheckOut = ({ cookieToken, userCart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [token, setToken] = useState("");
  const [shippingType, setShippingType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [confirmAddress, setConfirmAddress] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const toast = useToast();
  const router = useRouter();

  const handleShippingTypeChange = (event) => {
    const selectedShippingType = event.target.value;
    setShippingType(selectedShippingType);

    if (selectedShippingType === "Delivery") {
      let totalWeight = 0;
      userCart.cart_items.forEach((item) => {
        totalWeight += item.Product.weight * item.quantity;
      });

      setShippingCost(calculateShippingCost(totalWeight));
    } else {
      setShippingCost(0);
    }

    setPaymentType("");
  };

  const handlePaymentTypeChange = (event) => {
    const selectedPaymentType = event.target.value;
    setPaymentType(selectedPaymentType);
  };

  const handleConfirmAddressChange = (event) => {
    const selectedConfirmAddress = event.target.value;
    setConfirmAddress(selectedConfirmAddress);
  };

  const handleEditAlamat = () => {
    router.push(`/profile/user/${userCart.user_customer.user_id}/edit`);
  };

  const handleCloseModal = () => {
    onClose();
    setShippingType("");
    setPaymentType("");
  };

  const handlePaymentCOD = async () => {
    try {
      const createOrderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: `token=${cookieToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            id: `TRX-${nanoid(4)}-${nanoid(6)}`,
            customer_id: userCart.user_customer.customer_id,
            total_price: parseFloat(userCart.cart.grand_price),
            status: "Pending",
            shipping_status: "Ready",
            shipping_type: shippingType,
            payment_method: paymentType,
            va_number: "-",
            bank: "-",
            payment_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          }),
        }
      );

      const createOrderData = await createOrderResponse.json();
      if (createOrderData.status === "Success") {
        const order_id = createOrderData.data.id;
        const order_items = {
          items: userCart.cart_items.map((item) => ({
            order_id: order_id,
            product_id: item.Product.id,
            quantity: item.quantity,
            total_price: item.total_price,
          })),
        };

        const createOrderItemsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/items`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Cookie: `token=${cookieToken}`,
            },
            credentials: "include",
            body: JSON.stringify(order_items),
          }
        );

        const createOrderItemsData = await createOrderItemsResponse.json();
        if (createOrderItemsData.status === "Success") {
          const stock_product = {
            stock_products: userCart.cart_items.map((item) => ({
              product_id: item.Product.id,
              stock: item.Product.stock - item.quantity,
            })),
          };

          const updateStockResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/stock`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Cookie: `token=${cookieToken}`,
              },
              credentials: "include",
              body: JSON.stringify(stock_product),
            }
          );

          const updateStockData = await updateStockResponse.json();

          if (updateStockData.status === "Success") {
            await deleteCartItemByCartId(userCart.cart.cart_id, cookieToken);
          }

          window.location.href = `/order-status?order_id=${order_id}`;
        }
      }
    } catch (error) {
      console.error("Error handling payment and order creation:", error);
    }
  };

  const handlePayment = async () => {
    const paymentData = {
      order_id: `TRX-${nanoid(4)}-${nanoid(6)}`,
      fullname: userCart.user_customer.name,
      telephone: userCart.user_customer.phone,
      shipping_cost: shippingCost,
      products: userCart.cart_items.map((item) => ({
        id: item.Product.id,
        name: item.Product.name,
        quantity: item.quantity,
        price: item.Product.price,
      })),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/payment`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: `token=${cookieToken}`,
        },
        credentials: "include",
        body: JSON.stringify(paymentData),
      }
    );

    const responseData = await response.json();
    setToken(responseData.token);
    onClose();
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: async (result) => {
          localStorage.setItem("transaction", JSON.stringify(result));
          try {
            const createOrderResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Cookie: `token=${cookieToken}`,
                },
                credentials: "include",
                body: JSON.stringify({
                  id: result.order_id,
                  customer_id: userCart.user_customer.customer_id,
                  total_price: parseFloat(result.gross_amount),
                  status: "Paid",
                  shipping_status:
                    shippingType === "Pick Up"
                      ? "Ready"
                      : shippingType === "Delivery" && "Packaged",
                  shipping_type: shippingType,
                  shipping_cost: shippingCost,
                  payment_method: result.payment_type,
                  va_number:
                    result.va_numbers[0]?.va_number ||
                    result.bca_va_number ||
                    result.permata_va_number ||
                    "",
                  bank: result.va_numbers[0]?.bank || result.bank || "",
                  payment_date: result.transaction_time,
                }),
              }
            );

            const createOrderData = await createOrderResponse.json();
            if (createOrderData.status === "Success") {
              const order_items = {
                items: userCart.cart_items.map((item) => ({
                  order_id: result.order_id,
                  product_id: item.Product.id,
                  quantity: item.quantity,
                  total_price: item.total_price,
                })),
              };

              const createOrderItemsResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/items`,
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Cookie: `token=${cookieToken}`,
                  },
                  credentials: "include",
                  body: JSON.stringify(order_items),
                }
              );

              const createOrderItemsData =
                await createOrderItemsResponse.json();
              if (createOrderItemsData.status === "Success") {
                const stock_product = {
                  stock_products: userCart.cart_items.map((item) => ({
                    product_id: item.Product.id,
                    stock: item.Product.stock - item.quantity,
                  })),
                };

                const updateStockResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/stock`,
                  {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Cookie: `token=${cookieToken}`,
                    },
                    credentials: "include",
                    body: JSON.stringify(stock_product),
                  }
                );

                const updateStockData = await updateStockResponse.json();

                if (updateStockData.status === "Success") {
                  await deleteCartItemByCartId(
                    userCart.cart.cart_id,
                    cookieToken
                  );
                }

                window.location.href = `/order-status?order_id=${result.order_id}`;
              }
            }
          } catch (error) {
            console.error("Error handling payment and order creation:", error);
          }
        },
        onPending: async (result) => {
          localStorage.setItem("transaction", JSON.stringify(result));
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Cookie: `token=${cookieToken}`,
                },
                credentials: "include",
                body: JSON.stringify({
                  id: result.order_id,
                  customer_id: userCart.user_customer.customer_id,
                  total_price: parseFloat(result.gross_amount),
                  status: "Pending",
                  shipping_status: "Waiting",
                  shipping_type: shippingType,
                  shipping_cost: shippingCost,
                  payment_method: result.payment_type,
                  va_number:
                    result.va_numbers[0]?.va_number ||
                    result.bca_va_number ||
                    result.permata_va_number ||
                    "",
                  bank: result.va_numbers[0]?.bank || result.bank || "",
                  payment_date: result.transaction_time,
                }),
              }
            );

            const responseData = await response.json();
            if (responseData.status === "Success") {
              const order_items = {
                items: userCart.cart_items.map((item) => ({
                  order_id: result.order_id,
                  product_id: item.Product.id,
                  quantity: item.quantity,
                  total_price: item.total_price,
                })),
              };

              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/items`,
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Cookie: `token=${cookieToken}`,
                  },
                  credentials: "include",
                  body: JSON.stringify(order_items),
                }
              );

              const responseData = await response.json();
              if (responseData.status === "Success") {
                const stock_product = {
                  stock_products: userCart.cart_items.map((item) => ({
                    product_id: item.Product.id,
                    stock: item.Product.stock - item.quantity,
                  })),
                };

                await fetch(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/stock`,
                  {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Cookie: `token=${cookieToken}`,
                    },
                    credentials: "include",
                    body: JSON.stringify(stock_product),
                  }
                );

                await deleteCartItemByCartId(
                  userCart.cart.cart_id,
                  cookieToken
                );
              }
            }
            window.location.href = `/order-status?order_id=${result.order_id}`;
          } catch (error) {
            console.error("Error handling payment and order creation:", error);
          }
        },
        onError: (result) => {
          localStorage.setItem("transaction", JSON.stringify(result));
          toast({
            title: "Terjadi Masalah Saat Membayar",
            status: "error",
            duration: 3000,
            position: "top",
          });
        },
        onClose: () => {
          toast({
            title: "Pembayaran dibatalkan",
            status: "error",
            duration: 3000,
            position: "top",
          });
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransURL = "https://app.sandbox.midtrans.com/snap/snap.js";
    const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransURL;

    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <Button onClick={onOpen} colorScheme={"green"} w={"full"}>
        Checkout
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>
            Pilih Tipe Pengiriman dan Pembayaran
          </ModalHeader>
          <ModalCloseButton onClick={handleCloseModal} />
          <ModalBody>
            <FormControl
              id="shippingType"
              mb={3}
              w={{ base: "100%", md: "66%" }}
            >
              <FormLabel fontSize={"sm"}>Tipe Pengiriman</FormLabel>
              <Select
                placeholder="Pilih Tipe Pengiriman"
                focusBorderColor="#feab3b"
                fontSize={"sm"}
                borderColor={"gray.300"}
                value={shippingType}
                onChange={handleShippingTypeChange}
              >
                <option value="Pick Up">Pick Up</option>
                <option value="Delivery">Delivery</option>
              </Select>
            </FormControl>
            {shippingType === "Pick Up" ? (
              <FormControl
                id="paymentType"
                mb={3}
                w={{ base: "100%", md: "66%" }}
              >
                <FormLabel fontSize="sm">Tipe Pembayaran</FormLabel>
                <Select
                  placeholder="Pilih Tipe Pembayaran"
                  focusBorderColor="#feab3b"
                  fontSize="sm"
                  borderColor="gray.300"
                  value={paymentType}
                  onChange={handlePaymentTypeChange}
                >
                  <option value="COD">COD</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </Select>
              </FormControl>
            ) : shippingType === "Delivery" ? (
              <>
                <Box my={2} bg={"gray.100"} p={3} rounded={"md"}>
                  <Text fontSize="sm">
                    <span className="font-semibold">Tambahan Ongkir:</span>{" "}
                    {formatPrice(shippingCost)}
                  </Text>
                </Box>
                <FormControl
                  id="confirmAddress"
                  mb={3}
                  w={{ base: "100%", md: "66%" }}
                >
                  <FormLabel fontSize="sm">
                    Apakah alamat di bawah sudah benar?
                  </FormLabel>
                  <Select
                    placeholder="Konfirmasi Alamat"
                    focusBorderColor="#feab3b"
                    fontSize="sm"
                    borderColor="gray.300"
                    value={confirmAddress}
                    onChange={handleConfirmAddressChange}
                  >
                    <option value="Sudah">Ya, Sudah</option>
                    <option value="Belum">Tidak, Belum</option>
                  </Select>
                </FormControl>
                <Box mt={2} bg={"gray.100"} p={3} rounded={"md"}>
                  <Text fontSize="sm" fontWeight={"semibold"}>
                    Alamat:
                  </Text>
                  <Text fontSize="sm">{userCart.user_customer.address}</Text>
                  <Text fontSize="sm">
                    {userCart.user_customer.city},{" "}
                    {userCart.user_customer.postal_code}
                  </Text>
                </Box>
              </>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleCloseModal}>
              Batal
            </Button>
            {shippingType === "Pick Up" && paymentType === "COD" && (
              <Button onClick={() => handlePaymentCOD()} colorScheme={"blue"}>
                Buat Pesanan
              </Button>
            )}
            {shippingType === "Pick Up" && paymentType === "Bank Transfer" ? (
              <Button onClick={() => handlePayment()} colorScheme="green">
                Bayar
              </Button>
            ) : shippingType === "Delivery" && confirmAddress === "Sudah" ? (
              <Button onClick={() => handlePayment()} colorScheme="green">
                Bayar
              </Button>
            ) : shippingType === "Delivery" && confirmAddress === "Belum" ? (
              <Button onClick={() => handleEditAlamat()} colorScheme="blue">
                Edit Alamat
              </Button>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ButtonCheckOut;

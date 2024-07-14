"use client";

import { deleteCartItemByCartId } from "@/libs/cart-libs";
import { createOrder, createOrderItem, paymentOrder } from "@/libs/order-libs";
import { updateProductStock } from "@/libs/product-libs";
import { getCity, getProvince, postCost } from "@/libs/rajaOngkir-libs";
import { createShipping } from "@/libs/shipping-libs";
import { generateOrderId, generateShippingId } from "@/libs/utils/GenerateCode";
import { formatPrice } from "@/libs/utils/PriceFormat";
import { formatWeight } from "@/libs/utils/WeightFormatter";
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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const ButtonCheckOut = ({ cookieToken, userCart }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [token, setToken] = useState("");
  const [shippingType, setShippingType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [productWeight, setProductWeight] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [selectedCourier, setSelectedCourier] = useState("");
  const [services, setServices] = useState([]);
  const [destinationDetails, setDestinationDetails] = useState({});
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
  });
  const toast = useToast();

  useEffect(() => {
    const fetchDataProvince = async () => {
      const getProvices = await getProvince();
      setProvinces(getProvices.data);
    };

    fetchDataProvince();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDataCities = async () => {
        const getCities = await getCity(selectedProvince);
        setCities(getCities.data);
      };
      fetchDataCities();
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedProvince && selectedCity && selectedCourier) {
      const fetchDataShippingCost = async () => {
        const serviceShipping = await postCost(
          selectedCity,
          productWeight,
          selectedCourier
        );
        setServices(serviceShipping.data.results);
        setDestinationDetails(serviceShipping.data.destination_details);
      };
      fetchDataShippingCost();
    }
  }, [selectedProvince, selectedCity, productWeight, selectedCourier]);

  const handleProvinceChange = (event) => {
    const selectedProvinces = event.target.value;
    setSelectedProvince(selectedProvinces);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const handleSelectedCourierChange = (event) => {
    const selectedCourier = event.target.value;
    setSelectedCourier(selectedCourier);
  };

  const handleServiceChange = (event) => {
    const selectedServiceCode = event.target.value;
    setSelectedService(selectedServiceCode);

    const foundService = services.reduce((acc, courier) => {
      const service = courier.costs.find(
        (service) => service.service === selectedServiceCode
      );
      if (service) {
        return {
          courier: courier.code,
          service: service.service,
          description: service.description,
          cost: service.cost[0].value,
          etd: service.cost[0].etd,
        };
      }
      return acc;
    }, null);

    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      shipping_details: foundService,
      destination_details: destinationDetails,
    }));

    console.log(shippingDetails);
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleShippingTypeChange = (event) => {
    const selectedShippingType = event.target.value;
    setShippingType(selectedShippingType);

    if (selectedShippingType === "Delivery") {
      let totalWeight = 0;
      userCart.cart_items.forEach((item) => {
        totalWeight += item.Product.weight * item.quantity;
      });
      setProductWeight(totalWeight);
    }

    setPaymentType("");
  };

  const handlePaymentTypeChange = (event) => {
    const selectedPaymentType = event.target.value;
    setPaymentType(selectedPaymentType);
  };

  const handleCloseModal = () => {
    onClose();
    setShippingType("");
    setPaymentType("");
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedService("");
    setShippingDetails({});
  };

  const handlePaymentOnStore = async () => {
    try {
      const date = new Date();
      const order_id = generateOrderId(date);
      const shipping_id = generateShippingId(date);

      const shippingData = {
        id: shipping_id,
        status: "Barang Siap Diambil",
        type: shippingType,
      };

      const orderData = {
        id: order_id,
        customer_id: userCart.user_customer.customer_id,
        shipping_id: shipping_id,
        total_price: parseFloat(userCart.cart.grand_price),
        status: "Pending",
        payment_method: paymentType,
        va_number: "-",
        bank: "-",
        payment_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };

      const order_items = {
        items: userCart.cart_items.map((item) => ({
          order_id: order_id,
          product_id: item.Product.id,
          quantity: item.quantity,
          total_price: item.total_price,
        })),
      };

      const stock_product = {
        stock_products: userCart.cart_items.map((item) => ({
          product_id: item.Product.id,
          stock: item.Product.stock - item.quantity,
        })),
      };

      await createShipping(cookieToken, shippingData);
      await createOrder(cookieToken, orderData);
      await createOrderItem(cookieToken, order_items);
      await updateProductStock(cookieToken, stock_product);
      await deleteCartItemByCartId(cookieToken, userCart.cart.cart_id);

      window.location.href = `/order-status?order_id=${order_id}`;
    } catch (error) {
      console.error("Error handling payment and order creation:", error);
    }
  };

  const handlePayment = async () => {
    const date = new Date();
    const paymentData = {
      order_id: `${generateOrderId(date)}`,
      fullname: userCart.user_customer.name,
      telephone: userCart.user_customer.phone,
      shipping_cost: shippingDetails?.shipping_details?.cost ?? 0,
      products: userCart.cart_items.map((item) => ({
        id: item.Product.id,
        name: item.Product.name,
        quantity: item.quantity,
        price: item.Product.price,
      })),
    };

    const response = await paymentOrder(cookieToken, paymentData);
    setToken(response.token);
    onClose();
  };

  const handlePaymentResult = async (result, status) => {
    const date = new Date();
    const shipping_id = generateShippingId(date);

    const shippingData = {
      id: shipping_id,
      courier: shippingDetails?.shipping_details?.courier,
      service: shippingDetails?.shipping_details?.description,
      status:
        status === "success"
          ? shippingType === "Pick Up"
            ? "Barang Siap Diambil"
            : "Barang di Kemas"
          : "Menunggu Pembayaran",
      type: shippingType,
      cost: shippingDetails?.shipping_details?.cost ?? 0,
      province: shippingDetails?.destination_details?.province,
      city: shippingDetails?.destination_details?.city_name,
      address: shippingDetails?.address,
      etd: shippingDetails?.shipping_details?.etd,
    };

    const orderData = {
      id: result.order_id,
      customer_id: userCart.user_customer.customer_id,
      shipping_id: shipping_id,
      total_price: parseFloat(result.gross_amount),
      status: status === "success" ? "Lunas" : "Pending",
      payment_method: result.payment_type,
      va_number:
        result.va_numbers[0]?.va_number ||
        result.bca_va_number ||
        result.permata_va_number ||
        "",
      bank: result.va_numbers[0]?.bank || result.bank || "",
      payment_date: result.transaction_time,
    };

    const order_items = {
      items: userCart.cart_items.map((item) => ({
        order_id: result.order_id,
        product_id: item.Product.id,
        quantity: item.quantity,
        total_price: item.total_price,
      })),
    };

    const stock_product = {
      stock_products: userCart.cart_items.map((item) => ({
        product_id: item.Product.id,
        stock: item.Product.stock - item.quantity,
      })),
    };

    try {
      await createShipping(cookieToken, shippingData);
      await createOrder(cookieToken, orderData);
      await createOrderItem(cookieToken, order_items);
      await updateProductStock(cookieToken, stock_product);
      await deleteCartItemByCartId(cookieToken, userCart.cart.cart_id);
      window.location.href = `/order-status?order_id=${result.order_id}`;
    } catch (error) {
      console.error("Error handling order creation:", error);
    }
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => handlePaymentResult(result, "success"),
        onPending: (result) => handlePaymentResult(result, "pending"),
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
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"}>
            Pilih Tipe Pengiriman dan Pembayaran
          </ModalHeader>
          <ModalCloseButton onClick={handleCloseModal} />
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormControl id="shippingType" mb={3} w={{ base: "100%" }}>
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
                  <FormControl id="paymentType" mb={3} w={{ base: "100%" }}>
                    <FormLabel fontSize="sm">Tipe Pembayaran</FormLabel>
                    <Select
                      placeholder="Pilih Tipe Pembayaran"
                      focusBorderColor="#feab3b"
                      fontSize="sm"
                      borderColor="gray.300"
                      value={paymentType}
                      onChange={handlePaymentTypeChange}
                    >
                      <option value="Bayar di Tempat">Bayar di Tempat</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </Select>
                  </FormControl>
                ) : (
                  shippingType === "Delivery" && (
                    <div>
                      <FormControl id="paymentType" mb={3} w={{ base: "100%" }}>
                        <FormLabel fontSize="sm">
                          Pilih Provinsi Tujuan
                        </FormLabel>
                        <Select
                          placeholder="Pilih Provinsi"
                          focusBorderColor="#feab3b"
                          fontSize="sm"
                          borderColor="gray.300"
                          maxH={"50px"}
                          value={selectedProvince}
                          onChange={handleProvinceChange}
                        >
                          {provinces.map((province) => (
                            <option
                              key={province.id}
                              value={province.province_id}
                            >
                              {province.province}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      {selectedProvince && (
                        <FormControl
                          id="paymentType"
                          mb={3}
                          w={{ base: "100%" }}
                        >
                          <FormLabel fontSize="sm">Pilih Kota Tujuan</FormLabel>
                          <Select
                            placeholder="Pilih Kota"
                            focusBorderColor="#feab3b"
                            fontSize="sm"
                            borderColor="gray.300"
                            maxH={"50px"}
                            value={selectedCity}
                            onChange={handleCityChange}
                          >
                            {cities.map((city) => (
                              <option key={city.id} value={city.city_id}>
                                {city.city_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      {selectedProvince && selectedCity && (
                        <FormControl
                          id="paymentType"
                          mb={3}
                          w={{ base: "100%" }}
                        >
                          <FormLabel fontSize="sm">
                            Pilih Kurir Pengiriman
                          </FormLabel>
                          <Select
                            placeholder="Pilih Kurir"
                            focusBorderColor="#feab3b"
                            fontSize="sm"
                            borderColor="gray.300"
                            maxH={"50px"}
                            value={selectedCourier}
                            onChange={handleSelectedCourierChange}
                          >
                            <option value="jne">JNE</option>
                            <option value="pos">POS</option>
                            <option value="tiki">TIKI</option>
                          </Select>
                        </FormControl>
                      )}
                      {selectedProvince && selectedCity && selectedCourier && (
                        <FormControl
                          id="paymentType"
                          mb={3}
                          w={{ base: "100%" }}
                        >
                          <FormLabel fontSize="sm">
                            Pilih Layanan Pengiriman
                          </FormLabel>
                          <Select
                            placeholder="Pilih Layanan"
                            focusBorderColor="#feab3b"
                            fontSize="sm"
                            borderColor="gray.300"
                            maxH={"50px"}
                            value={selectedService}
                            onChange={handleServiceChange}
                          >
                            {services.map((courier) =>
                              courier.costs.map((service) => (
                                <option
                                  key={service.service}
                                  value={service.service}
                                >
                                  {service.description} - ({service.cost[0].etd}
                                  {selectedCourier === "pos" ? "" : "Hari"})
                                </option>
                              ))
                            )}
                          </Select>
                        </FormControl>
                      )}
                    </div>
                  )
                )}
              </div>
              {selectedProvince &&
                selectedCity &&
                shippingType === "Delivery" &&
                selectedService && (
                  <Box my={2} bg={"gray.50"} shadow={"md"} p={3} rounded={"md"}>
                    <p className="text-center mb-4 font-semibold">
                      Detail Tujuan Pengiriman
                    </p>
                    <div className="flex flex-col text-sm gap-2">
                      <p>
                        Provinsi:{" "}
                        {shippingDetails?.destination_details?.province}
                      </p>
                      <p>
                        Kota: {shippingDetails?.destination_details?.city_name}
                      </p>
                      <p>Total Berat: {formatWeight(productWeight)}</p>
                      <p>
                        Kurir Pengiriman:{" "}
                        <span className="uppercase">
                          {shippingDetails?.shipping_details?.courier}
                        </span>
                      </p>
                      <p>
                        Layanan Pengiriman:{" "}
                        <span>
                          {shippingDetails?.shipping_details?.description}
                        </span>
                      </p>
                      <p>
                        Estimasi Pengiriman:{" "}
                        {shippingDetails?.shipping_details?.etd}{" "}
                        {selectedCourier === "pos" ? "" : "Hari"}
                      </p>
                      <p>
                        Total Pesanan: {formatPrice(userCart.cart.grand_price)}
                      </p>
                      <p>
                        Tambahan Ongkir:{" "}
                        {formatPrice(shippingDetails.shipping_details?.cost)}
                      </p>
                      <p>
                        Total Pembayaran:{" "}
                        {formatPrice(
                          userCart.cart.grand_price +
                            shippingDetails.shipping_details?.cost
                        )}
                      </p>
                    </div>
                  </Box>
                )}
            </div>
            {shippingType === "Delivery" &&
              selectedProvince &&
              selectedCity &&
              selectedCourier && (
                <FormControl id="address" mb={3}>
                  <FormLabel fontSize={"sm"}>Alamat Lengkap</FormLabel>
                  <Textarea
                    type="text"
                    name="address"
                    focusBorderColor="#feab3b"
                    fontSize={"sm"}
                    resize={"none"}
                    borderColor={"gray.300"}
                    onChange={handleAddressChange}
                  />
                </FormControl>
              )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleCloseModal}>
              Batal
            </Button>
            {shippingType === "Pick Up" &&
              paymentType === "Bayar di Tempat" && (
                <Button
                  onClick={() => handlePaymentOnStore()}
                  colorScheme={"blue"}
                >
                  Buat Pesanan
                </Button>
              )}
            {shippingType === "Pick Up" && paymentType === "Bank Transfer" ? (
              <Button onClick={() => handlePayment()} colorScheme="green">
                Bayar
              </Button>
            ) : (
              shippingType === "Delivery" &&
              selectedProvince &&
              selectedCity && (
                <Button
                  isDisabled={
                    (shippingDetails.address?.trim() ?? "").length < 30
                  }
                  onClick={() => handlePayment()}
                  colorScheme="green"
                >
                  Bayar
                </Button>
              )
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ButtonCheckOut;

"use client";

import Header from "../utils/Header";
import OrderSummary from "./OrderSummary";
import OrderItems from "./OrderItems";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrderStatusById } from "@/libs/order-libs";

const OrderStatus = ({ token }) => {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [customer, setCustomer] = useState({});
  const transaction_id = searchParams.get("order_id");

  useEffect(() => {
    const fetchData = async () => {
      const orderData = await getOrderStatusById(token, transaction_id);
      setData(orderData.data);
      setOrderItems(orderData.data.OrderItems);
      setCustomer(orderData.data.Customer);
    };
    fetchData();
  }, [token, transaction_id]);

  return (
    <div className="py-4">
      <Header
        title={"Status Pesanan"}
        linkTitle={"Kembali"}
        linkHref={"/products"}
      />
      <div className="lg:grid lg:grid-cols-10 lg:items-start gap-x-10 mx-10">
        <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-xl border">
          <OrderSummary
            token={token}
            data={data}
            orderItems={orderItems}
            customerData={customer}
          />
        </div>
        <div className="lg:col-span-5 lg:overflow-y-scroll lg:max-h-[460px]">
          <OrderItems orderItems={orderItems} />
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;

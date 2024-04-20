"use client";

import { useEffect, useState } from "react";
import Header from "../utils/Header";
import OrderSummary from "../Order/OrderSummary";
import OrderItems from "../Order/OrderItems";
import { getOrderStatusById } from "@/libs/order-libs";

const DetailOrder = ({ token, order_id, id }) => {
  const [data, setData] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orderData = await getOrderStatusById(token, order_id);
      setData(orderData.data);
      setOrderItems(orderData.data.OrderItems);
    };
    fetchData();
  }, [token, order_id]);

  return (
    <div className="py-4">
      <Header
        title={"Status Pesanan"}
        linkTitle={"Kembali"}
        linkHref={`/profile/user/${id}`}
      />
      <div className="lg:grid lg:grid-cols-10 lg:items-start gap-x-10 mx-10">
        <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-xl border">
          <OrderSummary token={token} data={data} orderItems={orderItems} />
        </div>
        <div className="lg:col-span-5 lg:overflow-y-scroll lg:max-h-[460px]">
          <OrderItems orderItems={orderItems} />
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;

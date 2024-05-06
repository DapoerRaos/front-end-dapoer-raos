"use client";

import { getOrderByStatus, getOrders } from "@/libs/order-libs";
import { getProducts } from "@/libs/product-libs";
import { formatPrice } from "@/libs/utils/PriceFormat";
import {
  Money,
  ShoppingBag,
  Package,
  ClipboardText,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardCard = ({ token }) => {
  const [totalProduct, setTotalProduct] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);
  const [income, setIncome] = useState(0);
  const [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderStatus = await getOrderByStatus(token, "Paid");
        setIncome(orderStatus.data.income);
        const product = await getProducts();
        setTotalProduct(product.pagination.total);
        setTotalStock(product.totalStock);
        const allOrder = await getOrders(token);
        setTotalOrder(allOrder.data.pagination.total);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="shadow-md p-4 rounded-xl hover:shadow-xl transition-all border-l-8 border-green-500">
        <Link href={"/admin/dashboard/orders"}>
          <div className="flex justify-between text-green-500">
            <h2 className="text-xl font-semibold mb-2 ">Total Pendapatan</h2>
            <Money size={30} />
          </div>
          <p className="text-gray-600">{formatPrice(income)}</p>
        </Link>
      </div>
      <div className=" shadow-md p-4 rounded-xl hover:shadow-xl transition-all border-l-8 border-blue-500">
        <Link href={"/admin/dashboard/products"}>
          <div className="flex justify-between text-blue-500">
            <h2 className="text-xl font-medium mb-2">Produk Tersedia</h2>
            <ShoppingBag size={30} />
          </div>
          <p className="text-gray-600">{totalProduct} Produk</p>
        </Link>
      </div>
      <div className=" shadow-md p-4 rounded-xl hover:shadow-xl transition-all border-l-8 border-orange-500">
        <Link href={"/admin/dashboard/stocks"}>
          <div className="flex justify-between text-orange-500">
            <h2 className="text-xl font-medium mb-2">Total Stok Barang</h2>
            <Package size={30} />
          </div>
          <p className="text-gray-600">{totalStock} Stok</p>
        </Link>
      </div>
      <div className=" shadow-md p-4 rounded-xl hover:shadow-xl transition-all border-l-8 border-red-500">
        <Link href={"/admin/dashboard/orders"}>
          <div className="flex justify-between text-red-500">
            <h2 className="text-xl font-medium mb-2">Total Pesanan</h2>
            <Package size={30} />
          </div>
          <p className="text-gray-600">{totalOrder} Pesanan</p>
        </Link>
      </div>
      <div className=" shadow-md p-4 rounded-xl hover:shadow-xl transition-all">
        <h2 className="text-xl font-medium mb-2">Lain-lain</h2>
        <p className="text-gray-600">Informasi Lain</p>
      </div>
    </div>
  );
};

export default DashboardCard;

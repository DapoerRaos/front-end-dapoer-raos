import { formatPrice } from "@/libs/utils/PriceFormat";
import { PageBottom, Tailwind } from "@fileforge/react-print";
import { formatDate } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Document = ({ data, startDate, endDate }) => {
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  useEffect(() => {
    const calculateTotalPaidAmount = () => {
      let total = 0;
      data.forEach((transaction) => {
        if (transaction.status === "Lunas") {
          total += transaction.total_price;
        }
      });
      setTotalPaidAmount(total);
    };

    calculateTotalPaidAmount();
  }, [data]);

  return (
    <Tailwind>
      <div className="mx-10 py-10">
        <div className="flex justify-between items-end pb-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dapoer Raos</h1>
          </div>
          <Image
            src={"/images/dapoer-raos-logo.png"}
            alt="logo"
            width={80}
            height={80}
          />
        </div>
        <div className="text-right">
          <p className="p-0 mb-1">
            <b>Laporan Penjualan</b>
          </p>
          <p className="p-0 mb-1">Griya Pamulang 2, Blok C1 No.29</p>
          <p className="p-0 mb-1">Tangerang Selatan,</p>
          <p className="p-0 mb-1">Banten</p>
        </div>
        <div className="h-px bg-gray-300 my-4" />
        <div>
          <p className="p-0 mb-1">
            <b>Tanggal Transaksi:</b>
          </p>
          <p className="p-0">
            {startDate && formatDate(startDate, "dd MMM yyyy")} - {""}
            {endDate && formatDate(endDate, "dd MMM yyyy")}
          </p>
        </div>
        <table className="w-full my-10 border-collapse">
          <thead>
            <tr className="border-b border-gray-300 text-sm">
              <th className="text-left font-bold py-2 px-4">No</th>
              <th className="text-left font-bold py-2 px-4">Pelanggan</th>
              <th className="text-left font-bold py-2 px-4">Produk</th>
              <th className="text-left font-bold py-2">Harga Satuan</th>
              <th className="text-left font-bold py-2 px-4">Kuantitas</th>
              <th className="text-left font-bold py-2 px-4">Status</th>
              <th className="text-center font-bold py-2">Total</th>
              <th className="text-left font-bold py-2 px-4">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-300 text-xs">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 text-center">
                  {item.Customer.fullname.split(" ")[0]}
                </td>
                <td className="py-2 px-4 text-xs">
                  {item.OrderItems.map((data, index) => (
                    <p key={index}>{data.Product.name}</p>
                  ))}
                </td>
                <td className="py-2 px-4">
                  {item.OrderItems.map((data, index) => (
                    <p key={index}>{formatPrice(data.Product.price)}</p>
                  ))}
                </td>
                <td className="py-2 px-4 text-center">
                  {item.OrderItems.map((data, index) => (
                    <p key={index}>{data.quantity}</p>
                  ))}
                </td>
                <td className="py-2 px-4">
                  {item.status === "Lunas"
                    ? "Lunas"
                    : item.status === "Pending"
                    ? "Pending"
                    : "Batal"}
                </td>
                <td className="py-2 text-center">
                  {formatPrice(item.total_price)}
                </td>
                <td className="py-2 px-4">
                  {formatDate(item.payment_date, "dd MMM yyyy")}
                </td>
              </tr>
            ))}
            <tr className="border-b border-gray-300 text-sm">
              <th className="font-bold py-2 px-4"></th>
              <th className="font-bold py-2 px-4">Total Pemasukan (Lunas)</th>
              <th className="font-bold py-2 px-"></th>
              <th className="font-bold py-2 px-4"></th>
              <th className="font-bold py-2 px-4"></th>
              <th className="font-bold py-2 px-4"></th>
              <th className="font-bold py-2 px-4">
                {formatPrice(totalPaidAmount)}
              </th>
              <th className="font-bold py-2 px-4"></th>
            </tr>
          </tbody>
        </table>
        <div className="bg-blue-100 p-3 rounded-md border-blue-300 text-blue-800 text-sm">
          Laporan Penjualan ini dibuat pada tanggal{" "}
          {formatDate(new Date(), "dd MMM yyyy")}
        </div>
        <PageBottom>
          <div className="h-px bg-gray-300 my-4" />
          <div className="text-gray-400 text-sm">Dapoer Raos</div>
        </PageBottom>
      </div>
    </Tailwind>
  );
};

export default Document;

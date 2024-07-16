import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { DotsThree } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModalUpdate from "./ModalUpdate";
import { getOrderStatusById } from "@/libs/order-libs";

const DropdownAction = ({
  id,
  status,
  shipping_id,
  shippingStatus,
  shipping_type,
  token,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const orderData = await getOrderStatusById(token, id);
      setOrderItems(orderData.data.OrderItems);
    };
    fetchData();
  }, [token, id]);

  const handleOpenModal = (modalTitle) => {
    setTitle(modalTitle);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ModalUpdate
        token={token}
        order_id={id}
        shipping_id={shipping_id}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
        paymentStatus={status}
        shippingStatus={shippingStatus}
        shipping_type={shipping_type}
        orderItems={orderItems}
      />

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<DotsThree />}
          variant="outline"
          rounded={"full"}
          size={"sm"}
        />
        <MenuList>
          <Link href={`/admin/dashboard/orders/detail/${id}`}>
            <MenuItem icon={<ViewIcon />}>Detail</MenuItem>
          </Link>
          {status !== "Lunas" && status !== "Canceled" && (
            <MenuItem
              icon={<EditIcon />}
              onClick={() => handleOpenModal("Payment Status")}
            >
              Update Status Pembayaran
            </MenuItem>
          )}
          {shippingStatus !== "Barang Telah Diambil" &&
            shippingStatus !== "Barang Telah Diterima" &&
            shippingStatus !== "Dibatalkan" && (
              <MenuItem
                icon={<EditIcon />}
                onClick={() => handleOpenModal("Shipping Status")}
              >
                Update Status Pengiriman
              </MenuItem>
            )}
        </MenuList>
      </Menu>
    </>
  );
};

export default DropdownAction;

import OrderControl from "@/components/Admin/Order/OrderControl";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import React from "react";

const Page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== "admin") {
      redirect("/");
    }
  } else if (!token) {
    redirect("/");
  }

  return (
    <DashboardLayout title={"Daftar Pesanan"}>
      <OrderControl token={token} />
    </DashboardLayout>
  );
};

export default Page;

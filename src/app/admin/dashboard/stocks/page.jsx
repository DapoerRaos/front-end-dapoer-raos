import StockControl from "@/components/Admin/Stock/StockControl";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
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
    <DashboardLayout title={"Kelola Stok Produk"}>
      <StockControl token={token} />
    </DashboardLayout>
  );
};

export default Page;

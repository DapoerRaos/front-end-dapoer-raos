import DashboardCard from "@/components/Admin/Dashboard/DashboardCard";
import ProductInformation from "@/components/Admin/Dashboard/ProductInformation";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
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
    <DashboardLayout title={"Dashboard"}>
      <DashboardCard token={token} />
      <ProductInformation token={token} />
    </DashboardLayout>
  );
};

export default Page;

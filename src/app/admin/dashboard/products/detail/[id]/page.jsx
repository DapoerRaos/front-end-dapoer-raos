import DetailProductCard from "@/components/Admin/Product/DetailCard";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const Page = async ({ params }) => {
  const { id } = params;
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
    <DashboardLayout
      title={"Detail Produk"}
      linkTitle={"Kembali"}
      linkHref={"/admin/dashboard/products"}
    >
      <DetailProductCard id={id} token={token} />
    </DashboardLayout>
  );
};

export default Page;

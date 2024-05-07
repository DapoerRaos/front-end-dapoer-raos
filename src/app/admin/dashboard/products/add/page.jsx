import FormAddProduct from "@/components/Form/AddProduct";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { getCategories } from "@/libs/product-libs";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

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

  const categories = await getCategories();

  return (
    <DashboardLayout
      title={"Tambah Produk"}
      description={"Tambahkan Produk Baru Ke Toko"}
      linkTitle={"Kembali"}
      linkHref={"/admin/dashboard/products"}
    >
      <div className="border border-gray-200 p-6 rounded-lg shadow-md">
        <FormAddProduct category={categories} token={token} />
      </div>
    </DashboardLayout>
  );
};

export default Page;

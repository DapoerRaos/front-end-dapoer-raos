import FormEditProduct from "@/components/Form/EditProduct";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { getCategories } from "@/libs/product-libs";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  const categories = await getCategories();

  return (
    <DashboardLayout
      title={"Edit Produk"}
      description={"Ubah Data Produk Yang Tersedia"}
      linkTitle={"Kembali"}
      linkHref={"/admin/dashboard/products"}
    >
      <div className="border border-gray-200 p-6 rounded-lg shadow-md">
        <FormEditProduct id={id} category={categories} token={token} />
      </div>
    </DashboardLayout>
  );
};

export default Page;

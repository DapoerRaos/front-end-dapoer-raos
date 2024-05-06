import OrderDetailSummary from "@/components/Admin/Order/OrderDetailSummary";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import OrderItems from "@/components/Order/OrderItems";
import { getOrderStatusById } from "@/libs/order-libs";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const page = async ({ params }) => {
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

  const orderData = await getOrderStatusById(token, id);

  return (
    <DashboardLayout
      title={"Status Pesanan"}
      linkTitle={"Kembali"}
      linkHref={"/admin/dashboard/orders"}
    >
      <div className="lg:grid lg:grid-cols-10 lg:items-start gap-x-5">
        <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 shadow-xl border">
          <OrderDetailSummary
            token={token}
            data={orderData.data}
            orderItems={orderData.data.OrderItems}
          />
        </div>
        <div className="lg:col-span-5 lg:overflow-y-scroll lg:max-h-[460px]">
          <OrderItems orderItems={orderData.data.OrderItems} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;

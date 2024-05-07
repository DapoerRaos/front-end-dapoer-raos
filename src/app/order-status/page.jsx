import { cookies } from "next/headers";
import MainLayout from "@/components/Layouts/MainLayout";
import OrderStatus from "@/components/Order/OrderStatus";

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <MainLayout token={token}>
      <OrderStatus token={token} />
    </MainLayout>
  );
};

export default Page;

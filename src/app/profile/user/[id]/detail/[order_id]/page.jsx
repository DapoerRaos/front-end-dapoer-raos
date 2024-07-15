import MainLayout from "@/components/Layouts/MainLayout";
import DetailOrder from "@/components/Profile/DetailOrder";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = ({ params }) => {
  const { order_id, id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/");
  }
  return (
    <MainLayout token={token}>
      <DetailOrder token={token} order_id={order_id} id={id} />
    </MainLayout>
  );
};

export default page;

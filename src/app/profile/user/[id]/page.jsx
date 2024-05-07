import ProfileLayout from "@/components/Layouts/ProfileLayout";
import TransactionSearhInput from "@/components/Profile/TransactionSearhInput";
import { getCustomerById } from "@/libs/customer-libs";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const userCustomer = await getCustomerById(token);

  return (
    <ProfileLayout
      title={"Transaksi"}
      description={"Lihat Riwayat Transaksi Anda"}
      customerData={userCustomer.data}
    >
      <TransactionSearhInput token={token} customerData={userCustomer.data} />
    </ProfileLayout>
  );
};

export default page;

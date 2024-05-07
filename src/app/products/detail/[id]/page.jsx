import MainLayout from "@/components/Layouts/MainLayout";
import DetailProductCard from "@/components/Product/DetailProduct";
import Header from "@/components/utils/Header";
import { cookies } from "next/headers";

const Page = ({ params }) => {
  const { id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <MainLayout token={token}>
      <Header
        title={"Detail Produk"}
        linkTitle={"Kembali"}
        linkHref={"/products"}
      />
      <div className="px-10 mb-6">
        <DetailProductCard id={id} token={token} />
      </div>
    </MainLayout>
  );
};

export default Page;

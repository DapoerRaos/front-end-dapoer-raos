import MainLayout from "@/components/Layouts/MainLayout";
import Header from "@/components/utils/Header";
import { getProducts } from "@/libs/product-libs";
import { cookies } from "next/headers";
import SearchBarHeader from "@/components/Product/SearchBarHeader";

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const product = await getProducts();

  return (
    <MainLayout token={token}>
      <section className="py-4">
        <Header
          title={"Produk Tersedia"}
          linkTitle={"Kembali"}
          linkHref={"/"}
          productLength={product.pagination.total}
        />
        <SearchBarHeader token={token} />
      </section>
    </MainLayout>
  );
};

export default Page;

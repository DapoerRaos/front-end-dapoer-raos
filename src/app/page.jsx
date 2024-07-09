import Hero from "@/components/Layouts/Hero";
import MainLayout from "@/components/Layouts/MainLayout";
import Testimonial from "@/components/Layouts/Testimonial";
import ProductList from "@/components/Product/ProductList";
import ButtonAllProduct from "@/components/Product/utils/ButtonAllProduct";
import Header from "@/components/utils/Header";
import { getProducts } from "@/libs/product-libs";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const productList = await getProducts();

  return (
    <MainLayout token={token}>
      <section>
        <Hero />
      </section>
      <section className="pb-4">
        <Testimonial />
      </section>
      <section className="pb-6">
        <Header
          title={"Katalog Produk"}
          linkHref={"/products"}
          linkTitle={"Lihat Semua"}
        />
        <ProductList api={productList} token={token} />
        <ButtonAllProduct />
      </section>
    </MainLayout>
  );
}

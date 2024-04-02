import Hero from "@/components/Layouts/Hero";
import Navbar from "@/components/Layouts/Navbar";
import ProducList from "@/components/ProductList";
import Header from "@/components/ProductList/Header";
import { getProducts } from "@/libs/product-libs";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const productList = await getProducts();

  return (
    <>
      <Navbar token={token?.value} />
      <section>
        <Hero />
      </section>
      <section className="py-4">
        <Header
          title={"Katalog Produk"}
          linkHref={"/products"}
          linkTitle={"Lihat Semua"}
        />
        <ProducList api={productList} />
      </section>
    </>
  );
}

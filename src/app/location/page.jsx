import MainLayout from "@/components/Layouts/MainLayout";
import CardLocation from "@/components/Location/CardLocation";
import Header from "@/components/utils/Header";
import { cookies } from "next/headers";

function page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return (
    <MainLayout token={token}>
      <section>
        <Header title={"Lokasi Toko"} linkTitle={"Kembali"} linkHref={"/"} />
        <CardLocation />
      </section>
    </MainLayout>
  );
}

export default page;

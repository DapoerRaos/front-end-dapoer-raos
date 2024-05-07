import CartList from "@/components/Cart/CartList";
import Summary from "@/components/Cart/Summary";
import MainLayout from "@/components/Layouts/MainLayout";
import Header from "@/components/utils/Header";
import { getCartByUserId } from "@/libs/cart-libs";
import { cookies } from "next/headers";
import Link from "next/link";

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const userCart = await getCartByUserId(token);

  return (
    <MainLayout token={token}>
      {userCart.data.cart_items.length === 0 ? (
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="flex flex-col justify-center items-center gap-4">
            <p>Tidak Ada Produk Didalam Keranjang</p>
            <Link href={"/products"}>
              <button className="bg-[#feab3b] hover:bg-[#febe3b] transition-all text-white font-bold py-2 px-4 rounded-full">
                Tambakan Produk
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="py-6">
          <Header
            title={"Keranjang Belanja"}
            linkTitle={"Lihat Produk Lain"}
            linkHref={"/products"}
          />
          <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-10 mx-10">
            <div className="lg:col-span-7">
              <CartList token={token} userCart={userCart.data} />
            </div>
            <div className="mt-4 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <Summary token={token} userCart={userCart.data} />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Page;

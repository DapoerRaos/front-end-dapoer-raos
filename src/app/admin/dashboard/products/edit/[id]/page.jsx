import FormEditProduct from "@/components/Form/EditProduct";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { getCategories } from "@/libs/product-libs";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params }) => {
  const { id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    const decodedToken = jwtDecode(token.value);
    if (decodedToken.role !== "admin") {
      redirect("/");
    }
  } else if (!token) {
    redirect("/");
  }

  const categories = await getCategories();

  return (
    <DashboardLayout>
      <Box ml={{ base: 0, md: 60 }} p="6">
        <div className="w-50 h-50">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <Heading color={"#feab3b"} mb={2}>
                Edit Produk
              </Heading>
              <Text fontSize={"sm"} color={"gray.500"}>
                Ubah Data Produk Yang Tersedia
              </Text>
            </div>
            <Link href={"/admin/dashboard/products"}>
              <Button rounded={"full"} colorScheme={"green"} size={"sm"}>
                Lihat Produk
              </Button>
            </Link>
          </div>
          <div className="border border-gray-200 p-6">
            <FormEditProduct
              id={id}
              category={categories}
              token={token.value}
            />
          </div>
        </div>
      </Box>
    </DashboardLayout>
  );
};

export default Page;

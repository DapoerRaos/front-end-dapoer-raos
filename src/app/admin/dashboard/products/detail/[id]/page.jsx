import DetailProductCard from "@/components/Admin/Product/Detail";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { Box, Heading, Text } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Link from "next/link";

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

  return (
    <DashboardLayout>
      <Box ml={{ base: 0, md: 60 }} p="8">
        <div className="w-50 h-50">
          <div className="mb-3 flex items-center justify-between">
            <Heading color={"#feab3b"}>Detail Produk</Heading>
            <Link href={"/admin/dashboard/products"}>
              <Text
                color={"#feab3b"}
                transition={"all 0.2s"}
                _hover={{ textDecoration: "underline", pr: 2 }}
              >
                Kembali
              </Text>
            </Link>
          </div>
          <DetailProductCard id={id} token={token.value} />
        </div>
      </Box>
    </DashboardLayout>
  );
};

export default Page;

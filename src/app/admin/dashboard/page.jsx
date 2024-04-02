import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { Box } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
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
      <Box ml={{ base: 0, md: 60 }} p="6">
        <div className="w-50 h-50">
          <div className="mb-6">Content Disini</div>
        </div>
      </Box>
    </DashboardLayout>
  );
};

export default Page;

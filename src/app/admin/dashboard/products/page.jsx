import DashboardLayout from "@/components/Layouts/DashboardLayout";
import ProductControl from "@/components/Admin/Product/ProductControl";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabIndicator,
} from "@chakra-ui/react";
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
          <div className="mb-3">
            <Heading color={"#feab3b"}>Kelola Produk</Heading>
          </div>
          <Tabs size="md" position={"relative"} variant="unstyled">
            <TabList>
              <Tab>Produk</Tab>
              <Tab>Stok</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#feab3b"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <ProductControl token={token.value} />
              </TabPanel>
              <TabPanel>
                <div>
                  <p>stok produk</p>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </Box>
    </DashboardLayout>
  );
};

export default Page;

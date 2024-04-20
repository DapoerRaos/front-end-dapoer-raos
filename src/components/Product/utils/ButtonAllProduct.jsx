import { Button } from "@chakra-ui/react";
import Link from "next/link";

const ButtonAllProduct = () => {
  return (
    <div className="flex justify-center mt-8">
      <Link href={"/products"}>
        <Button
          rounded={"full"}
          color={"white"}
          bg={"#feab3b"}
          _hover={{ bg: "#fecb3b" }}
          size={"md"}
        >
          Lihat Semua Produk
        </Button>
      </Link>
    </div>
  );
};

export default ButtonAllProduct;

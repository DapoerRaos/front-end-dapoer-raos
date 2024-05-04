"use client";

import { Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import StockTable from "./StockTable";

export default function StockControl({ token }) {
  const searchRef = useRef();
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = (event) => {
    const keyword = searchRef.current.value.trim();

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();

      router.push(`?search=${keyword}`);
      setSearchKeyword(keyword);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <div className="sm:w-1/3">
          <Input
            ref={searchRef}
            onKeyDown={handleSearch}
            onChange={handleSearch}
            type="search"
            focusBorderColor="#feab3b"
            placeholder="Cari Produk"
            fontSize={"sm"}
            borderColor={"gray.300"}
          />
        </div>
      </div>
      <StockTable searchKeyword={searchKeyword} token={token} />
    </>
  );
}
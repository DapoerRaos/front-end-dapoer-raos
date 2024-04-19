"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/react";

const Pagination = ({ page, setPage, totalPages }) => {
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevState) => prevState + 1);
    }
  };

  return (
    <div className="mt-6 mx-10 flex justify-end items-center gap-2">
      <Button
        onClick={handlePrevPage}
        as={IconButton}
        icon={<ChevronLeftIcon />}
        size={"sm"}
        bg={"#feab3b"}
        color={"white"}
        _hover={{ bg: "#fece3b" }}
      />
      <span className="text-sm">
        {page} of {totalPages}
      </span>
      <Button
        onClick={handleNextPage}
        as={IconButton}
        icon={<ChevronRightIcon />}
        size={"sm"}
        bg={"#feab3b"}
        color={"white"}
        _hover={{ bg: "#fece3b" }}
      />
    </div>
  );
};

export default Pagination;

import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const DashboardHeader = ({
  children,
  title,
  description,
  linkTitle,
  linkHref,
}) => {
  return (
    <Box ml={{ base: 0, md: 60 }} px="6" py={"4"}>
      <div className="w-50 h-50">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <Heading color={"#feab3b"}>{title}</Heading>
            {description && (
              <Text fontSize={"sm"} color={"gray.500"}>
                {description}
              </Text>
            )}
          </div>
          {linkTitle && linkHref && (
            <Link href={linkHref}>
              <Text
                color={"#feab3b"}
                transition={"all 0.2s"}
                _hover={{ textDecoration: "underline", pr: 2 }}
              >
                {linkTitle}
              </Text>
            </Link>
          )}
        </div>
        {children}
      </div>
    </Box>
  );
};

export default DashboardHeader;

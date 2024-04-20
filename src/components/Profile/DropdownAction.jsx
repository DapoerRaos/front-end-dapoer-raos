import { EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { DotsThree } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const DropdownAction = ({ id, userId, status }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<DotsThree />}
        variant="outline"
        rounded={"full"}
        size={"sm"}
      />
      <MenuList>
        <Link href={`/profile/user/${userId}/detail/${id}`}>
          <MenuItem icon={<ViewIcon />}>Detail</MenuItem>
        </Link>
        {/* {status !== "Paid" && status !== "Canceled" ? (
          <Link href={`/profile/user/${userId}/edit/${id}`}>
            <MenuItem icon={<EditIcon />}>Cek Status</MenuItem>
          </Link>
        ) : null} */}
      </MenuList>
    </Menu>
  );
};

export default DropdownAction;

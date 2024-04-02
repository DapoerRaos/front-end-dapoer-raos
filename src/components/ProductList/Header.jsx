import Link from "next/link";
import React from "react";

const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="py-4 mx-10 mb-4 flex justify-between items-center">
      <h1 className="text-4xl text-[#feab3b] font-bold">{title}</h1>
      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="md:text-lg text-sm text-[#feab3b] font-medium hover:text-[#febb3b] hover:pe-2 hover:underline transition-all"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default Header;

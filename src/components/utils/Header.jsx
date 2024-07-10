"use client";

import Link from "next/link";

const Header = ({ title, linkHref, linkTitle, productLength }) => {
  return (
    <div className="py-4 mx-10 flex justify-between items-center">
      <h1 className="text-2xl lg:text-3xl text-[#feab3b] font-bold">
        {title} {productLength && ` (${productLength})`}
      </h1>
      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="md:text-lg text-sm text-center text-[#feab3b] font-medium hover:text-[#febb3b] hover:pe-2 hover:underline transition-all"
        >
          {linkTitle}
        </Link>
      ) : null}
    </div>
  );
};

export default Header;

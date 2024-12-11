"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const SingleProductPage = () => {
  const id = usePathname().split("/")[2];
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default SingleProductPage;

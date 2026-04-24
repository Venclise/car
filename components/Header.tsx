"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SearchBar from "./SearchBar";
import { Button } from "@base-ui/react";
import { Car } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <div
      className={`w-full  flex items-center justify-between  h-[2.5rem] p-7 lg:p-10 ${pathname === "/dashboard" || pathname === "/dashboard/add" ? "hidden" : "flex"}`}
    >
      <div>
        <Link href="/">
          <Image alt="Logo" src="/logo.svg" height={50} width={100} />
        </Link>
      </div>

      <div className="flex items-center gap-2 lg:w-full w-max  justify-end items-center">
        <div className="lg:w-[50%] flex items-center ">
          <SearchBar />
        </div>
        <Link href="/products" className="">
          <Button  className="bg-blue-500 h-full flex items-center   gap-2  py-2 px-2  cursor-pointer hover:bg-blue-400  text-sm rounded-full text-white">
            <Car />
            Explore Cars
          </Button>
        </Link>
      </div>
    </div>
  );
}

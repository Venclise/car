"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { Calendar, Clock, Fuel, Road, Tag } from "lucide-react";
import { Badge } from "../ui/badge";
import ProductActions from "../dashboard/ProductActions";

type ProductData = {
  _id: string;
  title: string;
  price: number;
  cutprice: number;
  description: string;
  category: string;
  image: string[];
  year: number;
  mileage:number
  fuel: string
};

export default function ProductCard({ data }: { data: ProductData }) {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <div
      // className="h-[20rem] md:h-[22rem] lg:h-[25rem] lg:w-[15rem]  w-[12rem]  group  relative   bg-white "
      className="h-[30rem] bg-gray-50  group  relative rounded-xl overflow-hidden "
    >
      <Link
        href={`${isDashboard ? "#" : `/products/item/${data._id}`}`}
        className="h-full w-full"
      >
        <div className="w-full h-[60%] relative overflow-hidden">
          <Image
            src={data.image[0]}
            alt={data.title}
            fill
            blurDataURL={data.image[0]}
            placeholder="blur"
            className={`object-cover transition-opacity duration-300 ${
              !isDashboard && data.image.length > 1
                ? "group-hover:opacity-0"
                : ""
            }`}
            loading="lazy"
          />

          {!isDashboard && data.image.length > 1 && (
            <Image
              src={data.image[1]}
              alt={data.title}
              fill
              loading="lazy"
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}

          {!isDashboard && data.cutprice > data.price && (
            <Badge className="absolute text-xs top-3 left-3 rounded-full bg-neutral-100  text-green-700 uppercase">
              Save{" "}
              {Math.round(((data.cutprice - data.price) / data.cutprice) * 100)}
              %
            </Badge>
          )}

        </div>

        <div className="flex flex-col items-center gap-2 p-2">
          {isDashboard && <ProductActions id={data._id} />}

            <h2 className="text-lg md:text-xl font-semibold  line-clamp-1 uppercase ">
              {data.title}
            </h2>

            <p className="  flex items-center  ">
              <span className=" text-lg   ">
                PKR.
                {data.price.toLocaleString()}
              </span>
            </p>
          
          <div className="flex items-center justify-center mt-4   gap-8">
            <span className="flex items-center flex-col gap-2 font-semibold  text-neutral-800 w-max  rounded-md text-sm">
              <Calendar size={20} className="text-orange-500"/>
              {data.year}</span>
               <span className="flex items-center flex-col gap-2 font-semibold text-neutral-800 w-max rounded-md text-sm">
              <Road size={20} className="text-blue-700"/>
              {data.mileage.toLocaleString()}KM</span>
               <span className="flex capitalize items-center flex-col gap-2 font-semibold text-neutral-800  w-max  rounded-md text-sm">
              <Fuel size={15} className="text-green-500"/>
              {data.fuel}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "../ui/select";
import ProductCard from "./ProductCard";
import { categories } from "@/lib/constants";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Filter, Search, Tag } from "lucide-react";
import Image from "next/image";
import { Swiper ,SwiperSlide } from "swiper/react";

import type { Swiper as SwiperType } from "swiper";
import { A11y, Pagination } from "swiper/modules";


export default function ProductsGrid() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const sale = searchParams.get("sale");
  const sort = searchParams.get("sort");
  const condition = searchParams.get("condition");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const params = new URLSearchParams();

      if (sort) params.set("sort", sort);
      if (sale) params.set("sale", "true");
      if (condition) params.set("condition", condition);

      const url = `/api/products${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch the products");
      }
      const data = await res.json();

      setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, [sale, sort, condition]);

    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="lg:mt-24 mt-12 p-1">

        <div className="flex w-full items-center relative justify-around ">
          <div className="w-[80%] flex ">
         
        <Swiper
        className="w-full "
          modules={[A11y, Pagination]}
          spaceBetween={5}
          speed={600}
          breakpoints={{
            0: { slidesPerView: 2.5 },
            640: { slidesPerView: 3.5 },
            1024: { slidesPerView: 6.1 },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          <div className="r w-full relative">
          
            {categories.map(({ id, title, img }) => {
              return (
                <SwiperSlide>
                  <Link
                    href={`/products/${title}`}
                    key={id}
                    className="bg-neutral-100  flex items-center justify-center gap-4 py-2  h-[3rem] w-[10rem] rounded-full group transition-all "
                  >
                    <Image src={img} alt={title} width={30} height={30} />
                    <span className="text-xs text-gray-700 max-w-lg font-semibold">
                      {title}
                    </span>
                  </Link>
                </SwiperSlide>
              );
            })}

            <div
              className={`w-[95%] left-0 bg-black  flex justify-between  items-center absolute top-0      z-100`}
            >
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="
            h-10 w-10 rounded-full
             
             backdrop-filter backdrop-blur-sm   
            flex items-center justify-center   
           text-blue-500   
          "
              >
                <ChevronLeft size={35} />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="
    h-10 w-10 rounded-full
             bg-transparent
             backdrop-filter backdrop-blur-sm   
            flex items-center justify-center
            shadow-xl
            transition-all
           text-blue-500  
         
                    "
              >
                <ChevronRight size={35} />
              </button>
            </div>
          </div>
        </Swiper>
          </div>

          <Select
            value={sort || ""}
            onValueChange={(value) => {
              const params = new URLSearchParams(searchParams.toString());

              params.delete("sort");
              params.delete("sale");
              params.delete("condition");

              if (value === "newest") {
                params.set("sort", "newest");
              } else if (value === "sale") {
                params.set("sale", "true");
              } else {
                params.set("condition", value);
              }

              router.push(`/products?${params.toString()}`);
            }}
          >
            <SelectTrigger className="w-max rounded-full">
              <SelectValue placeholder={<Filter />} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="sale">On Sale</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Condition</SelectLabel>
              <SelectItem value="used">Used</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    
    

      <div
        className={` ${products.length === 0 ? "h-screen w-full flex items-center justify-center" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5  gap-y-20 py-20"}`}
      >
        {products.map((item) => {
          return <ProductCard key={item._id} data={item} />;
        })}
        {!loading && products.length === 0 && (
          <div className="flex items-center gap-4">
            {" "}
            <Search /> No Result Found{" "}
          </div>
        )}
      </div>
    </div>
  );
}

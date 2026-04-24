"use client";
import { A11y, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { ChevronLeft, ChevronRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { categories } from "@/lib/constants";

export default function Categories() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="md:h-[70vh] h-screen lg:p-10 p-5 flex flex-col gap-8 ">
      <h1 className="font-semibold text-3xl lg:text-4xl text-center text-neutral-800 ">
        Browse by Popular Brands
      </h1>

      <div>




        <Swiper
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
          <div className="flex items-center gap-8 justify-center w-full relative">
            <SwiperSlide>
              <Link
                href="/products"
                className=" flex items-center  justify-center py-2 flex-col h-[10rem] w-[10rem]   rounded-md group transition-all bg-blue-500 "
              >
                <Tag className=" h-10 w-10 lg:w-15 lg:h-15 text-white group-hover:scale-105 transition-transform " />

                <span className="text-xs text-white ">All Deals</span>
              </Link>
            </SwiperSlide>
            {categories.map(({ id, title, img }) => {
              return (
                <SwiperSlide>
                  <Link
                    href={`/products/${title}`}
                    key={id}
                    className="bg-neutral-50 border flex items-center justify-center py-2 flex-col h-[10rem] w-[10rem] rounded-md group transition-all "
                  >
                    <Image src={img} alt={title} width={100} height={100} />
                    <span className="text-xs text-gray-700 max-w-lg">
                      {title}
                    </span>
                  </Link>
                </SwiperSlide>
              );
            })}




            <div
              className={`w-[95%] left-0     flex justify-between  items-center absolute top-0      z-100`}
            >
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="
            h-10 w-10 rounded-full
             bg-transparent
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
    </div>
  );
}

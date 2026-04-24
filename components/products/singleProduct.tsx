"use client";

import Image from "next/image";
import { Button } from "../ui/button";

import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRef, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Fuel,
  MessageCircle,
  Network,
  Road,
} from "lucide-react";
import Link from "next/link";

type Product = {
  _id: any;
  title: string;
  description: string;
  price: number;
  cutprice: number;
  image: string[];
  category: string;
  subcategory: string;
  year: number;
  mileage: number;
  fuel: string;
};
export default function SingleProduct({ product }: { product: Product }) {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [length, setLength] = useState(200);

  return (
    <div className="w-full   h-max   flex  justify-between  flex-col  overflow-hidden">
      {product.image && (
        <div className={` relative w-full  flex  flex-col `}>
          <div className="w-full  lg:w-[100%] h-[85vh] lg:h-screen  overflow-hidden ">
            <Swiper
              className="w-full h-full"
              modules={[Navigation, Pagination]}
              spaceBetween={5}
              breakpoints={{
                576: {
                  slidesPerView: product.image.length > 1 ? 1.1 : 1,
                },
                1024: {
                  slidesPerView: product.image.length > 1 ? 1.1 : 1,
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {product.image.map((img, i) => (
                <SwiperSlide
                  key={i}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    alt={img}
                    fill
                    src={img}
                    className="w-full h-full object-cover  max-w-full max-h-full "
                    sizes="100%"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div
            className={`w-[95%] left-2     flex justify-between  items-center absolute top-[50%]    z-10 ${product.image.length === 1 ? "hidden" : "flex"}`}
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

          {product.image.length > 1 && (
            <div className=" absolute bottom-[1%] w-full  flex items-center justify-center z-50     gap-1">
              {product.image.map((img, i) => (
                <div
                  onClick={() => {
                    swiperRef.current?.slideTo(i);
                  }}
                  key={i}
                  className={`w-[.5rem] h-[.5rem]  

                 
bg-neutral-700

            rounded-full  relative cursor-pointer overflow-hidden transition-all ${activeIndex === i && "bg-white"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center  p-5 flex-col lg:flex-row  lg:justify-between w-full  ">
        <div className="flex flex-col gap-4 w-full p-5 lg:w-[50%]">
          <h2 className="text-4xl lg:text-6xl font-semibold   ">
            {product.title}
          </h2>

          <div className="flex items-center gap-4 ">
            <p className=" text-2xl font-semibold ">
              Rs.{product.price.toLocaleString()}
            </p>

            {product.cutprice > product.price && (
              <sup className="font-mono text-lg line-through text-neutral-400">
                Rs.{product.cutprice.toLocaleString()}
              </sup>
            )}

            {product.cutprice > product.price && (
              <Badge className=" text-sm font-mono rounded-full text-green-700  bg-transparent ">
                {Math.round(
                  ((product.cutprice - product.price) / product.cutprice) * 100,
                )}
                % off
              </Badge>
            )}
          </div>

          <div className="flex fixed bottom-0 left-0 p-3 lg:relative  items-center w-full flex-col justify-center gap-4 ">
            <Link
              href="https://wa.me/923165575485?text=Hi%20I%20want%20to%20discuss%20a%20project"
  target="_blank"
  rel="noopener noreferrer"
  className="w-full"
            >
            <Button
              variant="default"
              className=" py-6 w-full text-sm text-white bg-blue-500 cursor-pointer hover:bg-blue-400  rounded-full    "
              >
              Contact on Whatsapp
            </Button>
              </Link>
          </div>
        </div>

        <div className="flex w-full lg:w-[50%]  h-full     flex-wrap gap-3">
          <div className="flex items-center gap-4 bg-[#f5f5f5] px-5 py-2 rounded-2xl">
            <Calendar className="text-black" />
            <div className="flex flex-col">
              <span className="text-neutral-600 text-sm">Year</span>
              <span className="text-neutral-800 font-bold text-lg">
                {product.year}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#f5f5f5] px-5 py-2 rounded-2xl">
            <Road className="text-neutral-800" />
            <div className="flex flex-col">
              <span className="text-neutral-700">KM's Driven</span>
              <span className="text-neutral-800 font-bold capitalize">
                {product.mileage}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#f5f5f5] px-5 py-2 rounded-2xl ">
            <Network className="text-neutral-800" />
            <div className="flex flex-col">
              <span className="text-neutral-700">Transmission</span>
              <span className="text-neutral-800 font-bold capitalize">
                {product.fuel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4  bg-[#f5f5f5] px-5 py-2 rounded-2xl">
            <Fuel className="text-neutral-800" />
            <div className="flex flex-col">
              <span className="text-neutral-700">Fuel Type</span>
              <span className="text-neutral-800 font-bold capitalize">
                {product.fuel}
              </span>
            </div>
          </div>
          <div
            className="flex flex-col gap-2 border bg-gray-50 hover:bg-gray-100 cursor-pointer lg:p-5 p-2  w-max rounded-4xl"
            onClick={() => {
              setLength(0);
              length === -1 ? setLength(200) : setLength(-1);
            }}
          >
            <h1 className="font-semibold text-lg lg:text-xl max-w-md">
              Description
            </h1>
            <p className="text-sm text-neutral-800 leading-6 w-full">
              {product.description.length > 200
                ? product.description.slice(0, length)
                : product.description}
              {product.description.length > 55 && (
                <Button variant="ghost" className="hover:bg-gray-200">
                  {length === -1 ? "...show less" : "...show more"}
                </Button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}

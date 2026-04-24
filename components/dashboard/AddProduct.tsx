"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ArrowLeft, ArrowLeftSquareIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

import { toast } from "sonner";
import { title } from "process";
import { Spinner } from "../ui/spinner";
import { categories } from "@/lib/constants";

interface ItineraryItem {
  day: number;
  title: string;
  activities: string;
}

export default function AddProduct() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<{
    title: string;
    price: string;
    description: string;
    category: string;
    cutprice: string;
    model: string;
    condition: string;
    year: string;
    mileage: string;
    fuel: string;
    trnasmission: string;
  }>({
    title: "",
    price: "",
    description: "",
    category: "",
    cutprice: "",
    model: "",
    condition: "",
    year: "",
    mileage: "",
    fuel: "",
    trnasmission: ""
  });

 

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !productInfo.title ||
      !productInfo.price ||
      !productInfo.description ||
      !productInfo.category ||
      !productInfo.model ||
      !productInfo.condition ||
      !productInfo.year ||
      !productInfo.mileage ||
      !productInfo.fuel || !productInfo.trnasmission
    ) {
      toast.error("Please fill in the required feild");
      return;
    }

    if (productInfo.cutprice) {
      if (
        productInfo.cutprice < productInfo.price ||
        productInfo.cutprice === productInfo.price
      ) {
        toast.error("Cut price can't be less or equal to price");
        return;
      }
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", productInfo.title);
    formData.append("description", productInfo.description);
    formData.append("price", productInfo.price);
    formData.append("cutprice", productInfo.cutprice);
    formData.append("category", productInfo.category);
    formData.append("model", productInfo.model);
    formData.append("condition", productInfo.condition);
    formData.append("year", productInfo.year);
    formData.append("mileage", productInfo.mileage);
    formData.append("fuel", productInfo.fuel);
    formData.append("trnasmission",productInfo.trnasmission)

    images.forEach((img) => {
      formData.append("images", img);

    });

    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
  

        body: formData,

      });
      if (!res.ok) {
        toast.error("Something went wrong");
        setLoading(false);
        return;
      }

      setProductInfo({
        title: "",
        price: "",
        cutprice: "",
        description: "",
        category: "",
        model: "",
        condition: "",
        year: "",
        mileage: "",
        fuel: "",
        trnasmission: ""
      });

      setPreviews([]);
      const fileInput = document.getElementById("img") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      toast.success("Product has been add successfully!");
    } catch (e) {
      toast.error("Failed to submit the product");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));

    setActiveIndex((prev) => {
      if (prev > index) prev - 1;
      if (prev === index) return Math.max(0, prev - 1);
      return prev;
    });

    setTimeout(() => {
      swiperRef.current?.slideTo(Math.max(0, index - 1));
    }, 0);
  };
  return (
    <div className="w-full bg-white p-5 rounded-3xl border">
      <div className="flex items-center  gap-4">
        <Button
          className="rounded-full "
          variant="secondary"
          size="icon-lg"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <h1 className="font-semibold text-2xl lg:text-4xl  ">Add</h1>
      </div>
      <div className="w-full  flex lg:flex-row flex-col-reverse ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-5 flex-[.5] "
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="capitalize p-2  text-md font-semibold"
            >
              Title
            </label>
            <Input
              placeholder="Enter the car name"
              id="name"
              required
              onChange={(e) =>
                setProductInfo({ ...productInfo, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="desc"
              className="capitalize p-2  text-md font-semibold"
            >
              Description
            </label>
            <Textarea
              placeholder="Enter description"
              id="desc"
              required
              onChange={(e) =>
                setProductInfo({ ...productInfo, description: e.target.value })
              }
            />
          </div>
          <div className="w-full flex gap-2 items-center flex-wrap flex-col   justify-center">
            <div className="flex items-center gap-4">
              <div className="flex flex-col flex-1 ">
                <label
                  htmlFor="price"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  price
                </label>
                <Input
                  placeholder="Enter the Price"
                  id="price"
                  type="number"
                  required
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, price: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col flex-1 ">
                <label
                  htmlFor="cutprice"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  cut price
                </label>
                <Input
                  placeholder="Enter the cut price"
                  id="cutprice"
                  type="number"
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, cutprice: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <label
                  htmlFor="model"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Model
                </label>
                <Input
                required
                  placeholder="Enter model"
                  id="model"
                  type="text"
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, model: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="condition"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Condition
                </label>
                <Select
                  required
                  onValueChange={(e) =>
                    setProductInfo({ ...productInfo, condition: e })
                  }
                >
                  <SelectTrigger className="flex-1" id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="new">New</SelectItem>

                      <SelectItem value="used">Used</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex flex-col">
                <label
                  htmlFor="year"

                  className="capitalize p-2  text-md font-semibold    "
                >
                  Year
                </label>
                <Input
                  placeholder="Enter Year"
                  type="number"
                  id="year"
                  onChange={(e) => {
                    setProductInfo({
                      ...productInfo,
                      year: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="mileage"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Mileage
                </label>
                <Input
                  placeholder="Enter mileage"
                  type="number"
                  id="mileage"
                  onChange={(e) => {
                    setProductInfo({
                      ...productInfo,
                      mileage: e.target.value,
                    });
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="fuel"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Fuel Type
                </label>
                <Select
                  required
                  onValueChange={(e) =>
                    setProductInfo({ ...productInfo, fuel: e })
                  }
                >
                  <SelectTrigger className="flex-1" id="fuel">
                    <SelectValue placeholder="Select Fuel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="petrol">Petrol</SelectItem>

                      <SelectItem value="diesel">Diesel</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="cat"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Select Category
                </label>
                <Select
                  required
                  onValueChange={(e) =>
                    setProductInfo({ ...productInfo, category: e })
                  }
                >
                  <SelectTrigger className="flex-1" id="cat">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map(
                        ({ id, title }: { id: number; title: string }) => (
                          <SelectItem
                            key={id}
                            value={title}
                            className="capitalize"
                          >
                            {title}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

     <div className="flex flex-col">
                <label
                  htmlFor="trans"
                  className="capitalize p-2  text-md font-semibold    "
                >
                  Transmission Type
                </label>
                <Select
                  required
                  onValueChange={(e) =>
                    setProductInfo({ ...productInfo, trnasmission: e })
                  }
                >
                  <SelectTrigger className="flex-1" id="trans">
                    <SelectValue placeholder="Select Transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="manual">Manual</SelectItem>

                      <SelectItem value="automatic">Automatic</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>

          <Button
           
            className={`${loading ? "bg-neutral-600" : "bg-black"} p-5 disabled:bg-neutral-700 `}
            disabled={!productInfo || loading}
          >
            {loading && <Spinner />}
            Add Product
          </Button>
        </form>

        <div onSubmit={handleSubmit} className=" flex-1 flex flex-col gap-2">
          <div className="w-full ">
            <h1 className="font-semibold text-2xl p-5 text-neutral-800 ">
              Add images
            </h1>

            <input
              type="file"
              className="hidden"
              id="img"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setImages((prev) => [...prev, ...files]);
                setPreviews((prev) => [
                  ...prev,
                  ...files.map((file) => URL.createObjectURL(file)),
                ]);
              }}
            />
          </div>
          <div
            className={`${images.length ? "w-full h-full relative bg-gray-50 rounded-2xl" : "hidden"}`}
          >
            <Swiper
              className="w-full h-full   min-w-0 "
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {previews.map((src, i) => {
                return (
                  <SwiperSlide
                    className="!w-full h-full flex items-center justify-center "
                    key={i}
                  >
                    <Image
                      src={src}
                      key={i}
                      alt={`Image${i}`}
                      height={50}
                      width={50}
                      className="w-full h-full object-contain max-w-full max-h-full rounded-xl"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="flex items-center gap-4 px-5">
              <label
                htmlFor="img"
                className={` ${images.length ? "w-[5rem]" : "w-full"}  bg-gray-50  border-neutral-200 rounded-xl  flex items-center justify-center gap-2 h-[5rem] w-[5rem]`}
              >
                <span className="font-bold text-4xl">+</span>
              </label>
            {previews.map((src, i) => {
              return (
                <div
                  className="h-[5rem] w-[5rem] relative "
                  onClick={() => swiperRef.current?.slideTo(i)}
                  key={i}
                >
                  <Button
                    variant="ghost"
                    className="cursor-pointer transition-all hover:bg-red-200 absolute top-0 right-0  text-red-500 hover:text-red-500 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(i);
                    }}
                  >
                    <Trash className="text-red-500 w-5 h-5  " />
                  </Button>
                  <Image
                    src={src}
                    alt={`Image${i}`}
                    height={50}
                    width={50}
                    className={`${activeIndex === i ? "border-2 border-blue-400 opacity-100" : "border-0 opacity-70"} h-full w-full object-cover rounded-md`}
                  />
                </div>
              );
            })}
          
          </div>
        </div>
      </div>
    </div>
  );
}

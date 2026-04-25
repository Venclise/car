"use client"
import ProductCard from '@/components/products/ProductCard'

import React, { useEffect, useRef, useState } from 'react'
import { A11y, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


type item = {
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

import type { Swiper as SwiperType } from "swiper";
import { Tag } from 'lucide-react';
import Link from 'next/link';

export default  function NewIn() {
const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [data,setData] = useState([])


    
const baseUrl =
process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'


useEffect(() => {

    async function fetchProducts() {
        const res = await fetch(`${baseUrl}/api/products?limit=4&sort=newest`,{cache:"no-store"})
        
            if(!res.ok) {
                throw new Error("Failed to fetch the products")
            }
        
            const data = await res.json()
        setData(data)
    }

    fetchProducts()

},[])



  return (
    <div className='  p-2 md:p-5 lg:p-10 space-y-8 h-max'>


   <h1 className='font-bold text-5xl lg:text-6xl text-neutral-800 max-w-xl'>
  Explore {" "}
  <span className='text-blue-500'>
   New in
  </span>
  </h1>
        <Swiper
          modules={[A11y, Pagination]}
          spaceBetween={5}
          speed={600}
          breakpoints={{
            0: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.1 },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
         
          <div className="flex items-center gap-8 justify-center w-full relative">

          
       {data.map((item:item) => {
           return (
               <SwiperSlide>
                <ProductCard key={item._id} data={item} />
                </SwiperSlide>
            )
        })}
      
          <SwiperSlide>
            <Link href="/products?sort=newest"  className='  p-5  gap-4 underline w-full bg-blue-500 text-white flex items-center rounded-sm justify-center'>

            <Tag />
            <span>Explore ALL</span>
            </Link>
          </SwiperSlide>
        </div>
            
        </Swiper>
      
      
        
    </div>
  )
}

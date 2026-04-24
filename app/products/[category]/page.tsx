import ProductCard from '@/components/products/ProductCard';
import { notFound } from 'next/navigation';
import React from 'react'

const slugToCategory = (slug: string) => {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
};

export default async function page({params}:{params:{category?:string}}) {


    const {category} = await params

    if(!category){
        notFound();
    }

    const formattedcategory = slugToCategory(category)

    const query = new URLSearchParams({
        category: formattedcategory
    })



      const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res  = await fetch(`${baseUrl}/api/products?${query.toString()}`,{cache:"no-store"})

    if(!res.ok) {
        throw Error("Failed to fetch Products")
    }

const data = await res.json()





  return (
    

             <div className=" p-5 lg:p-10 mt-12 h-max">
      <h1 className="text-xl lg:text-5xl p-5">
        Explore {" "}
        <span className='text-blue-500'>
        {formattedcategory}
        </span>
        </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 gap-y-30 md:gap-y-23 w-full py-10">
        {data.map((product: any) => (
          <ProductCard data={product} key={product._id} />
        ))}
      </div>
    </div>

  )
}

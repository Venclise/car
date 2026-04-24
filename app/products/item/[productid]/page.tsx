

import type { Metadata, ResolvingMetadata } from 'next'



type Props = {
  params: Promise<{ productid: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { productid } = await params
 

     const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"



    const res = await fetch(`${baseUrl}/api/products/${productid}`,{cache:"no-store"})
    if(!res.ok) {
      throw new Error("Failed to fetched the Product")
    }

    const product =  await res.json()
 

  return {
    title: product.title,
    description: product.description,
      openGraph: {
       images: [`${product.image[0]}`],
     },

  }
}



import RecommendProducts from "@/components/products/RecommendedProducts";
import SingleProduct from "@/components/products/singleProduct";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ productid: string }>;
}) {
  const { productid } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products/${productid}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch the product");
  }
  const product = await res.json();

  const recommendres = await fetch(
    `${baseUrl}/api/products/related?category=${product.category}&productId=${product._id}`,
  );

  if (!recommendres) {
    throw new Error("Failed to fetch the product");
  }

  const data = await recommendres.json();



  return (
    <div>
      <SingleProduct product={product} />

      {data.length > 0 && <RecommendProducts data={data} />}
    </div>
  );
}

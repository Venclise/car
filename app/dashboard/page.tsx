import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const baseUrl =
process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function page() {

    const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });

 
  if (!res.ok) {
    const errorText = await res.text(); 
    console.error("Fetch failed with status:", res.status, errorText);
    return <div>Failed to load products. Check server logs.</div>;
  }

  const data = await res.json();
  

  return (
    <div className='lg:p-10 p-5'>
        <h1 className='capitalize font-semibold text-3xl lg:text-4xl text-neutral-800 '>
      dashboard
        </h1>
<Link href="/dashboard/add">
<Button>    
    Add a Product
</Button>
</Link>


      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 gap-y-20 py-10">
        {data.map((item: any) => (
          <ProductCard key={item._id} data={item} />
        ))}
      </div>

    </div>
  )
}

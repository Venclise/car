import { Car } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Type() {
  return (
    <div className='flex flex-col gap-4 h-max gap-4 lg:p-10 p-5'>
   <h1 className='font-bold text-5xl lg:text-6xl text-neutral-800 max-w-xl'>
          Shop by
        </h1>  

        <div className='w-full flex items-center gap-4'>
               <Link href="/products?condition=new" className='bg-blue-500 h-[20vh] lg:h-[50vh] flex-1 flex-col  rounded-lg flex items-center justify-center'>
<Car   className='text-white size-7 lg:size-10'/>
<span className='text-white font-semibold text-2xl lg:text-4xl underline'>
     New 
</span>
               </Link>
                   <Link href="/products?condition=used" className='bg-black h-[20vh] lg:h-[50vh] flex-1 flex-col  rounded-lg flex items-center justify-center'>
<Car   className='text-white size-7 lg:size-10'/>
<span className='text-white font-semibold text-2xl lg:text-4xl underline'>
     Used 
</span>
               </Link>
            </div>       
    </div>
  )
}

import { Car, MessageCircle, ThumbsUp, UserCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Why() {
  return (
    <div className='lg:p-10 p-5 flex items-center lg:flex-row flex-col w-full h-max' id="why">
        <div className='flex flex-col gap-4 lg:flex-1 w-full '>
               <h1 className='font-bold text-5xl lg:text-6xl text-neutral-800 max-w-xl'>
            Why Choose {" "}
            <span className='text-blue-500'>
             CarHub
            </span>
        </h1>
      <p className='lg:text-sm text-xs text-neutral-800 max-w-lg'>
         We are dedicated to providing a seamless car-buying experience with exceptional customer service. With a wide range of high-quality vehicles, we ensure reliability and affordability for every customer. Our transparent process, expert guidance, and commitment to excellence make your dream car easily accessible. With years of industry experience and a trusted reputation, CarHub is your go-to destination for finding the perfect vehicle. Your satisfaction is our priority, and we go the extra mile to meet your needs. Choose CarHub for quality, trust, and unmatched value!
      </p>
      <div className='grid grid-cols-2 w-max gap-4'>
           <div className='bg-gray-100 w-max flex items-center p-2 rounded-md gap-4'><Car  className='text-blue-500'/> 
           <div className='flex flex-col '>
            <span className=' text-sm text-neutral-700'>

Vehicles in stocks
            </span>
            <span className='text-blue-500 font-semibold'>

           600+
            </span>
           </div>
           </div>
               <div className='bg-gray-100 w-max flex items-center p-2 rounded-md gap-4'><MessageCircle  className='text-blue-500'/> 
           <div className='flex flex-col '>
            <span className=' text-sm text-neutral-700'>

Customer Reviews            </span>
            <span className='text-blue-500 font-semibold'>

           2000+
            </span>
           </div>
           </div>

                     <div className='bg-gray-100 w-max flex items-center p-2 rounded-md gap-4'><UserCircle  className='text-blue-500'/> 
           <div className='flex flex-col '>
            <span className=' text-sm text-neutral-700'>

Happy Customers           </span>
            <span className='text-blue-500 font-semibold'>

        2500+
            </span>
           </div>
           </div>
           
                     <div className='bg-gray-100 w-max flex items-center p-2 rounded-md gap-4'><ThumbsUp  className='text-blue-500'/> 
           <div className='flex flex-col '>
            <span className=' text-sm text-neutral-700'>

Years of Experince           </span>
            <span className='text-blue-500 font-semibold'>

        20+
            </span>
           </div>
           </div>
      </div>
        </div>

            
        <div className='w-full lg:flex-1 h-screen   relative'  >
                <Image alt="Car" src="/hero-bg.png" fill className='w-full h-full object-cover' />
                <Image alt="Car" src="/hero.png" fill className='w-full h-full object-contain' />
        </div>
    </div>
  )
}

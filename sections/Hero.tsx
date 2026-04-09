import Image from 'next/image'
import bg from "@/public/hero-bg.png"

export default function Hero() {
  return (
    <div className='h-max  w-full py-10 px-5 lg:p-10 flex items-center lg:flex-row flex-col  '>
      <div className=' flex-1 flex flex-col gap-4'>
        <h1 className='font-bold text-5xl lg:text-6xl text-neutral-800 max-w-xl'>
            Your Trusted Partner For Quality Vehicles
        </h1>
<p className='text-neutral-800 text-sm'>Lorem ipsum dolor sit amet consectetur.</p>
<div className='flex gap-2 items-center'>
  <button className='bg-blue-500 px-4 p-2 text-sm rounded-full text-white'>Explore Cars</button>
  <button className='bg-neutral-300 px-4 p-2 text-sm rounded-full text-neutral-800'>Learn more</button>

</div>
      </div>
    
    
<div className='flex-1 h-full  relative'  >
        <Image alt="Car" src="/hero-bg.png" fill className='w-full h-full object-cover' />
        <Image alt="Car" src="/hero.png" fill className='w-full h-full object-contain' />
</div>
   
 
    </div>
  )
}

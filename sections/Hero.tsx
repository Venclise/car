import Image from 'next/image'
import bg from "@/public/hero-bg.png"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Car } from 'lucide-react'

export default function Hero() {
  return (
    <div className='md:h-screen h-[120vh] gap-12  w-full py-10 px-5 lg:p-10 flex items-center lg:flex-row flex-col  '>
      <div className='  flex flex-col gap-4'>
        <h1 className='font-bold text-5xl lg:text-6xl text-neutral-800 max-w-xl'>
            Your Trusted Partner For Quality Vehicles
        </h1>

<div className='flex gap-2 items-center'>
  <Link href="/products">
  
  <Button className='bg-blue-500 flex items-center gap-2 cursor-pointer hover:bg-blue-400  text-sm rounded-full text-white'>
<Car />
    Explore Cars</Button>
  </Link>
  <Link href="/#why">
  <Button size="lg" variant="secondary" className='  cursor-pointer text-sm rounded-full '>Learn more</Button>
  </Link>

</div>
      </div>
    
    
<div className='w-full lg:flex-1 h-full  relative'  >
        <Image alt="Car" src="/hero-bg.png" fill className='w-full h-full object-cover' />
        <Image alt="Car" src="/hero.png" fill className='w-full h-full object-contain' />
</div>
   
 
    </div>
  )
}

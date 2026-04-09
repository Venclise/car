import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='w-full h-[2.5rem] p-5 lg:p-10'>
      <Link href="/">
      <Image alt="Logo" src="/logo.svg" height={50} width={100} />
      </Link>
    </div>
  )
}

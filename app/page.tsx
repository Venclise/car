import Categories from '@/sections/Categories'
import Hero from '@/sections/Hero'
import NewIn from '@/sections/NewIn'
import Type from '@/sections/Type'
import Why from '@/sections/Why'
import React from 'react'

export default function page() {
  return (
    <div className=''>
      <Hero />
      <Categories />
      <NewIn />
      <Type />
      <Why />
    </div>
  )
}

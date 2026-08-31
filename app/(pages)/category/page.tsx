import { getCategories } from '@/app/lib/api/posts'
import React from 'react'

const page = async () => {
    const categories = await getCategories()
    console.log(categories)
  return (
    <div>page</div>
  )
}

export default page
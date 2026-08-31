import { getCategories } from '@/app/lib/api/posts'
import { useParams } from 'next/navigation'
import React from 'react'
const page = async () => {   
  const {slug} = useParams()
  return (
    <div>page categor slug:{slug}</div>
  )
}
export default page
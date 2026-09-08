import { formatDate } from '@/app/lib/utils/formatDate'
import { NewsComments } from '@/app/types/news'
import React from 'react'
import { FaRegComment, FaRegCalendar } from 'react-icons/fa'

type NewsMetaProps = {
  news: NewsComments
}
const NewsMeta = ({ news }: NewsMetaProps) => {
  return (
    <div className="flex items-center gap-4  text-muted !font-[24px]">  
        <div className="flex items-center gap-1.5">
          <FaRegComment className="text-muted !font-[24px] " />
          <span>{news.comments}</span>
        </div>      
    </div>
  )
}
export default NewsMeta
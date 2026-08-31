import { formatDate } from '@/app/lib/utils/formatDate'
import { NewsComments } from '@/app/types/news'
import React from 'react'
import { FaRegComment, FaRegCalendar } from 'react-icons/fa'

type NewsMetaProps = {
  news: NewsComments
}

const NewsMeta = ({ news }: NewsMetaProps) => {
  return (
    <div className="flex items-center gap-4 text-xs text-gray-500">
      <div className="flex items-center gap-1.5">
        <FaRegCalendar className="text-gray-400" />
        <span>{formatDate(news.date)}</span>
      </div>      
      {news.comments !== undefined && (
        <div className="flex items-center gap-1.5">
          <FaRegComment className="text-gray-400" />
          <span>({news.comments})</span>
        </div>
      )}
    </div>
  )
}
export default NewsMeta
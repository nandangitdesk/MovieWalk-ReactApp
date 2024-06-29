import React from 'react'
import { Link } from 'react-router-dom'
// import Dropdown from './Dropdown'
import noimage from "/no-image.webp"

const HorizontalCards = ({ data }) => {
  return (
    <div className='w-full p-5'>
      
      <div className='w-full h-full flex overflow-x-auto scrollbar-hide'>
        {data.length > 0 ? data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`}  key={i} className='w-56  mr-2 flex-shrink-0 bg-zinc-900'>
            <div className='w-full  h-36'>
              <img 
                className='h-full w-full object-cover' 
                src={d.backdrop_path || d.profile_path ?`https://image.tmdb.org/t/p/w300/${d.backdrop_path || d.profile_path}`:noimage} 
                alt={d.original_title || d.name || d.title || d.original_name} 
              />
            </div>
            <div className='text-white p-3'>
              <h1 className='text-xl font-semibold'>
                {d.original_title || d.name || d.title || d.original_name}
              </h1>
              <p className='text-sm mt-2 text-zinc-400'>
                {d.overview.slice(0, 50)} ...<span className='text-zinc-300'>more</span>
              </p>
            </div>
          </Link>
        )):<h1 className='text-3xl mt-5 font-bold text-center text-zinc-300 '>Nothing to Show</h1>}
      </div>
    </div>
  )
}

export default HorizontalCards

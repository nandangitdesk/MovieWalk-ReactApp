import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "/no-image.webp"

const Cards = ({data,title}) => {
  // console.log(title);
  return (
    <div className='w-full flex items-center justify-between flex-wrap  mt-10 bg-[#1f1e24] px-[3%]'>
    {data.map((card,index)=>(
            <Link to={`/${card.media_type || title}/details/${card.id}`}  key={index} className='relative w-56 h-84 mr-5 mb-10 '>
            <div className='h-[80%] w-full '>
                <img className='h-full w-full object-cover' src={card.poster_path || card.backdrop_path || card.profile_path ? `https://image.tmdb.org/t/p/original/${card.poster_path || card.backdrop_path || card.profile_path}`:noimage} alt="" />
            </div>
            <h1 className='mt-2 text-lg text-zinc-300 font-semibold'>{card.original_title || card.name || card.title || card.original_name}</h1>
           {card.vote_average && ( <div className='absolute h-16 w-16 bg-zinc-200 flex items-center justify-center rounded-full font-bold text-sm right-[-10%] top-[10%]'>🤩{((card.vote_average)*10).toFixed()}%</div>)}
           </Link>
    ))}

    </div>
  )
}

export default Cards
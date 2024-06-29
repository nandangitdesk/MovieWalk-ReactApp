import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from './NotFound'

const Trailer = () => {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const category = pathname.includes("movie") ? "movie" : "tv"
  const ytVideo = useSelector((state)=>state[category].info.videos)
  return  (
    <div className='bg-[rgba(0,0,0,.9)]  absolute top-0 left-0 z-10 h-screen w-screen flex items-center justify-center'>
       <Link onClick={()=> navigate(-1)} className="ri-close-fill absolute right-[5%] top-[5%] text-zinc-200 text-3xl hover:text-[#6556CD]"></Link>
       {ytVideo ? ( <ReactPlayer controls height={620} width={1200} url={`https://www.youtube.com/watch?v=${ytVideo.key}`} />):(<NotFound/>)}
    </div>
  )
}

export default Trailer
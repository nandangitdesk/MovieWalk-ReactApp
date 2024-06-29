
import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {


  return (
    <div className='w-[20%] h-full border-r-[.5px] border-zinc-400 p-10 '>
        <h1>
        <i className="ri-tv-fill text-[#6556CD] text-2xl mr-2"></i>
        <span className='text-2xl font-bold text-white'>MOVIEWALK.</span>
        </h1>
        <nav className='flex flex-col text-lg text-zinc-400 gap-2'>
        <h1 className='mt-10 text-xl font-semibold text-white mb-5 '>New Feeds </h1>
            <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white p-3 duration-300 rounded-lg'><i className="ri-fire-fill mr-2"></i>Trending</Link>
            <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white p-3 duration-300 rounded-lg'><i className="ri-bard-fill mr-2"></i>Popular</Link>
            <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white p-3 duration-300 rounded-lg'><i className="ri-movie-2-fill mr-2"></i>Movies</Link>
            <Link to="/tv" className='hover:bg-[#6556CD] hover:text-white p-3 duration-300 rounded-lg'><i className="ri-tv-2-fill mr-2"></i>Tv Shows</Link>
            <Link to="/person" className='hover:bg-[#6556CD] hover:text-white p-3 duration-300 rounded-lg'><i className="ri-team-fill mr-2"></i>People</Link>
        </nav>      
        <hr  className='border-none h-[.5px] mt-5 bg-zinc-400'/>
        <nav className='flex flex-col text-lg text-zinc-400 gap-2'>
        <h1 className='mt-5 text-xl font-semibold text-white mb-5 '>Website Information </h1>
            <Link className='hover:bg-[#6556CD] hover:text-white p-3 duration-300 rounded-lg'><i className="ri-information-fill mr-2"></i>About MovieWalk</Link>
            <Link className='hover:bg-[#6556CD] hover:text-white p-3 duration-300 rounded-lg'><i className="ri-phone-fill mr-2"></i>Contact Us</Link>
           
        </nav>
    </div>
  )
}

export default SideNav
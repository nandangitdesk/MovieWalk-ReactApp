import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/Axios'
import noimage from "/no-image.webp"


const TopNav = ({className}) => {
   
    const [query, setQuery] = useState("")
    const [searches, setSearches] = useState([])
    
   const getSearches = async()=>{
    try {
      const {data} = await axios.get(`/search/multi?query=${query}`)
      setSearches(data.results)
      // console.log(data.results);
    } catch (error) {
      console.log(error);
    }
 }

useEffect(()=>{
  getSearches()
},[query])

     
  return (
    <div className='w-full z-10  h-[10vh]  relative flex justify-start pl-[15%] items-center '>
        <i className=" text-zinc-400 text-3xl ri-search-line"></i>
        <input onChange={(e)=> setQuery(e.target.value)} value={query} className='  w-[50%] mx-10 p-4 text-xl text-zinc-200 outline-none border-none bg-transparent' type="text" placeholder='Search anything..' />
        {query.length > 0 && (<i onClick={()=>setQuery("")} className="text-zinc-400 text-3xl   ri-close-line"></i>)}
        

        <div className={`w-[45%]  absolute bg-zinc-200 max-h-[50vh] top-[100%] left-[20%] overflow-auto ${className}`}>
          {searches.map((search,index)=>(
              <Link to={`/${search.media_type}/details/${search.id}`} key={index} className='w-full flex text-zinc-600 font-semibold hover:bg-zinc-300 duration-300 hover:text-zinc-900 justify-start items-center p-5  border-b-2 border-zinc-100'>
              <img className='h-[10vh] w-[10vh] mr-2 object-cover shadow-md' src={search.backdrop_path || search.profile_path ? `https://image.tmdb.org/t/p/original/${search.backdrop_path || search.profile_path}` : noimage} alt="" />
              <span>{search.original_title || search.name || search.title || search.original_name}</span>
            </Link>
          ))}
        </div>
    </div> 
  )
}

export default TopNav
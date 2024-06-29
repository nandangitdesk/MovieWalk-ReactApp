import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from './partials/TopNav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'
import axios from '../../src/utils/Axios'
import Loading from './partials/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const Trending = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("all")
    const [duration, setDuration] = useState("day")
    const [trending, setTrending] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
     document.title="MovieWalk | Trending "  + category

    const getTrending = async()=>{
        try {
          const {data} = await axios.get(`/trending/${category}/${duration}?page=${page}`)
          if (data.results.length > 0) {
            setTrending((prev)=> [...prev , ...data.results])
            setPage(page + 1)
          }else{
            sethasMore(false)
          }
        } catch (error) {
          console.log("Error : ",error);
        }
     }

     const refreshHandler = ()=>{
      if (trending.length === 0) {
        getTrending()
      } else {
        setPage(1)
        setTrending([])
        getTrending()
      }
     }
     
    useEffect(() => {
      refreshHandler()
    }, [category,duration])
    

  return trending.length > 0 ? (
    <div className='w-screen h-screen  '>
       <nav className='flex items-center justify-between px-[3%]'>
          <h1 className='text-2xl font-semibold text-zinc-400'><i onClick={()=> navigate(-1)} className="ri-arrow-left-s-line hover:text-[#6556CD]"></i> Trending</h1>
          <div className='flex items-center  w-[80%] gap-5'>
            <TopNav className={"left-[30%]"}/>
            <Dropdown title={"Category"} options={["all","tv","movie"]} func={(e)=>setCategory(e.target.value)}/>
            <Dropdown title={"Duration"} options={["week","day"]} func={(e)=>setDuration(e.target.value)}/>
          </div>
       </nav>
        <InfiniteScroll 
        dataLength={trending.length} 
        next={getTrending} 
        hasMore={hasMore} 
        loader={<Loading/>}>
            
        <Cards data={trending} title="all"/>
        </InfiniteScroll>
    </div>
  ): <Loading/>
}

export default Trending
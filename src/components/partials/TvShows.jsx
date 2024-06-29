import axios from '../../utils/Axios'
import  { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import Cards from './Cards'
import Dropdown from './Dropdown'
import TopNav from './TopNav'

const TvShows = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("airing_today")
    const [tv, setTv] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title="MovieWalk | Tv Shows "

   
    const getTv = async()=>{
        try {
          const {data} = await axios.get(`/tv/${category}?page=${page}`)
          if (data.results.length > 0) {
            setTv((prev)=> [...prev , ...data.results])
            setPage(page + 1)
          }else{
            sethasMore(false)
          }
        } catch (error) {
          console.log("Error : ",error);
        }
     }


     const refreshHandler = ()=>{
        if (tv.length === 0) {
          getTv()
        } else {
          setPage(1)
          setTv([])
          getTv()
        }
       }

       useEffect(() => {
        refreshHandler()
      }, [category])

   return tv.length > 0 ? (
        <div className='w-screen h-screen  '>
           <nav className='flex items-center justify-between px-[3%]'>
              <h1 className='text-2xl font-semibold text-zinc-400'><i onClick={()=> navigate(-1)} className="ri-arrow-left-s-line hover:text-[#6556CD]"></i> TvShows<small className='text-sm text-zinc-600 ml-2'>({category})</small></h1>
              <div className='flex items-center  w-[80%] gap-5'>
                <TopNav className={"left-[25%]"}/>
                <Dropdown title={"Category"} options={["popular","top_rated","on_the_air","airing_today"]} func={(e)=>setCategory(e.target.value)}/>
                
              </div>
           </nav>
            <InfiniteScroll 
            dataLength={tv.length} 
            next={getTv} 
            hasMore={hasMore} 
            loader={<Loading/>}>
                
            <Cards data={tv} title="tv"/>
            </InfiniteScroll>
        </div>
      ): <Loading/>
}

export default TvShows
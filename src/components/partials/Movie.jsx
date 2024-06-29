import axios from '../../utils/Axios'
import  { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import Cards from './Cards'
import Dropdown from './Dropdown'
import TopNav from './TopNav'

const Movie = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("now_playing")
    const [movie, setMovie] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title="MovieWalk | Movie "

    const getMovie = async()=>{
        try {
          const {data} = await axios.get(`/movie/${category}?page=${page}`)
          if (data.results.length > 0) {
            setMovie((prev)=> [...prev , ...data.results])
            setPage(page + 1)
            // console.log(data);
          }else{
            sethasMore(false)
          }
        } catch (error) {
          console.log("Error : ",error);
        }
     }

     const refreshHandler = ()=>{
        if (movie.length === 0) {
          getMovie()
        } else {
          setPage(1)
          setMovie([])
          getMovie()
        }
       }
       
      useEffect(() => {
        refreshHandler()
      }, [category])

      return movie.length > 0 ? (
        <div className='w-screen h-screen  '>
           <nav className='flex items-center justify-between px-[3%]'>
              <h1 className='text-2xl font-semibold text-zinc-400'><i onClick={()=> navigate(-1)} className="ri-arrow-left-s-line hover:text-[#6556CD]"></i> Movies<small className='text-sm text-zinc-600 ml-2'>({category})</small></h1>
              <div className='flex items-center  w-[80%] gap-5'>
                <TopNav className={"left-[25%]"}/>
                <Dropdown title={"Category"} options={["popular","top_rated","upcoming","now_playing"]} func={(e)=>setCategory(e.target.value)}/>
                
              </div>
           </nav>
            <InfiniteScroll 
            dataLength={movie.length} 
            next={getMovie} 
            hasMore={hasMore} 
            loader={<Loading/>}>
                
            <Cards data={movie} title="movie"/>
            </InfiniteScroll>
        </div>
      ): <Loading/>
}

export default Movie
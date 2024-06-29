import axios from '../../utils/Axios'
import  { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import Cards from './Cards'
import Dropdown from './Dropdown'
import TopNav from './TopNav'

const Popular = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("movie")
    const [popular, setPopular] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title="MovieWalk | Popular "  + category


    const getPopular = async()=>{
        try {
          const {data} = await axios.get(`${category}/popular?page=${page}`)
          if (data.results.length > 0) {
            setPopular((prev)=> [...prev , ...data.results])
            setPage(page + 1)
          }else{
            sethasMore(false)
          }
        } catch (error) {
          console.log("Error : ",error);
        }
     }


     const refreshHandler = ()=>{
        if (popular.length === 0) {
          getPopular()
        } else {
          setPage(1)
          setPopular([])
          getPopular()
        }
       }
       
      useEffect(() => {
        refreshHandler()
      }, [category])

      return popular.length > 0 ? (
        <div className='w-screen h-screen  '>
           <nav className='flex items-center justify-between px-[3%]'>
              <h1 className='text-2xl font-semibold text-zinc-400'><i onClick={()=> navigate(-1)} className="ri-arrow-left-s-line hover:text-[#6556CD]"></i> Popular</h1>
              <div className='flex items-center  w-[80%] gap-5'>
                <TopNav className={"left-[25%]"}/>
                <Dropdown title={"Category"} options={["tv","movie"]} func={(e)=>setCategory(e.target.value)}/>
                
              </div>
           </nav>
            <InfiniteScroll 
            dataLength={popular.length} 
            next={getPopular} 
            hasMore={hasMore} 
            loader={<Loading/>}>
                
            <Cards data={popular}/>
            </InfiniteScroll>
        </div>
      ): <Loading/>
}

export default Popular
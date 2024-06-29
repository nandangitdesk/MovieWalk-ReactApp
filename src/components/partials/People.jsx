import axios from '../../utils/Axios'
import  { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import Cards from './Cards'
import TopNav from './TopNav'

const People = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState("popular")
    const [person, setPerson] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title="MovieWalk | People "

    const getPerson = async()=>{
        try {
          const {data} = await axios.get(`/person/${category}?page=${page}`)
          if (data.results.length > 0) {
            setPerson((prev)=> [...prev , ...data.results])
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
        if (person.length === 0) {
          getPerson()
        } else {
          setPage(1)
          setPerson([])
          getPerson()
          
        }
       }

       useEffect(() => {
        refreshHandler()
      }, [category])


      return person.length > 0 ? (
        <div className='w-screen h-screen  '>
           <nav className='flex items-center justify-between px-[3%]'>
              <h1 className='text-2xl font-semibold text-zinc-400'><i onClick={()=> navigate(-1)} className="ri-arrow-left-s-line hover:text-[#6556CD]"></i> People<small className='text-sm text-zinc-600 ml-2'>({category})</small></h1>
              <div className='flex items-center  w-[80%] gap-5'>
                <TopNav className={"left-[25%]"}/>
                
                
              </div>
           </nav>
            <InfiniteScroll 
            dataLength={person.length} 
            next={getPerson} 
            hasMore={hasMore} 
            loader={<Loading/>}>
                
            <Cards data={person} title="person"/>
            </InfiniteScroll>
        </div>
      ): <Loading/>
}

export default People
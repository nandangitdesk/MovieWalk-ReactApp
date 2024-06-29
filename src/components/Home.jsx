import React, { useEffect, useState } from 'react'
import SideNav from './partials/SideNav'
import TopNav from './partials/TopNav'
import axios from '../utils/Axios'
import Header from './partials/Header'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from './partials/Dropdown'
import Loading from './partials/Loading'

const Home = () => {
    document.title="MovieWalk | Homepage"
    const [wallpaper, setWallpaper] = useState(null)
    const [trending, setTrending] = useState(null)
    const [category, setCategory] = useState("all")
  
    const getWallpaper = async()=>{
      try {
        const {data} = await axios.get(`/trending/all/day`)
        let randomData = data.results[(Math.random()*data.results.length).toFixed()]
        setWallpaper(randomData)
      } catch (error) {
        console.log("Error : ",error);
      }
   }
    
  //  console.log(wallpaper); 

  const getTrending = async()=>{
    try {
      const {data} = await axios.get(`/trending/${category}/day`)
      setTrending(data.results)
    } catch (error) {
      console.log("Error : ",error);
    }
 }
 
// console.log(trending);

   useEffect(()=>{
      !wallpaper && getWallpaper()
       getTrending()
   },[category])


  return wallpaper && trending ? (
    <>
     <SideNav/>
     <div className='w-[80%] h-full overflow-auto '>
      <TopNav/>
      <Header  data={wallpaper} />

      <div className=' flex justify-between p-5'>
        <h1 className='text-3xl font-semibold text-zinc-400'>
          Trending<i className="ri-bard-fill ml-2 text-lg"></i>
        </h1>
        <Dropdown title={"Filter"} options={["all","tv","movie"]} func={(e)=>setCategory(e.target.value)}/>
      </div>

      <HorizontalCards data={trending}/>
     </div>
    </>
  ): <Loading/>
}

export default Home
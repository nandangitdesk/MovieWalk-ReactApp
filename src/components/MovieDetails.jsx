import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncLoadMovie, removeMovie } from "../actions/movieActions";
import Loading from "./partials/Loading";
import HorizontalCards from "./partials/HorizontalCards"

const MovieDetails = () => {
  const {pathname} = useLocation()
  const navigate =  useNavigate()
  const { id } = useParams();
  const {info} = useSelector((state)=>state.movie)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [dispatch,id]);



  return info ? (
  <div style={{background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.9)) , url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})` , backgroundPosition:"top 10%" , backgroundSize:"cover" , backgroundRepeat:"no-repeat"}} className="h-screen relative w-screen overflow-hidden overflow-y-auto">
    <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl p-10">
    <Link onClick={()=> navigate(-1)} className="ri-arrow-left-s-line hover:text-[#6556CD]"></Link>
    <a target="_blank" href={info.detail.homepage}><i className="ri-external-link-fill"></i></a>
    <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}><i className="ri-earth-fill"></i></a>
    <a target="_blank" href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}>imdb</a>
    </nav>
    
    <div className=' w-full  px-10 flex '>
      <img className='h-[70vh]  w-80 object-cover' src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path }`} alt="" />
      <div className="ml-10 text-5xl flex flex-col font-extrabold text-white ">
        <div className="flex">
          <h1>{info.detail.original_title || info.detail.name || info.detail.title || info.detail.original_name}</h1>
          <small className="text-2xl ml-2 text-zinc-200 font-bold">({info.detail.release_date.split("-")[0]})</small>
        </div>
        <div className="my-2 ">
            <h1 className="text-sm font-medium text-zinc-200">{info.detail.tagline}</h1>
        </div>
        <div className="mt-2 flex items-center gap-5 text-sm font-normal">
           <div className='h-16  w-16 bg-white text-black flex items-center justify-center rounded-full font-bold  '>🤩{((info.detail.vote_average)*10).toFixed()}%</div>
           <h1 >User <br /> Score </h1>
           <span className="font-extralight text-lg">|</span>
           <h1>{info.detail.release_date}</h1>
           <span className="font-extralight text-lg">|</span>
           {info.detail.genres.map((g,i)=><h1 className=" flex gap-1 px-2 py-1 bg-white rounded-full border-none text-black" key={i}>{g.name}</h1>)}
           <span className="font-extralight text-lg">|</span>
           <h1 >{info.detail.runtime} min</h1>
        </div>
        
        <h1 className="text-xl font-medium mt-10">Overview</h1>
        <p className="font-normal text-sm w-[70%] mt-2">{info.detail.overview}</p>
   
        <h1 className="text-xl font-medium mt-3">Movie Translated</h1>
        <p className="font-normal text-sm w-[70%] mt-2">{info.translations.join(", ")}</p>

        <div>
        <Link to={`${pathname}/trailer`} className="p-3 bg-[#6556CD]  rounded-md text-white text-sm font-medium "><i className="ri-play-fill"></i> Play Trailer</Link>
        </div>

    </div>

     </div>

    {/* part 3 available platform*/ }

 <div className="w-[80%] mt-16 pb-10">
 <div className="w-full px-10 ">
       {info.watchProviders && info.watchProviders.flatrate && (
        <div className="flex gap-10">
        <h1 className="text-white font-semibold text-md">Available on Platforms</h1>
        {info.watchProviders.flatrate.map((data,index)=>(
          <img key={index} title={data.provider_name} className="h-[5vh] w-[5vh] object-cover rounded" src={`https://image.tmdb.org/t/p/original/${data.logo_path}`}alt="" />
        ))}
       </div>
       )}
    </div>

    <div className="w-full px-10 mt-5">
       {info.watchProviders && info.watchProviders.buy && (
        <div className="flex gap-10">
        <h1 className="text-white font-semibold text-md">Available to Buy</h1>
        {info.watchProviders.buy.map((data,index)=>(
          <img key={index} title={data.provider_name} className="h-[5vh] w-[5vh] object-cover rounded" src={`https://image.tmdb.org/t/p/original/${data.logo_path}`}alt="" />
        ))}
       </div>
       )}
    </div>

    <div className="w-full px-10 mt-5">
       {info.watchProviders && info.watchProviders.rent && (
        <div className="flex gap-5">
        <h1 className="text-white font-semibold text-md">Available on Rent</h1>
        {info.watchProviders.rent.map((data,index)=>(
          <img key={index} title={data.provider_name} className="h-[5vh] w-[5vh] object-cover rounded" src={`https://image.tmdb.org/t/p/original/${data.logo_path}`}alt="" />
        ))}
       </div>
       )}
    </div>
 </div>
     
     <hr  className="mt-10 mb-5 w-[97%] border-none h-[1px] bg-zinc-300 m-auto"/>
     <h1 className="font-semibold text-2xl text-white px-5">Recommendations & similar content <i className="ri-bard-fill mr-2"></i></h1>
    <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar}/>
    <Outlet/>
  </div>
  ):<Loading/>
};

export default MovieDetails;

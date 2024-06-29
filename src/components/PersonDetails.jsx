import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncLoadPerson, removePerson } from "../actions/personActions";
import Loading from "./partials/Loading";
import HorizontalCards from "./partials/HorizontalCards"
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  
  const {pathname} = useLocation()
  const navigate =  useNavigate()
  const { id } = useParams();
  const {info} = useSelector((state)=>state.person)
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie")

  console.log(info);
  useEffect(() => {
    dispatch(asyncLoadPerson(id));
    return () => {
      dispatch(removePerson());
    };
  }, [dispatch,id]);

  return info ? (
    <div className="w-screen h-screen overflow-hidden pb-10 overflow-y-auto px-10">
     <nav className="w-full h-[10vh] text-zinc-100  text-xl p-10">
        <Link onClick={()=> navigate(-1)} className="ri-arrow-left-s-line hover:text-[#6556CD]"></Link>
    </nav>
     <div className="flex w-full px-10">
     <div className="w-[20%] ">
    <img className='h-[60vh]  w-80 object-cover' src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path }`} alt="" />
    <hr  className="mt-5 mb-5 w-full border-none h-[1px] bg-zinc-400"/>
    <div className="flex gap-10 text-zinc-200 text-2xl">
    <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}><i className="ri-earth-fill"></i></a>
    <a target="_blank" href={`https://www.facebook.com/${info.externalId.facebook_id}/`}><i className="ri-facebook-circle-fill"></i></a>
    <a target="_blank" href={`https://www.instagram.com/${info.externalId.instagram_id}/`}><i className="ri-instagram-fill"></i></a>
    <a target="_blank" href={`https://twitter.com/${info.externalId.twitter_id}/`}><i className="ri-twitter-x-fill"></i></a>
    </div>
    <h1 className="text-lg mt-3 text-zinc-400 font-semibold">Known For</h1>
    <h1 className="text-sm text-zinc-400 font-semibold">{info.detail.known_for_department}</h1>

    <h1 className="text-lg mt-3 text-zinc-400 font-semibold">Gender</h1>
    <h1 className="text-sm text-zinc-400 font-semibold">{info.detail.gender=== 1 ? "Female" :"Male"}</h1>

    <h1 className="text-lg mt-3 text-zinc-400 font-semibold">Birthday</h1>
    <h1 className="text-sm text-zinc-400 font-semibold">{info.detail.birthday}</h1>

    <h1 className="text-lg mt-3 text-zinc-400 font-semibold">Deathday</h1>
    <h1 className="text-sm text-zinc-400 font-semibold">{info.detail.deathday ? info.detail.deathday: "Still Alive"}</h1>

    <h1 className="text-lg mt-3 text-zinc-400 font-semibold">Also Known as</h1>
    <h1 className="text-sm text-zinc-400 font-semibold">{info.detail.also_known_as.join(", ")}</h1>

    <h1 className="text-lg mt-3 text-zinc-400 font-semibold">Place of birth</h1>
    <h1 className="text-sm text-zinc-400 font-semibold">{info.detail.place_of_birth}</h1>

    </div>

    <div className="w-[80%] px-10">
         <h1 className="text-5xl font-extrabold ml-5  text-zinc-400">{info.detail.name}</h1>
         <h1 className="mt-3 text-2xl text-zinc-500 ml-5 font-semibold">Biography</h1>
         <p className="mt-2 text-zinc-500 w-[80%] ml-5">{info.detail.biography}</p>
         <h1 className="mt-3 text-zinc-500 font-bold text-3xl ml-5">Also Known For</h1>
         <HorizontalCards data={info.combinedCredits.cast}/>
         <div className="w-full flex justify-between">
                 <h1 className="mt-3 text-2xl text-zinc-500 ml-5 font-semibold">Acting</h1>
                 <Dropdown title={"Category"} options={["tv","movie"]} func={(e)=>setCategory(e.target.value)}/>
          </div>
          
         <div className="w-full list-disc p-5 flex flex-col gap-2  h-[60vh] bg-zinc-800 mt-5 overflow-hidden overflow-y-auto ">
          {info[category + "Credits"].cast.map((m,i)=>(
               <li key={i} className="hover:text-white duration-800 hover:bg-zinc-900 p-5 duration-300  cursor-pointer">
               <Link to={`/${category}/details/${m.id}`} >
               <span className="text-zinc-300 hover:text-white duration-300">{m.original_title || m.name || m.title || m.original_name}</span>
               <span className="block ml-6 text-zinc-400">{m.character && `Character : ${m.character}`}</span>
               </Link>
             </li>
          ))}
         </div>

    </div>


     </div>
    </div>
  ):<Loading/>
}

export default PersonDetails
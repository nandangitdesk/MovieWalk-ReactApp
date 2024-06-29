export { removeMovie } from "../features/movieSlice";
import axios from "../utils/Axios";
import { loadMovie } from "../features/movieSlice";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchProviders = await axios.get(`/movie/${id}/watch/providers`);
    const translations = await axios.get(`/movie/${id}/translations`)

    let allDetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((t)=>t.type==="Trailer"),
      watchProviders: watchProviders.data.results.IN,
      translations : translations.data.translations.map((n)=>n.english_name)
    };
    dispatch(loadMovie(allDetails))
    console.log(allDetails);
  } catch (error) {
    console.log("Error : ", error);
  }
};

export { removeTv } from "../features/tvSlice";
import axios from "../utils/Axios";
import { loadTv } from "../features/tvSlice";

export const asyncLoadTv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchProviders = await axios.get(`/tv/${id}/watch/providers`);
    const translations = await axios.get(`/tv/${id}/translations`)

    let allDetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((t)=>t.type==="Trailer"),
      watchProviders: watchProviders.data.results.IN,
      translations : translations.data.translations.map((n)=>n.english_name)
    };
    dispatch(loadTv(allDetails))
    console.log(allDetails);
  } catch (error) {
    console.log("Error : ", error);
  }
};

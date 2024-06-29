export { removePerson } from "../features/personSlice";
import axios from "../utils/Axios";
import { loadPerson } from "../features/personSlice";

export const asyncLoadPerson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalId = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);
    

    let allDetails = {
      detail: detail.data,
      externalId: externalId.data,
      combinedCredits:combinedCredits.data,
      tvCredits:tvCredits.data,
      movieCredits:movieCredits.data
    };
    dispatch(loadPerson(allDetails))
    console.log(allDetails);
  } catch (error) {
    console.log("Error : ", error);
  }
};

import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movieSlice"
import tvReducer from "../features/tvSlice"
import personReducer from "../features/personSlice"

export const store = configureStore({
  reducer: {
    movie:movieReducer,
    tv:tvReducer ,
    person:personReducer
  },
});
export default store

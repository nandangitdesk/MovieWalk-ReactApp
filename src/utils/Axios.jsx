import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTVlOGZiZTFiMTg4Y2Q1M2RkYjdiMGE4ZWE3YzliOCIsInN1YiI6IjY2NzE1YTI1NzYxMDg5ZTRiNWYyZjhhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ddAJ3-6TSfwIakc-3AuAV7mz4UsPzz1r55ipNsHshC8'
      }
})

export default instance
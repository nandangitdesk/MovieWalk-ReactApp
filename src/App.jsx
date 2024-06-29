import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/partials/Popular";
import Movie from "./components/partials/Movie";
import TvShows from "./components/partials/TvShows";
import People from "./components/partials/People";
import PersonDetails from "./components/PersonDetails";
import TvDetails from "./components/TvDetails";
import MovieDetails from "./components/MovieDetails";
import Trailer from "./components/partials/Trailer";
import NotFound from "./components/partials/NotFound";

const App = () => {
  return (
    <div className="h-screen w-screen bg-[#1f1e24] flex">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>

        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} >
          <Route path="/movie/details/:id/trailer" element={<Trailer/>}/>
        </Route>

        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
        <Route path="/tv/details/:id/trailer" element={<Trailer/>}/>
        </Route>

        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
};

export default App;

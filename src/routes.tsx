import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { RatedMoviesPage } from "./pages/RatedMoviesPage/RatedMoviesPage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage/MovieDetailsPage";


export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/rated_movies" element={<RatedMoviesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

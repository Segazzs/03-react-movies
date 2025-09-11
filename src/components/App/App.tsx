import SearchBar from "../SearchBar/SearchBar";
import { fetchMovieServices } from "../../services/movieService";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Movie } from "../../types/movies";
import MovieGrid from "../MovieGrid/MovieGrid";
import css from "../ErrorMessage/ErrorMessage.module.css";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const res = await fetchMovieServices(query);
      if (res.length === 0) {
        toast.error("No movies found for your query");
        return;
      }

      setMovies(res);
      setIsLoading(false);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelect = (selectMovies: Movie) => {
    setSelectedMovie(selectMovies);
    setModalIsOpen(true);
  };

  const onClose = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <p className={css.text}>Loading movies, please wait...</p>}
      {isError && (
        <p className={css.text}>There was an error, please try again...</p>
      )}
      <MovieGrid movies={movies} onSelect={onSelect} />
      {modalIsOpen && selectedMovie && (
        <MovieModal movies={selectedMovie} onClose={onClose} />
      )}
    </>
  );
}

import axios from "axios";
import type { Movie } from "../types/movies";

interface FetchMovieResponseProps {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovieServices = async (topic: string): Promise<Movie[]> => {
  const myKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjdjZTM4ZjYwYWMzZDU0Njk2Yzk5MTFlYmVmYmViYSIsIm5iZiI6MTc1NzI2MDgxMS43OTgsInN1YiI6IjY4YmRhYzBiNzYxOGJkMzVjMTFiYzc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J7vV5ffLSgkB9qdJhbdhjkhNpcc8zxloY_nIsnnG63Q";
  const options = {
    headers: {
      Authorization: `Bearer ${myKey} `,
    },
  };
  const res = await axios.get<FetchMovieResponseProps>(
    `https://api.themoviedb.org/3/search/movie?query=${topic}`,
    options
  );
  return res.data.results;
};

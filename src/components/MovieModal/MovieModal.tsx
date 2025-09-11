// import css from "./MovieModal.module.css";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movies";
import css from "../MovieModal/MovieModal.module.css";

interface MovieModalProps {
  movies: Movie;
  onClose: () => void;
}

export default function MovieModal({ movies, onClose }: MovieModalProps) {
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
          alt="movie_title"
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movies.title}</h2>
          <p>{movies.overview}</p>
          <p>
            <strong>Release Date:</strong> {movies.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movies.vote_average}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

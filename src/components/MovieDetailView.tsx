import NoImage from "../assets/no-image.svg";
import { Movie } from "../types";
import { RelatedMovieSection } from "./RelatedMovieSection";

interface MovieDetailViewProps {
  movie: Movie;
  excludeIds?: string[];
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
  favorites?: string[];
  onToggleFavorite?: (movie: Movie) => void;
}

export function MovieDetailView({ movie, excludeIds = [], onClose, onSelectMovie, favorites, onToggleFavorite }: MovieDetailViewProps) {
  return (
    <div className="w-full bg-[#fbfbfb] text-gray-800 font-sans mt-4">
      {/* Current movie — smaller, secondary */}
      <a
        href={`https://www.imdb.com/title/${movie.id}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 opacity-60 hover:opacity-80 transition-opacity"
      >
        {movie.src ? (
          <img
            src={movie.src}
            srcSet={movie.srcset}
            alt={movie.name}
            className="w-14 h-20 object-cover rounded"
          />
        ) : (
          <div className="flex items-center justify-center w-14 h-20 bg-gray-100 rounded">
            <div className="w-8">
              <NoImage />
            </div>
          </div>
        )}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-0.5">Your pick</p>
          <h2 className="text-sm font-semibold text-gray-600 inline-flex items-center gap-1">
            {movie.name}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 shrink-0 opacity-40">
              <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
              <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
            </svg>
          </h2>
        </div>
      </a>

      {/* Watch next — larger, primary */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Watch next
        </p>
        <RelatedMovieSection movieId={movie.id} excludeIds={excludeIds} onSelectMovie={onSelectMovie} favorites={favorites} onToggleFavorite={onToggleFavorite} />
      </div>
    </div>
  );
}

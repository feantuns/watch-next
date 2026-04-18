import NoImage from "../assets/no-image.svg";
import { Movie } from "../types";
import { FavoriteButton } from "./FavoriteButton";

interface RelatedMovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
  compact?: boolean;
}

const imdbUrl = (id: string) => `https://www.imdb.com/title/${id}/`;

export function RelatedMovieCard({ movie, onClick, isFavorite, onToggleFavorite, compact = false }: RelatedMovieCardProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 group">
        <div className="relative shrink-0">
          <a href={imdbUrl(movie.id)} target="_blank" rel="noopener noreferrer">
            {movie.src ? (
              <img
                src={movie.src}
                srcSet={movie.srcset}
                alt={movie.name}
                className="w-30 h-36 object-cover rounded shadow-sm hover:shadow-md transition-shadow"
              />
            ) : (
              <div className="flex items-center justify-center w-12 h-16 bg-gray-100 rounded">
                <div className="w-6"><NoImage /></div>
              </div>
            )}
          </a>
          {onToggleFavorite && (
            <FavoriteButton movie={movie} isFavorite={!!isFavorite} onToggle={onToggleFavorite} />
          )}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <a
            href={imdbUrl(movie.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-800 hover:underline truncate inline-flex items-center gap-1"
          >
            {movie.name}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 shrink-0 opacity-50">
              <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
              <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
            </svg>
          </a>
          <button
            onClick={() => onClick(movie)}
            className="text-xs text-indigo-500 font-semibold uppercase tracking-wide hover:text-indigo-700 text-left cursor-pointer"
          >
            → Get recommendation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col sm:flex-row items-center gap-3 group">
      <div className="relative w-full max-w-xs">
        <a href={imdbUrl(movie.id)} target="_blank" rel="noopener noreferrer">
          {movie.src ? (
            <img
              src={movie.src}
              srcSet={movie.srcset}
              alt={movie.name}
              className="w-full object-contain rounded-md shadow-md hover:shadow-lg transition-shadow"
            />
          ) : (
            <div className="flex items-center justify-center w-full min-h-[360px] bg-gray-100 rounded-md">
              <div className="w-[100px]">
                <NoImage />
              </div>
            </div>
          )}
        </a>
        {onToggleFavorite && (
          <FavoriteButton
            movie={movie}
            isFavorite={!!isFavorite}
            onToggle={onToggleFavorite}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <a
          href={imdbUrl(movie.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold text-gray-800 hover:underline inline-flex items-center gap-1"
        >
          {movie.name}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0 opacity-50">
            <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
            <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
          </svg>
        </a>
        <button
          onClick={() => onClick(movie)}
          className="text-xs text-indigo-500 font-semibold uppercase tracking-wide hover:text-indigo-700 text-left cursor-pointer"
        >
          → Get recommendation
        </button>
      </div>
    </div>
  );
}

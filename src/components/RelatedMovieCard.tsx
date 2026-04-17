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
            className="text-sm font-semibold text-gray-800 hover:underline truncate"
          >
            {movie.name}
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
          className="text-lg font-bold text-gray-800 hover:underline"
        >
          {movie.name}
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

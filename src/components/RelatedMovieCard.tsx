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

export function RelatedMovieCard({ movie, onClick, isFavorite, onToggleFavorite, compact = false }: RelatedMovieCardProps) {
  if (compact) {
    return (
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onClick(movie)}
      >
        <div className="relative shrink-0">
          {movie.src ? (
            <img
              src={movie.src}
              srcSet={movie.srcset}
              alt={movie.name}
              className="w-30 h-36 object-cover rounded shadow-sm group-hover:shadow-md transition-shadow"
            />
          ) : (
            <div className="flex items-center justify-center w-12 h-16 bg-gray-100 rounded">
              <div className="w-6"><NoImage /></div>
            </div>
          )}
          {onToggleFavorite && (
            <FavoriteButton movie={movie} isFavorite={!!isFavorite} onToggle={onToggleFavorite} />
          )}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-semibold text-gray-800 group-hover:underline truncate">{movie.name}</p>
          <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">→ Get recommendation</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col sm:flex-row items-center gap-3 cursor-pointer group">
      <div className="relative w-full max-w-xs" onClick={() => onClick(movie)}>
        {movie.src ? (
          <img
            src={movie.src}
            srcSet={movie.srcset}
            alt={movie.name}
            className="w-full object-contain rounded-md shadow-md group-hover:shadow-lg transition-shadow"
          />
        ) : (
          <div className="flex items-center justify-center w-full min-h-[360px] bg-gray-100 rounded-md">
            <div className="w-[100px]">
              <NoImage />
            </div>
          </div>
        )}
        {onToggleFavorite && (
          <FavoriteButton
            movie={movie}
            isFavorite={!!isFavorite}
            onToggle={onToggleFavorite}
          />
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0" onClick={() => onClick(movie)}>
        <p className="text-lg font-bold text-gray-800 group-hover:underline">{movie.name}</p>
        <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">→ Get recommendation</span>
      </div>
    </div>
  );
}

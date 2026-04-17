import NoImage from "../assets/no-image.svg";
import { Movie } from "../types";

interface RelatedMovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
}

export function RelatedMovieCard({ movie, onClick, isFavorite, onToggleFavorite }: RelatedMovieCardProps) {
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
          <button
            onClick={e => { e.stopPropagation(); onToggleFavorite(movie); }}
            className={`absolute top-2 right-2 text-2xl leading-none drop-shadow ${isFavorite ? "text-yellow-400" : "text-yellow-400/40 hover:text-yellow-400/70"}`}
            aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0" onClick={() => onClick(movie)}>
        <p className="text-lg font-bold text-gray-800 group-hover:underline">{movie.name}</p>
        <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">→ Get recommendation</span>
      </div>
    </div>
  );
}

import NoImage from "../assets/no-image.svg";
import { Movie } from "../types";

interface RelatedMovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export function RelatedMovieCard({ movie, onClick }: RelatedMovieCardProps) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer group"
      onClick={() => onClick(movie)}
    >
      {movie.src ? (
        <img
          src={movie.src}
          srcSet={movie.srcset}
          alt={movie.name}
          className="w-full max-w-xs object-contain rounded-md shadow-md group-hover:shadow-lg transition-shadow"
        />
      ) : (
        <div className="flex items-center justify-center w-full max-w-xs min-h-[360px] bg-gray-100 rounded-md">
          <div className="w-[100px]">
            <NoImage />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold text-gray-800 group-hover:underline">{movie.name}</p>
        <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">→ Get recommendation</span>
      </div>
    </div>
  );
}

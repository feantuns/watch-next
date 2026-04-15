import NoImage from "../assets/no-image.svg";
import { Movie } from "../types";

interface RelatedMovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export function RelatedMovieCard({ movie, onClick }: RelatedMovieCardProps) {
  return (
    <div
      className="flex flex-col w-[120px] cursor-pointer hover:opacity-80 transition-opacity"
      onClick={() => onClick(movie)}
    >
      {movie.src ? (
        <img
          src={movie.src}
          srcSet={movie.srcset}
          alt={movie.name}
          className="w-full object-contain object-top"
        />
      ) : (
        <div className="flex items-center justify-center min-h-[178px]">
          <div className="w-[60px]">
            <NoImage />
          </div>
        </div>
      )}
      <div className="pt-2 text-sm font-medium text-center">{movie.name}</div>
    </div>
  );
}

import NoImage from "../assets/no-image.svg";
import { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  handleClick: (movie: Movie) => void;
}

export function MovieCard({ movie, handleClick }: MovieCardProps) {
  return (
    <button
      onClick={() => handleClick(movie)}
      className="min-w-[calc(50%-0.5rem)] max-w-[calc(50%-0.5rem)] sm:min-w-[180px] sm:max-w-[180px] flex flex-col cursor-pointer select-none hover:underline"
    >
      {movie.src ? (
        <img
          src={movie.src}
          sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw"
          width="100%"
          srcSet={movie.srcset}
          className="object-contain object-top"
        />
      ) : (
        <div className="flex flex-1 sm:flex-none min-h-[266px] items-center justify-center">
          <div className="w-[90px]">
            <NoImage />
          </div>
        </div>
      )}

      <div className="p-3 font-medium text-center flex justify-center align-baseline">
        {movie.name}
      </div>
    </button>
  );
}

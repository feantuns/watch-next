import NoImage from "../assets/no-image.svg";
import { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  handleClick: (movie: Movie) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
}

export function MovieCard({ movie, handleClick, isFavorite, onToggleFavorite }: MovieCardProps) {
  return (
    <div className="relative min-w-[calc(50%-0.5rem)] max-w-[calc(50%-0.5rem)] sm:min-w-[180px] sm:max-w-[180px]">
      <button
        onClick={() => handleClick(movie)}
        className="w-full flex flex-col cursor-pointer select-none hover:underline"
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

      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(movie)}
          className={`absolute top-2 right-2 text-2xl leading-none drop-shadow ${isFavorite ? "text-yellow-400" : "text-yellow-400/60 hover:text-yellow-400/80"}`}
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      )}
    </div>
  );
}

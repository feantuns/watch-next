import { Movie } from "../types";

interface FavoriteButtonProps {
  movie: Movie;
  isFavorite: boolean;
  onToggle: (movie: Movie) => void;
}

export function FavoriteButton({ movie, isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <div className="group/fav absolute top-2 right-2">
      <button
        onClick={e => { e.stopPropagation(); onToggle(movie); }}
        className={`text-2xl leading-none drop-shadow ${isFavorite ? "text-yellow-400" : "text-yellow-400/40 hover:text-yellow-400/70"}`}
        aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        {isFavorite ? "★" : "☆"}
      </button>
      <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/fav:opacity-100 z-50">
        {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      </span>
    </div>
  );
}

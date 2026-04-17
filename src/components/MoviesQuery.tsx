import { useQuery } from "react-query";
import { Spinner } from "./Spinner";
import { Movie } from "../types";
import { MovieCard } from "./MovieCard";

interface MoviesQueryProps {
  search: string | number;
  platforms?: string[];
  onSelectMovie: (movie: Movie) => void;
  favorites: string[];
  onToggleFavorite?: (movie: Movie) => void;
}

export function MoviesQuery({ search, platforms = [], onSelectMovie, favorites, onToggleFavorite }: MoviesQueryProps) {
  const platformQuery = platforms.map(p => `platforms=${p}`).join("&");
  const queryKey = platformQuery
    ? `/movies?q=${search}&${platformQuery}`
    : `/movies?q=${search}`;

  const { isLoading, error, data } = useQuery<Movie[]>({
    queryKey: [queryKey],
  });

  if (isLoading)
    return (
      <div className="w-full flex justify-center mt-6">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="w-full flex justify-center mt-6">
        Ops, algo deu errado...
      </div>
    );

  return (
    <div className="w-[calc(100%+3rem)] ml-[-1.5rem] sm:ml-0 flex flex-wrap gap-4 mt-4">
      {data?.length === 0 && (
        <p className="text-gray-500 text-sm mt-2">
          Nenhum resultado encontrado{platforms.length > 0 ? ` para o filtro selecionado` : ""}.
        </p>
      )}
      {data?.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          handleClick={onSelectMovie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

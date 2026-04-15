import { useQuery } from "react-query";
import { Spinner } from "./Spinner";
import { Movie } from "../types";
import { MovieCard } from "./MovieCard";

interface MoviesQueryProps {
  search: string | number;
  platform?: string | null;
  onSelectMovie: (movie: Movie) => void;
}

export function MoviesQuery({ search, platform, onSelectMovie }: MoviesQueryProps) {
  const queryKey = platform
    ? `/movies?q=${search}&platform=${platform}`
    : `/movies?q=${search}`;

  const { isLoading, error, data } = useQuery<Movie[]>({
    queryKey: [queryKey],
  });

  const handleClickCard = (movie: Movie) => {
    onSelectMovie(movie);
  };

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
          Nenhum resultado encontrado{platform ? ` para o filtro selecionado` : ""}.
        </p>
      )}
      {data?.map(movie => (
        <MovieCard handleClick={handleClickCard} movie={movie} key={movie.id} />
      ))}
    </div>
  );
}

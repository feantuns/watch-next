import { useQuery } from "react-query";
import { Spinner } from "./Spinner";
import { Movie } from "../types";
import { MovieCard } from "./MovieCard";

interface MoviesQueryProps {
  search: string;
}

export function MoviesQuery({ search }: MoviesQueryProps) {
  const { isLoading, error, data } = useQuery<Movie[]>({
    queryKey: [`/movies?q=${search}`],
  });

  const handleClickCard = (movie: Movie) => {
    console.log("fetch movie", movie);
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
      {data?.map(movie => (
        <MovieCard handleClick={handleClickCard} movie={movie} key={movie.id} />
      ))}
    </div>
  );
}

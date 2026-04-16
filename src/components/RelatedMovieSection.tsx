import { Movie } from "../types";
import { useRelatedMovie } from "../hooks/useRelatedMovie";
import { Spinner } from "./Spinner";
import { RelatedMovieCard } from "./RelatedMovieCard";

function isValidMovie(data: unknown): data is Movie {
  if (!data || typeof data !== "object") return false;
  const m = data as Record<string, unknown>;
  return (
    typeof m.id === "string" &&
    typeof m.name === "string" &&
    typeof m.src === "string" &&
    typeof m.srcset === "string"
  );
}

interface RelatedMovieSectionProps {
  movieId: string;
  excludeIds?: string[];
  onSelectMovie: (movie: Movie) => void;
}

export function RelatedMovieSection({ movieId, excludeIds = [], onSelectMovie }: RelatedMovieSectionProps) {
  const { data, isLoading, isError } = useRelatedMovie(movieId, excludeIds);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-red-500">
        Could not load suggestion. Please try again later.
      </p>
    );
  }

  if (!isValidMovie(data)) {
    return <p className="text-sm text-gray-500">No suggestion available.</p>;
  }

  return <RelatedMovieCard movie={data} onClick={onSelectMovie} />;
}

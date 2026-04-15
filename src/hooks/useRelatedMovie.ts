import { useQuery } from "react-query";
import { Movie } from "../types";

interface RelatedMovieApiResponse {
  id: string;
  name: string;
  cover: string;
  year: number;
}

function normalizeRelatedMovie(raw: RelatedMovieApiResponse): Movie {
  return {
    id: raw.id,
    name: raw.name,
    src: raw.cover ?? "",
    srcset: "",
  };
}

export function useRelatedMovie(movieId: string) {
  const { data, isLoading, isError } = useQuery<Movie>({
    queryKey: ["/movies/related", movieId],
    queryFn: ({ queryKey }) =>
      fetch(
        `${import.meta.env.VITE_APP_BASE_URL}${queryKey[0]}/${queryKey[1]}`
      )
        .then(res => res.json())
        .then((raw: RelatedMovieApiResponse | RelatedMovieApiResponse[]) => {
          const item = Array.isArray(raw) ? raw[0] : raw;
          return normalizeRelatedMovie(item);
        }),
  });

  return { data, isLoading, isError };
}

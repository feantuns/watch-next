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

export function useRelatedMovie(movieId: string, excludeIds: string[] = []) {
  const { data, isLoading, isError, refetch } = useQuery<Movie>({
    queryKey: ["/movies/related", movieId, excludeIds],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/movies/related/${movieId}`
      )
        .then(res => res.json())
        .then((raw: RelatedMovieApiResponse | RelatedMovieApiResponse[]) => {
          const items = Array.isArray(raw) ? raw : [raw];
          const filtered = items.filter(m => !excludeIds.includes(m.id));
          const item = filtered.length > 0 ? filtered[0] : items[0];
          return normalizeRelatedMovie(item);
        }),
  });

  return { data, isLoading, isError, refetch };
}

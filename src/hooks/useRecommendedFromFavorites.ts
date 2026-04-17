import { useMemo } from "react";
import { useQueries } from "react-query";
import { Movie } from "../types";

interface RelatedMovieApiResponse {
  id: string;
  name: string;
  cover: string;
  year: number;
}

function normalizeMovie(raw: RelatedMovieApiResponse): Movie {
  return {
    id: raw.id,
    name: raw.name,
    src: raw.cover ?? "",
    srcset: "",
  };
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export interface FavoriteRecommendation {
  basedOn: Movie;
  recommendation: Movie | null;
  isLoading: boolean;
  isError: boolean;
}

export function useRecommendedFromFavorites(favoriteMovies: Movie[], excludeIds: string[] = []): FavoriteRecommendation[] {
  const sampled = useMemo(
    () => pickRandom(favoriteMovies, 3),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [favoriteMovies.map((m) => m.id).join(",")]
  );

  const queries = useQueries(
    sampled.map((fav) => ({
      queryKey: ["/movies/related/favorites", fav.id, excludeIds],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_APP_BASE_URL}/movies/related/${fav.id}`)
          .then((res) => res.json())
          .then((raw: RelatedMovieApiResponse | RelatedMovieApiResponse[]) => {
            const items = Array.isArray(raw) ? raw : [raw];
            const filtered = items.filter((m) => !excludeIds.includes(m.id) && m.id !== fav.id);
            const item = filtered.length > 0 ? filtered[0] : items[0];
            return normalizeMovie(item);
          }),
      enabled: !!fav.id,
      staleTime: 5 * 60 * 1000,
    }))
  );

  return sampled.map((fav, i) => ({
    basedOn: fav,
    recommendation: (queries[i]?.data as Movie) ?? null,
    isLoading: queries[i]?.isLoading ?? false,
    isError: queries[i]?.isError ?? false,
  }));
}

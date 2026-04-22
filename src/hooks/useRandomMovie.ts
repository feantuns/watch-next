import { useState } from "react";
import { Movie } from "../types";

interface RandomMovieApiResponse {
  id: string;
  name: string;
  src: string | null;
  year: number;
}

function normalizeMovie(raw: RandomMovieApiResponse): Movie {
  return {
    id: raw.id,
    name: raw.name,
    src: raw.src ?? "",
    srcset: "",
  };
}

export function useRandomMovie() {
  const [isLoading, setIsLoading] = useState(false);

  const fetchRandom = async (platforms: string[] = [], excludeIds: string[] = []): Promise<Movie | null> => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      platforms.forEach(p => params.append("platforms", p));
      excludeIds.forEach(id => params.append("exclude", id));
      
      const queryString = params.toString();
      const url = `${import.meta.env.VITE_APP_BASE_URL}/movies/random${queryString ? `?${queryString}` : ""}`;
      
      const res = await fetch(url);
      if (!res.ok) return null;
      const raw: RandomMovieApiResponse = await res.json();
      return normalizeMovie(raw);
    } catch {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRandom, isLoading };
}

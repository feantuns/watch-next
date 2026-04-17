import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Movie } from "../types";

export function useFavoriteMovies() {
  const { user } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setMovies([]);
      return;
    }
    setLoading(true);
    supabase
      .from("user_favorites")
      .select("movie_id, movie_name, movie_src")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setMovies(
          (data ?? []).map((r: any) => ({
            id: r.movie_id,
            name: r.movie_name,
            src: r.movie_src ?? "",
            srcset: "",
          }))
        );
        setLoading(false);
      });
  }, [user]);

  return { movies, loading };
}

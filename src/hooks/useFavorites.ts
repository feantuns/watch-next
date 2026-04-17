import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Movie } from "../types";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    supabase
      .from("user_favorites")
      .select("movie_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setFavorites((data ?? []).map((r: any) => r.movie_id));
      });
  }, [user]);

  const toggleFavorite = async (movie: Movie) => {
    if (!user) return;
    const isFav = favorites.includes(movie.id);
    if (isFav) {
      await supabase
        .from("user_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", movie.id);
      setFavorites(prev => prev.filter(id => id !== movie.id));
    } else {
      await supabase.from("user_favorites").insert({
        user_id: user.id,
        movie_id: movie.id,
        movie_name: movie.name,
        movie_src: movie.src,
      });
      setFavorites(prev => [...prev, movie.id]);
    }
  };

  return { favorites, toggleFavorite };
}

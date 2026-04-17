import { useState } from "react";
import { Layout } from "../components/Layout";
import { MovieCard } from "../components/MovieCard";
import { MovieDetailView } from "../components/MovieDetailView";
import { Spinner } from "../components/Spinner";
import { useFavoriteMovies } from "../hooks/useFavoriteMovies";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../context/AuthContext";
import { Movie } from "../types";

export function FavoritesPage() {
  const { user } = useAuth();
  const { movies, loading } = useFavoriteMovies();
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);

  const handleSelectMovie = (movie: Movie) => {
    setVisitedIds(prev => prev.includes(movie.id) ? prev : [...prev, movie.id]);
    setSelectedMovie(movie);
  };

  return (
    <Layout>
      <header className="mb-4">
        <h1 className="text-xl font-bold">
          Watch <span className="font-normal">next</span>
        </h1>
      </header>

      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
        Favoritos
      </h2>

      {!user && (
        <p className="text-gray-500 text-sm">Faça login para ver seus favoritos.</p>
      )}

      {user && loading && (
        <div className="flex justify-center mt-6">
          <Spinner />
        </div>
      )}

      {user && !loading && movies.length === 0 && (
        <p className="text-gray-500 text-sm">Nenhum filme favoritado ainda.</p>
      )}

      {user && !loading && movies.length > 0 && (
        selectedMovie ? (
          <MovieDetailView
            movie={selectedMovie}
            excludeIds={visitedIds}
            onClose={() => { setSelectedMovie(null); setVisitedIds([]); }}
            onSelectMovie={handleSelectMovie}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <div className="w-[calc(100%+3rem)] ml-[-1.5rem] sm:ml-0 flex flex-wrap gap-4">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleClick={handleSelectMovie}
                isFavorite={favorites.includes(movie.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )
      )}
    </Layout>
  );
}

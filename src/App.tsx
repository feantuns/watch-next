import { FormEvent, useRef, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import { MoviesQuery } from "./components/MoviesQuery";
import { MovieDetailView } from "./components/MovieDetailView";
import { Layout } from "./components/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useUserPlatforms } from "./hooks/useUserPlatforms";
import { useFavorites } from "./hooks/useFavorites";
import { useFavoriteMovies } from "./hooks/useFavoriteMovies";
import { useRandomMovie } from "./hooks/useRandomMovie";
import { FavoritesPage } from "./pages/FavoritesPage";
import { RecommendedSection } from "./components/RecommendedSection";
import { Movie } from "./types";

const PLATFORMS = [
  { id: "netflix", label: "Netflix", color: "bg-red-600 text-white border-red-600" },
  { id: "prime", label: "Prime Video", color: "bg-sky-500 text-white border-sky-500" },
  { id: "disney", label: "Disney+", color: "bg-blue-700 text-white border-blue-700" },
  { id: "hbo", label: "Max", color: "bg-indigo-700 text-white border-indigo-700" },
  { id: "apple", label: "Apple TV+", color: "bg-gray-800 text-white border-gray-800" },
] as const;

type PlatformId = typeof PLATFORMS[number]["id"];

function AppContent() {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { movies: favoriteMovies } = useFavoriteMovies();
  const { platforms, togglePlatform: toggleUserPlatform } = useUserPlatforms();
  const { fetchRandom, isLoading: isLoadingRandom } = useRandomMovie();

  const handleSurpriseMe = async () => {
    const movie = await fetchRandom(platforms, visitedIds);
    if (movie) handleSelectMovie(movie);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const newSearch = (form.elements as any)?.search.value;
    setSelectedMovie(null);
    setVisitedIds([]);
    if (newSearch === search) {
      searchRef.current?.focus();
    } else {
      setSearch(newSearch);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setVisitedIds(prev => prev.includes(movie.id) ? prev : [...prev, movie.id]);
    setSelectedMovie(movie);
  };

  const togglePlatform = (id: PlatformId) => {
    toggleUserPlatform(id);
    setSelectedMovie(null);
    setVisitedIds([]);
  };

  return (
    <Layout>
      <header className="mb-4">
        <h1
          className={`text-xl inline font-bold ${selectedMovie ? "cursor-pointer hover:opacity-70 transition-opacity" : ""}`}
          onClick={selectedMovie ? () => { setSelectedMovie(null); setVisitedIds([]); } : undefined}
        >
          Watch <span className="font-normal">next</span>
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="w-full flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-0">
          <input
            id="search"
            type="text"
            autoFocus
            ref={searchRef}
            className="w-full p-2 rounded border outline-none pr-8"
            placeholder="Pesquise por um filme ou série"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedMovie(null);
                if (searchRef.current) {
                  searchRef.current.value = "";
                  searchRef.current.focus();
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Limpar busca"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button type="submit" className="font-semibold">
            Buscar
          </button>
          <button
            type="button"
            onClick={handleSurpriseMe}
            disabled={isLoadingRandom}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            <span className={isLoadingRandom ? "inline-block animate-spin" : ""}>🎲</span> Surpreenda-me
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mt-3">
        {PLATFORMS.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => togglePlatform(p.id)}
            className={`px-3 py-1 rounded-full text-sm border font-medium transition-opacity ${
              platforms.includes(p.id)
                ? p.color
                : "bg-transparent text-gray-500 border-gray-300 hover:border-gray-500"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {selectedMovie ? (
        <MovieDetailView
          movie={selectedMovie}
          excludeIds={visitedIds}
          onClose={() => { setSelectedMovie(null); setVisitedIds([]); }}
          onSelectMovie={handleSelectMovie}
          favorites={favorites}
          onToggleFavorite={user ? toggleFavorite : undefined}
        />
      ) : search ? (
        <MoviesQuery
          search={search}
          platforms={platforms}
          onSelectMovie={handleSelectMovie}
          favorites={favorites}
          onToggleFavorite={user ? toggleFavorite : undefined}
        />
      ) : (
        user && favoriteMovies.length > 0 && (
          <RecommendedSection
            favoriteMovies={favoriteMovies}
            favorites={favorites}
            onSelectMovie={handleSelectMovie}
            onToggleFavorite={toggleFavorite}
          />
        )
      )}
    </Layout>
  );
}

function App() {
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </HashRouter>
  );
}

export default App;

import { FormEvent, useRef, useState } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import { MoviesQuery } from "./components/MoviesQuery";
import { MovieDetailView } from "./components/MovieDetailView";
import { Layout } from "./components/Layout";
import { Movie } from "./types";

function App() {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const newSearch = (form.elements as any)?.search.value;
    setSelectedMovie(null);
    if (newSearch === search) {
      searchRef.current?.focus();
    } else {
      setSearch(newSearch);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <header className="mb-4">
          <h1 className="text-xl font-bold">
            Watch <span className="font-normal">next</span>
          </h1>
        </header>

        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-between gap-4"
        >
          <div className="relative flex-1">
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
          <button type="submit" className="font-semibold">
            Buscar
          </button>
        </form>

        {search && (
          selectedMovie
            ? <MovieDetailView movie={selectedMovie} onClose={() => setSelectedMovie(null)} onSelectMovie={setSelectedMovie} />
            : <MoviesQuery search={search} onSelectMovie={setSelectedMovie} />
        )}
      </Layout>
    </QueryClientProvider>
  );
}

export default App;

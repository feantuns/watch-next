import { FormEvent, useRef, useState } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api/queryClient";
import { MoviesQuery } from "./components/MoviesQuery";
import { Layout } from "./components/Layout";

function App() {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const newSearch = (form.elements as any)?.search.value;
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
          <input
            id="search"
            type="text"
            autoFocus
            ref={searchRef}
            className="flex-1 p-2 rounded border outline-none"
            placeholder="Pesquise por um filme ou série"
          />
          <button type="submit" className="font-semibold">
            Buscar
          </button>
        </form>

        {search && <MoviesQuery search={search} />}
      </Layout>
    </QueryClientProvider>
  );
}

export default App;

# Design Document: movie-detail-view

## Overview

The movie-detail-view feature adds an in-context detail panel to the Watch Next app. When a user clicks a `MovieCard`, the app transitions from the search-results view to a detail view — all within the same page, using React state rather than a routing library.

The detail view shows the selected movie prominently and fetches a related movie from `GET /movies/related/:id`, presenting it as a "watch next" suggestion. The search bar remains visible and functional at all times; submitting a new search or activating the close control returns the user to the results grid.

The design follows the existing minimalist identity: `#fbfbfb` background, `gray-800` text, Source Sans 3 font, Tailwind-only styling.

---

## Architecture

The feature is implemented as a **state-based view switch** inside `App.tsx`. No routing library is added.

```
App.tsx
 ├── state: search (string)
 ├── state: selectedMovie (Movie | null)   ← NEW
 │
 ├── <Layout>
 │    ├── <header>
 │    ├── <search form>
 │    │
 │    ├── [selectedMovie === null]
 │    │    └── <MoviesQuery search={search} onSelectMovie={setSelectedMovie} />
 │    │
 │    └── [selectedMovie !== null]
 │         └── <MovieDetailView
 │                  movie={selectedMovie}
 │                  onClose={() => setSelectedMovie(null)} />
 └── </Layout>
```

### View-switch logic

| `selectedMovie` | Rendered content |
|---|---|
| `null` | `MoviesQuery` grid (or empty state if `search` is also empty) |
| `Movie` object | `MovieDetailView` panel |

When the user submits a new search while `selectedMovie` is set, `handleSubmit` resets `selectedMovie` to `null` before updating `search`, so the results grid is shown for the new query.

---

## Components and Interfaces

### New components

#### `MovieDetailView`

Renders the full detail panel.

```ts
interface MovieDetailViewProps {
  movie: Movie;           // the selected movie
  onClose: () => void;    // called when the user activates the close control
}
```

Internally composes `RelatedMovieSection` for the async related-movie fetch.

Layout (single column, responsive from 320 px):
1. Close/back control — text button "← Back" at top-left
2. Selected movie section — large poster + name heading
3. Related movie section — "Watch next" label + `RelatedMovieSection`

#### `RelatedMovieSection`

Handles the three async states for the related-movie fetch.

```ts
interface RelatedMovieSectionProps {
  movieId: string;
}
```

Renders:
- `<Spinner />` while loading
- `RelatedMovieCard` on success with a valid `Movie` response
- "No suggestion available" message if the response is not a valid `Movie`
- Inline error message on network/API error

#### `RelatedMovieCard`

A read-only display card for the related movie (rendered as `<div>`, not `<button>`). Reuses the same poster + name layout as `MovieCard` at a smaller size consistent with its secondary "watch next" role.

```ts
interface RelatedMovieCardProps {
  movie: Movie;
}
```

### Modified components

#### `MoviesQuery`

Add an `onSelectMovie` prop so card clicks propagate up to `App.tsx`.

```ts
interface MoviesQueryProps {
  search: string | number;
  onSelectMovie: (movie: Movie) => void;   // NEW
}
```

The existing `handleClickCard` stub is replaced with a call to `onSelectMovie`.

#### `App.tsx`

- Add `selectedMovie: Movie | null` state (initially `null`).
- `handleSubmit` resets `selectedMovie` to `null` on every search submission.
- Conditionally renders `MoviesQuery` or `MovieDetailView` based on `selectedMovie`.

---

## Data Models

### `Movie` (unchanged)

```ts
interface Movie {
  name: string;
  id: string;
  src: string;
  srcset: string;
}
```

### `useRelatedMovie` hook

A thin wrapper around `react-query`'s `useQuery` that fetches `GET /movies/related/:id`.

```ts
function useRelatedMovie(movieId: string): {
  data: Movie | undefined;
  isLoading: boolean;
  isError: boolean;
}
```

- Query key: `['/movies/related', movieId]`
- Called inside `RelatedMovieSection` so the fetch is scoped to that component's lifecycle.
- Response validation: the component checks that `data` has the required `Movie` fields (`id`, `name`, `src`, `srcset`) before rendering `RelatedMovieCard`; otherwise it shows the "no suggestion available" message.

### State shape in `App.tsx`

```ts
const [search, setSearch] = useState<string>("");
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
```

No additional global state or context is needed.


---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Card click opens detail view for that movie

*For any* `Movie` object in the search results, clicking its `MovieCard` SHALL result in `selectedMovie` being set to that exact movie object, causing `MovieDetailView` to render with that movie's name and poster visible.

**Validates: Requirements 1.1, 1.3**

---

### Property 2: Search bar is always present in the DOM

*For any* application state — whether `selectedMovie` is `null` or any `Movie` object, and regardless of the current `search` string — the search `<input>` element and submit button SHALL be present in the DOM and not disabled.

**Validates: Requirements 1.2**

---

### Property 3: Submitting a new search closes the detail view

*For any* `Movie` held in `selectedMovie` and any search string submitted via the form, the submission SHALL reset `selectedMovie` to `null` and render `MoviesQuery` for the new term.

**Validates: Requirements 4.3**

---

### Property 4: Close control resets selected movie without changing search

*For any* open detail view (i.e., `selectedMovie` is a `Movie` object), activating the close/back control SHALL set `selectedMovie` to `null` and leave `search` unchanged, restoring the `MoviesQuery` grid.

**Validates: Requirements 4.1, 4.2**

---

### Property 5: Related movie query key is scoped to the selected movie's id

*For any* two distinct movie ids, the query keys produced by `useRelatedMovie` SHALL be distinct, ensuring a fresh fetch is triggered when a different movie is selected rather than reusing a cached result for a different id.

**Validates: Requirements 2.1**

---

### Property 6: API response shape does not affect the selected movie display

*For any* `Movie` as `selectedMovie` and any API response shape (valid `Movie`, partial object, `null`, or error), the selected movie's name and poster area SHALL remain visible and unchanged — only the related-movie section changes state.

**Validates: Requirements 2.4, 2.5**

---

### Property 7: Movie name is rendered verbatim

*For any* `Movie` object, the `name` field stored in the object SHALL be the exact string rendered in the detail view's title element — no truncation, transformation, or encoding change applied.

**Validates: Requirements 3.3**

---

### Property 8: No-image placeholder rendered when src is empty

*For any* `Movie` where `src` is an empty string, the detail view SHALL render the no-image placeholder in the poster area and SHALL NOT render a broken `<img>` element.

**Validates: Requirements 3.2**

---

## Error Handling

| Scenario | Behaviour |
|---|---|
| Related movie API returns HTTP error | `RelatedMovieSection` shows inline error text; selected movie remains visible |
| Related movie API returns a non-`Movie` shaped object | `RelatedMovieSection` shows "no suggestion available" message |
| Network timeout / offline | Same as HTTP error — inline error in related section |
| `MovieCard` click while detail view already open | Not possible — grid is unmounted when detail view is shown |
| Empty `src` on selected movie | No-image placeholder rendered in poster area |
| Empty `src` on related movie | `RelatedMovieCard` renders no-image placeholder |

---

## Testing Strategy

### Unit / example-based tests

- `MovieDetailView` renders selected movie name and poster
- `MovieDetailView` renders no-image placeholder when `src` is empty
- `RelatedMovieSection` renders `<Spinner />` while loading
- `RelatedMovieSection` renders error message on API failure
- `RelatedMovieSection` renders "no suggestion available" when response is not a valid `Movie`
- `RelatedMovieSection` renders `RelatedMovieCard` on successful response
- Close button calls `onClose`
- `App` resets `selectedMovie` to `null` on new search submission
- A "watch next" label is present when the related movie section renders successfully

### Property-based tests

Property-based testing applies here because the core logic — state transitions, response validation, and name rendering — involves functions whose correctness should hold across a wide range of inputs (arbitrary `Movie` objects, arbitrary API response shapes, arbitrary search strings).

**Library**: [fast-check](https://github.com/dubzzz/fast-check) (TypeScript-native, works with Vitest/Jest)

**Configuration**: minimum 100 runs per property.

**Tag format**: `Feature: movie-detail-view, Property {N}: {property_text}`

| Property | Test description |
|---|---|
| P1 | For any `Movie`, clicking its card sets `selectedMovie` to that movie and renders `MovieDetailView` |
| P2 | For any app state, the search `<input>` is always present and not disabled |
| P3 | For any `Movie` in `selectedMovie` and any search string, submitting the form resets `selectedMovie` to `null` |
| P4 | For any open detail view, calling `onClose` sets `selectedMovie` to `null` without changing `search` |
| P5 | For any two distinct movie ids, their `useRelatedMovie` query keys are distinct |
| P6 | For any API response shape, the selected movie's name and poster remain visible |
| P7 | For any `Movie`, the rendered title text equals `movie.name` exactly |
| P8 | For any `Movie` with `src === ""`, the no-image placeholder is rendered and no `<img>` is present |

### Integration tests

- `GET /movies/related/:id` returns a valid `Movie` object (1–2 representative examples against the real or mocked API endpoint)

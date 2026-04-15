# Implementation Plan: movie-detail-view

## Overview

Implement the in-context movie detail panel using a state-based view switch in `App.tsx`. No routing library is introduced. The work proceeds in four incremental steps: wiring up the click handler, building the detail view shell, adding the related-movie fetch, and integrating everything end-to-end.

## Tasks

- [x] 1. Wire up movie selection state in `App.tsx` and `MoviesQuery`
  - Add `selectedMovie: Movie | null` state (initially `null`) to `App.tsx`
  - Update `handleSubmit` to reset `selectedMovie` to `null` on every submission
  - Add `onSelectMovie: (movie: Movie) => void` prop to `MoviesQuery` and replace the `handleClickCard` stub with a call to `onSelectMovie`
  - Conditionally render `MoviesQuery` or a placeholder `<div>` based on `selectedMovie` in `App.tsx` (placeholder will be replaced in task 2)
  - _Requirements: 1.1, 1.2, 4.3_

  - [ ]* 1.1 Write property test for card click opening detail view (Property 1)
    - **Property 1: Card click opens detail view for that movie**
    - **Validates: Requirements 1.1, 1.3**

  - [ ]* 1.2 Write property test for search bar always present (Property 2)
    - **Property 2: Search bar is always present in the DOM**
    - **Validates: Requirements 1.2**

  - [ ]* 1.3 Write property test for new search closing detail view (Property 3)
    - **Property 3: Submitting a new search closes the detail view**
    - **Validates: Requirements 4.3**

- [x] 2. Create `MovieDetailView` component shell
  - Create `src/components/MovieDetailView.tsx` with props `{ movie: Movie; onClose: () => void }`
  - Render the "← Back" close button at top-left that calls `onClose`
  - Render the selected movie's poster (large size) with no-image placeholder fallback when `src` is empty
  - Render the selected movie's name as a heading
  - Include a "Watch next" section label as a placeholder for `RelatedMovieSection` (added in task 3)
  - Use Tailwind utility classes only; match `#fbfbfb` background, `gray-800` text, Source Sans 3 font
  - Replace the placeholder `<div>` in `App.tsx` with `<MovieDetailView movie={selectedMovie} onClose={() => setSelectedMovie(null)} />`
  - _Requirements: 1.3, 3.1, 3.2, 3.3, 4.1, 4.2, 5.1, 5.2, 5.3_

  - [ ]* 2.1 Write property test for close control resetting selected movie (Property 4)
    - **Property 4: Close control resets selected movie without changing search**
    - **Validates: Requirements 4.1, 4.2**

  - [ ]* 2.2 Write property test for movie name rendered verbatim (Property 7)
    - **Property 7: Movie name is rendered verbatim**
    - **Validates: Requirements 3.3**

  - [ ]* 2.3 Write property test for no-image placeholder when src is empty (Property 8)
    - **Property 8: No-image placeholder rendered when src is empty**
    - **Validates: Requirements 3.2**

- [x] 3. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement `useRelatedMovie` hook and `RelatedMovieSection` component
  - Create `src/hooks/useRelatedMovie.ts` — thin `useQuery` wrapper with query key `['/movies/related', movieId]` returning `{ data, isLoading, isError }`
  - Create `src/components/RelatedMovieCard.tsx` — read-only `<div>`-based card (poster + name) for the related movie suggestion; render no-image placeholder when `src` is empty
  - Create `src/components/RelatedMovieSection.tsx` with prop `{ movieId: string }` that:
    - Shows `<Spinner />` while loading
    - Shows `RelatedMovieCard` when response is a valid `Movie` (all four fields present)
    - Shows "No suggestion available" when response is not a valid `Movie`
    - Shows an inline error message on network/API error without hiding the selected movie
  - Wire `RelatedMovieSection` into `MovieDetailView`, replacing the "Watch next" placeholder
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 5.4_

  - [ ]* 4.1 Write property test for related movie query key scoped to movie id (Property 5)
    - **Property 5: Related movie query key is scoped to the selected movie's id**
    - **Validates: Requirements 2.1**

  - [ ]* 4.2 Write property test for API response shape not affecting selected movie display (Property 6)
    - **Property 6: API response shape does not affect the selected movie display**
    - **Validates: Requirements 2.4, 2.5**

  - [ ]* 4.3 Write unit tests for `RelatedMovieSection` async states
    - Test spinner while loading, error message on failure, "no suggestion available" on invalid response, `RelatedMovieCard` on valid response
    - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [x] 5. Final checkpoint — Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Property tests use [fast-check](https://github.com/dubzzz/fast-check) with a minimum of 100 runs each
- Each property test task references the property number from the design document for traceability
- The `Movie` type in `src/types.ts` is unchanged — no data model modifications needed

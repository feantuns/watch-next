# Requirements Document

## Introduction

The movie-detail-view feature adds an in-context detail panel to the Watch Next app. When a user clicks a movie card in the search results, the app displays a focused detail view for that movie alongside a randomly selected related movie fetched from `/movies/related/:id`. The experience preserves the app's minimalist identity and keeps the search flow uninterrupted — the search bar remains visible and functional at all times.

No routing library is introduced; the detail view is rendered as an overlay or inline panel within the existing single-page layout.

## Glossary

- **App**: The Watch Next React application.
- **Detail_View**: The UI panel that appears when a user selects a movie card, showing the selected movie and a related movie suggestion.
- **Selected_Movie**: The `Movie` object the user clicked on in the search results.
- **Related_Movie**: A `Movie` object returned by the `/movies/related/:id` endpoint, chosen randomly by the server from a pool of related titles.
- **Related_Movie_API**: The backend endpoint `GET /movies/related/:id` that returns a single related `Movie` object.
- **Movie**: An object with the shape `{ name: string, id: string, src: string, srcset: string }`.
- **Search_Bar**: The `<input>` and submit button in `App.tsx` used to query movies.
- **MoviesQuery**: The existing component that fetches and renders search results as `MovieCard` elements.
- **MovieCard**: The existing clickable card component that displays a movie poster and name.
- **Spinner**: The existing loading indicator component.

---

## Requirements

### Requirement 1: Open Detail View on Card Click

**User Story:** As a user, I want to click a movie card and see a detail view for that movie, so that I can learn more about it and discover a related title.

#### Acceptance Criteria

1. WHEN the user clicks a `MovieCard`, THE `Detail_View` SHALL render within the current page without a full navigation or page reload.
2. WHEN the `Detail_View` is open, THE `App` SHALL keep the `Search_Bar` visible and interactive above the detail content.
3. WHEN the `Detail_View` is open, THE `App` SHALL visually distinguish the `Selected_Movie` as the focal point of the view.

---

### Requirement 2: Fetch Related Movie

**User Story:** As a user, I want to see a movie related to the one I selected, so that I can discover what to watch next.

#### Acceptance Criteria

1. WHEN the `Detail_View` opens for a `Selected_Movie`, THE `Detail_View` SHALL request `GET /movies/related/:id` using the `Selected_Movie`'s `id`.
2. WHILE the related movie request is in-flight, THE `Detail_View` SHALL display the `Spinner` in the related movie section.
3. WHEN the `Related_Movie_API` returns a successful response, THE `Detail_View` SHALL display the `Related_Movie`'s poster, name, and a visual label distinguishing it as a suggestion.
4. IF the `Related_Movie_API` returns an error or the network request fails, THEN THE `Detail_View` SHALL display an inline error message in the related movie section without hiding the `Selected_Movie`.
5. IF the `Related_Movie_API` response does not include a valid `Movie` object, THEN THE `Detail_View` SHALL display a "no suggestion available" message in the related movie section.

---

### Requirement 3: Display Selected Movie

**User Story:** As a user, I want to see the movie I selected clearly presented, so that I can confirm my choice and view its details.

#### Acceptance Criteria

1. WHEN the `Detail_View` renders, THE `Detail_View` SHALL display the `Selected_Movie`'s poster image at a larger size than the `MovieCard` grid representation.
2. WHEN the `Selected_Movie` has no poster image (`src` is empty), THE `Detail_View` SHALL display the no-image placeholder in the poster area.
3. THE `Detail_View` SHALL display the `Selected_Movie`'s name in a typographic style consistent with the app's existing font and color palette.

---

### Requirement 4: Close / Return to Search

**User Story:** As a user, I want to dismiss the detail view and return to my search results, so that I can continue browsing without losing my query.

#### Acceptance Criteria

1. THE `Detail_View` SHALL provide a clearly labeled close or back control.
2. WHEN the user activates the close control, THE `App` SHALL hide the `Detail_View` and restore the `MoviesQuery` results for the current search term.
3. WHEN the user submits a new search while the `Detail_View` is open, THE `App` SHALL close the `Detail_View` and display the new `MoviesQuery` results.

---

### Requirement 5: Visual Design Consistency

**User Story:** As a user, I want the detail view to feel like a natural part of the Watch Next app, so that the experience remains cohesive and uncluttered.

#### Acceptance Criteria

1. THE `Detail_View` SHALL use the app's existing background color (`#fbfbfb`), `gray-800` text, and Source Sans 3 font.
2. THE `Detail_View` SHALL use Tailwind CSS utility classes exclusively for layout and styling, with no additional CSS files or inline style objects.
3. THE `Detail_View` SHALL be responsive, rendering correctly on viewports from 320px wide through desktop widths.
4. WHERE the `Detail_View` presents the `Related_Movie`, THE `Detail_View` SHALL use a visual treatment (label, section heading, or subtle separator) that communicates the "watch next" suggestion without introducing heavy UI chrome.

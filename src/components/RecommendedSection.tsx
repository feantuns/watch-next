import { Movie } from "../types";
import { useRecommendedFromFavorites } from "../hooks/useRecommendedFromFavorites";
import { RelatedMovieCard } from "./RelatedMovieCard";
import { Spinner } from "./Spinner";

interface RecommendedSectionProps {
  favoriteMovies: Movie[];
  favorites: string[];
  onSelectMovie: (movie: Movie) => void;
  onToggleFavorite?: (movie: Movie) => void;
}

export function RecommendedSection({ favoriteMovies, favorites, onSelectMovie, onToggleFavorite }: RecommendedSectionProps) {
  const recommendations = useRecommendedFromFavorites(favoriteMovies, favorites);

  const hasAnyData = recommendations.some((r) => r.recommendation !== null);
  const allLoading = recommendations.every((r) => r.isLoading);

  if (allLoading) {
    return (
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Recomendado para você
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!hasAnyData) return null;

  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
        Recomendado para você
      </p>
      <div className="flex flex-col gap-8">
        {recommendations.map(({ basedOn, recommendation, isLoading, isError }) => {
          if (isError || (!isLoading && !recommendation)) return null;

          return (
            <div key={basedOn.id}>
              <p className="text-xs text-gray-400 mb-3">
                Porque você curtiu{" "}
                <span className="font-semibold text-gray-600">{basedOn.name}</span>
              </p>
              {isLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Spinner />
                </div>
              ) : recommendation ? (
                <RelatedMovieCard
                  movie={recommendation}
                  onClick={onSelectMovie}
                  isFavorite={favorites.includes(recommendation.id)}
                  onToggleFavorite={onToggleFavorite}
                  compact
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import NoImage from "../assets/no-image.svg";
import { Movie } from "../types";
import { RelatedMovieSection } from "./RelatedMovieSection";

interface MovieDetailViewProps {
  movie: Movie;
  excludeIds?: string[];
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
}

export function MovieDetailView({ movie, excludeIds = [], onClose, onSelectMovie }: MovieDetailViewProps) {
  return (
    <div className="w-full bg-[#fbfbfb] text-gray-800 font-sans mt-4">
      {/* Current movie — smaller, secondary */}
      <div className="flex items-center gap-3 opacity-60">
        {movie.src ? (
          <img
            src={movie.src}
            srcSet={movie.srcset}
            alt={movie.name}
            className="w-14 h-20 object-cover rounded"
          />
        ) : (
          <div className="flex items-center justify-center w-14 h-20 bg-gray-100 rounded">
            <div className="w-8">
              <NoImage />
            </div>
          </div>
        )}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-0.5">Your pick</p>
          <h2 className="text-sm font-semibold text-gray-600">{movie.name}</h2>
        </div>
      </div>

      {/* Watch next — larger, primary */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Watch next
        </p>
        <RelatedMovieSection movieId={movie.id} excludeIds={excludeIds} onSelectMovie={onSelectMovie} />
      </div>
    </div>
  );
}

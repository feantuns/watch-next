import NoImage from "../assets/no-image.svg";
import { Movie } from "../types";
import { RelatedMovieSection } from "./RelatedMovieSection";

interface MovieDetailViewProps {
  movie: Movie;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
}

export function MovieDetailView({ movie, onClose, onSelectMovie }: MovieDetailViewProps) {
  return (
    <div className="w-full bg-[#fbfbfb] text-gray-800 font-sans mt-4">
      <button
        onClick={onClose}
        className="text-sm font-semibold mb-4 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col items-center gap-4">
        {movie.src ? (
          <img
            src={movie.src}
            srcSet={movie.srcset}
            alt={movie.name}
            className="w-full max-w-xs object-contain"
          />
        ) : (
          <div className="flex items-center justify-center w-full max-w-xs min-h-[360px]">
            <div className="w-[120px]">
              <NoImage />
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-center">{movie.name}</h2>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
          Watch next
        </p>
        <RelatedMovieSection movieId={movie.id} onSelectMovie={onSelectMovie} />
      </div>
    </div>
  );
}

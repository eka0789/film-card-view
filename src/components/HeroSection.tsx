
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Play, Info } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface HeroSectionProps {
  movie: Movie;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const HeroSection = ({ movie }: HeroSectionProps) => {
  const backdropUrl = movie.backdrop_path 
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : '/placeholder.svg';

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear()
    : 'TBA';

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex items-center h-full">
        <div className="max-w-2xl">
          {/* Featured Badge */}
          <Badge className="mb-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1">
            Featured Movie
          </Badge>
          
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            {movie.title}
          </h1>
          
          {/* Rating and Year */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-400">
              <Star className="w-6 h-6 mr-2 fill-current" />
              <span className="text-xl font-semibold">{rating}</span>
            </div>
            <span className="text-white/70 text-lg">{releaseYear}</span>
          </div>
          
          {/* Description */}
          <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-xl">
            {movie.overview || 'No description available.'}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 px-8 py-3 text-lg font-semibold rounded-full"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Watch Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg rounded-full"
            >
              <Info className="w-5 h-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

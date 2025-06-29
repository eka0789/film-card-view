
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : '/placeholder.svg';

  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear()
    : 'TBA';

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <Card className="group overflow-hidden bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2">
          <Badge className="bg-yellow-500/90 text-black font-semibold">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {rating}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-white text-lg mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
          {movie.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-3 line-clamp-2 group-hover:text-gray-200">
          {movie.overview || 'No description available.'}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">{releaseYear}</span>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 mr-1 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

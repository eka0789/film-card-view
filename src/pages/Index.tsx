
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Search } from 'lucide-react';
import { MovieCard } from '@/components/MovieCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { HeroSection } from '@/components/HeroSection';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63'; // Free TMDB API key for demo
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const CATEGORIES = [
  { id: 'popular', name: 'Popular', endpoint: '/movie/popular' },
  { id: 'top_rated', name: 'Top Rated', endpoint: '/movie/top_rated' },
  { id: 'upcoming', name: 'Upcoming', endpoint: '/movie/upcoming' },
  { id: 'now_playing', name: 'Now Playing', endpoint: '/movie/now_playing' },
];

const fetchMovies = async (endpoint: string, query?: string) => {
  const url = query 
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    : `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
  
  console.log('Fetching movies from:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data.results;
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const currentEndpoint = CATEGORIES.find(cat => cat.id === selectedCategory)?.endpoint || '/movie/popular';

  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies', selectedCategory, debouncedQuery],
    queryFn: () => fetchMovies(currentEndpoint, debouncedQuery),
  });

  const { data: heroMovies, isLoading: heroLoading } = useQuery({
    queryKey: ['hero-movies'],
    queryFn: () => fetchMovies('/movie/popular'),
  });

  console.log('Movies data:', movies);
  console.log('Loading state:', isLoading);
  console.log('Error:', error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      {!heroLoading && heroMovies && (
        <HeroSection movie={heroMovies[0]} />
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
            />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Movies Grid */}
        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white/10 rounded-lg h-96"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-8">
              <p>Error loading movies. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies?.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>

        {!movies?.length && !isLoading && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No movies found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

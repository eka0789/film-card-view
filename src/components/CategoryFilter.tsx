
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  endpoint: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className={`
            px-6 py-2 rounded-full transition-all duration-300
            ${selectedCategory === category.id 
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25' 
              : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-purple-400'
            }
          `}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

import { Button } from "../ui/button";
import { Filter } from "lucide-react";

interface Props {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const CategoryFilter: React.FC<Props> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#1d4d6a] text-lg font-semibold">
          Browse by Category
        </h2>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      <div className="flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === cat
                ? "bg-[#bf2026] text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-700 hover:border-[#bf2026] hover:text-[#bf2026]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

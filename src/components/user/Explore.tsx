import { useState } from "react";
import CategoryFilter from "../explore/CategorySection";
import BooksGrid from "../explore/BooksGrid";
import { Button } from "../ui/button";

function Explore({ onOpenBook }: { onOpenBook: (book: any) => void }) {
  const categories = [
    "All",
    "Agricultural Extension Education",
    "Adult and Continuing Education and Extension",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const books = [
    {
      id: 1,
      title: "Agricultural Extension Education",
      author: "Dr. James Miller",
      category: "Agricultural Extension Education",
      price: 19.99,
      rating: 4.7,
      reviews: 325,
      cover:
        "",
    },
    {
      id: 2,
      title: "Adult and Continuing Education and Extension",
      author: "Dr. Emily Johnson",
      category: "Adult and Continuing Education and Extension",
      price: 24.99,
      rating: 4.6,
      reviews: 289,
      cover:
        "",
    },
  ];

  // 🧠 Filter books by selected category
  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div className="space-y-6">
        <div>
          <h2 className="text-[#1d4d6a] mb-1">Explore Books</h2>
          <p className="text-sm text-gray-500">
            Discover, learn, and get inspired by our collection of books.
          </p>
        </div>
      {/* 🔹 Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showHeading={false}
        layout="user"
      />

      {/* 🔹 Books Grid */}
      <BooksGrid books={filteredBooks} onOpenBook={onOpenBook} />
    </div>
  );
}

export default Explore;

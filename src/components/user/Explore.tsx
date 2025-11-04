import { useState } from "react";
import CategoryFilter from "../explore/CategorySection";
import BooksGrid from "../explore/BooksGrid";
import { Button } from "../ui/button";

function Explore({ onOpenBook }: { onOpenBook: (book: any) => void }) {
  const categories = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Biography",
    "Fantasy",
    "Mystery",
    "Romance",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const books = [
    {
      id: 1,
      title: "The Science of Everything",
      author: "Dr. James Miller",
      category: "Science",
      price: 19.99,
      rating: 4.7,
      reviews: 325,
      cover:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Romantic Tales",
      author: "Sophia Lee",
      category: "Romance",
      price: 14.99,
      rating: 4.5,
      reviews: 210,
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Mystery at Midnight",
      author: "Oliver Stone",
      category: "Mystery",
      price: 17.99,
      rating: 4.3,
      reviews: 156,
      cover:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
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

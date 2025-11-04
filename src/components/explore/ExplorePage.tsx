import { useState } from "react";
import HeroSection from "./HeroSection";
import CategoryFilter from "./CategorySection";
import StatsBar from "./StatusBar";
import BooksGrid from "./BooksGrid";

function ExplorePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Mathematics",
    "Physics",
    "Computer Science",
    "Chemistry",
    "Biology",
    "Literature",
    "History",
  ];

  const books = [
    { id: 1, title: "Advanced Calculus", author: "Dr. Sarah Smith", category: "Mathematics", price: 24.99, rating: 4.8, reviews: 342, cover: "https://images.unsplash.com/photo-1761546571631-a4d61b55cd2f?...", bestseller: true },
    { id: 2, title: "Quantum Physics Fundamentals", author: "Prof. Michael Johnson", category: "Physics", price: 29.99, rating: 4.9, reviews: 523, cover: "https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?...", trending: true },
   
  ];

  const filteredBooks = books.filter(
    (book) =>
      (selectedCategory === "All" || book.category === selectedCategory) &&
      (searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <StatsBar totalBooks={filteredBooks.length} />
        <BooksGrid books={filteredBooks} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export default ExplorePage;

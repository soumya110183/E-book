import { useEffect, useState } from "react";
import axios from "axios";
import CategoryFilter from "../explore/CategorySection";
import BooksGrid from "../explore/BooksGrid";

function Explore({ onOpenBook }: { onOpenBook: (book: any) => void }) {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  const categories = ["All", ...new Set(books.map((b: any) => b.category))];

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((b: any) => b.category === selectedCategory);

  return (
    <div className="space-y-6">
      <h2 className="text-[#1d4d6a] mb-1">Explore Books</h2>
      <p className="text-sm text-gray-500">
        Discover, learn, and get inspired by our collection of books.
      </p>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showHeading={false}
        layout="user"
      />

      <BooksGrid books={filteredBooks} onOpenBook={onOpenBook} />
    </div>
  );
}

export default Explore;

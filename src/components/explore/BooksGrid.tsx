import { Card } from "../ui/card";
import BookCard from "./BooksCard";

const BooksGrid = ({
  books,
  onNavigate,
}: {
  books: any[];
  onNavigate: (page: string) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onNavigate={onNavigate} />
      ))}
    </div>
  );
};

export default BooksGrid;

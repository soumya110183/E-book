import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Award, TrendingUp, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const BookCard = ({ book, onNavigate }: any) => {
  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-all group overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {book.bestseller && (
          <Badge className="absolute top-3 left-3 bg-[#bf2026] text-white">
            <Award className="w-3 h-3 mr-1" />
            Bestseller
          </Badge>
        )}
        {book.trending && (
          <Badge className="absolute top-3 left-3 bg-green-600 text-white">
            <TrendingUp className="w-3 h-3 mr-1" />
            Trending
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <Button
            onClick={() => onNavigate("login")}
            className="w-full bg-[#bf2026] hover:bg-[#a01c22] text-white"
          >
            View Details
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <Badge className="bg-blue-100 text-blue-700 text-xs mb-2">
          {book.category}
        </Badge>
        <h3 className="text-[#1d4d6a] mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{book.author}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{book.rating}</span>
            <span className="text-xs text-gray-500">({book.reviews})</span>
          </div>
          <span className="text-[#bf2026]">₹{book.price}</span>
        </div>
        {/* 🛒 Side-by-Side Buttons */}
        <div className="flex items-center justify-between gap-2">
          <Button
            onClick={() => onNavigate("login")}
            className="flex-1 bg-[#1d4d6a] hover:bg-[#153a4f] text-white"
            size="sm"
          >
            Add to Cart
          </Button>

          <Button
            onClick={() => onNavigate("checkout")}
            className="flex-1 bg-[#bf2026] hover:bg-[#a01c22] text-white"
            size="sm"
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;

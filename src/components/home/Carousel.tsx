import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface CarouselProps {
  onNavigate: (page: string) => void;
  onOpenBook?: (book: any) => void;
}

export function Carousel({ onNavigate, onOpenBook }: CarouselProps) {
  const featuredBooks = [
    {
      id: 1,
      title: "Advanced Quantum Physics",
      author: "Dr. Michael Chen",
      category: "Physics",
      cover:
        "https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      readers: 12500,
    },
    {
      id: 2,
      title: "Calculus & Analysis",
      author: "Prof. Sarah Williams",
      category: "Mathematics",
      cover:
        "https://images.unsplash.com/photo-1761546571631-a4d61b55cd2f?auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      readers: 18300,
    },
    {
      id: 3,
      title: "Modern Literature",
      author: "Dr. Emily Roberts",
      category: "Literature",
      cover:
        "https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      readers: 9800,
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      author: "Dr. Alan Turing",
      category: "AI / Computer Science",
      cover:
        "https://images.unsplash.com/photo-1606813902913-0e26e8f63d49?auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      readers: 16400,
    },
  ];

  const [current, setCurrent] = useState(0);

  const handleNext = () =>
    setCurrent((prev) => (prev + 1) % featuredBooks.length);
  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);

  const handleBookClick = (book: any) =>
    onOpenBook ? onOpenBook(book) : onNavigate("payment");

  useEffect(() => {
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[700px] h-[320px] flex items-center justify-center mx-auto">
      {featuredBooks.map((book, index) => {
        const offset = (index - current + featuredBooks.length) % featuredBooks.length;

        // Calculate positioning for 3D effect
        let transform = "";
        let zIndex = 0;
        let opacity = 1;
        let scale = 1;

        if (offset === 0) {
          // Center Book
          transform = "translateX(0) scale(1)";
          zIndex = 3;
          scale = 1.05;
        } else if (offset === 1 || offset === -3) {
          // Right-side book
          transform = "translateX(200px) scale(0.9)";
          zIndex = 2;
          opacity = 0.7;
        } else if (offset === 3 || offset === -1) {
          // Left-side book
          transform = "translateX(-200px) scale(0.9)";
          zIndex = 2;
          opacity = 0.7;
        } else {
          // Back book (hidden)
          transform = "translateX(0) scale(0.8)";
          zIndex = 1;
          opacity = 0;
        }

        return (
          <div
            key={book.id}
            className="absolute transition-all duration-700 ease-out cursor-pointer"
            style={{
              transform,
              zIndex,
              opacity,
            }}
            onClick={() => handleBookClick(book)}
          >
            <Card className="w-56 h-[280px] overflow-hidden bg-white backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
              <div className="h-40 overflow-hidden rounded-t-lg">
  <ImageWithFallback
    src={book.cover}
    alt={book.title}
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
  />
</div>

              <CardContent className="p-4 bg-white/90 text-gray-900">
                <h3 className="font-semibold text-lg line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                  {book.author} • {book.category}
                </p>
                <div className="flex justify-between items-center text-sm mb-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    {book.rating}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users className="w-4 h-4" />
                    {book.readers.toLocaleString()}
                  </div>
                </div>
                <Button className="w-full bg-[#bf2026] hover:bg-[#a01c22] text-white transition-all">
                  Read Now
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      {/* <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button> */}
    </div>
  );
}

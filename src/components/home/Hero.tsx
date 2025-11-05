import { Button } from "../ui/button";
import { Carousel } from "./Carousel";

interface HeroProps {
  onNavigate: (page: string) => void;
  onOpenBook?: (book: any) => void;
}

export function Hero({ onNavigate, onOpenBook }: HeroProps) {
  return (
    <section className="min-h-[80vh] bg-linear-to-br from-[#1d4d6a] via-[#2a5f7f] to-[#1d4d6a] text-white overflow-hidden flex items-center justify-center px-20  ">
      <div className="max-w-8xl w-full flex flex-col md:flex-row items-center justify-between  ">

        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="w-full  text-left space-y-6 md:pl-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Explore Your{" "}
            <span className="text-[#bf2026]">Next Academic Adventure</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-md">
            Access thousands of curated e-books, journals, and learning
            materials — designed to elevate your academic journey.
          </p>
          <Button
            className="bg-[#bf2026] hover:bg-[#a01c22] text-white px-6 py-3 rounded-lg text-lg transition-all"
            onClick={() => onNavigate("login")}
          >
            Start Reading
          </Button>
        </div>
        </div>

        {/* RIGHT SIDE - CAROUSEL */}
        <div className="w-full md:w-[48%] flex justify-between md:pr-4">
          <div className=" w-full">
            <Carousel onNavigate={onNavigate} onOpenBook={onOpenBook} />
          </div>
        </div>

      
    </section>
  );
}
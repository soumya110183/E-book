import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  X,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Bookmark,
  Highlighter,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Slider } from "./ui/slider";

interface BookReaderProps {
  book: any;
  onClose: () => void;
}

export function BookReader({ book, onClose }: BookReaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState(18);
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [highlightMode, setHighlightMode] = useState(false);
  const [highlightColor, setHighlightColor] = useState("#ffff00"); // default yellow
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const totalPages = book.pages || 450;

  const sampleContent = `
    <h1>Chapter ${Math.floor(currentPage / 20) + 1}: ${book.title}</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <blockquote>"Curiosity has its own reason for existing."</blockquote>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>
  `;

  // ✅ Highlight + unhighlight logic
  useEffect(() => {
    if (!highlightMode) return;

    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const range = selection.getRangeAt(0);
      const selectedText = selection.toString();

      // If the selection is already inside a highlight, remove it
      const parentNode = selection.anchorNode?.parentElement;
      if (parentNode && parentNode.classList.contains("highlight-span")) {
        const textNode = document.createTextNode(parentNode.textContent || "");
        parentNode.replaceWith(textNode);
        selection.removeAllRanges();
        return;
      }

      // Create new highlight span
      const span = document.createElement("span");
      span.className = "highlight-span";
      span.style.backgroundColor = highlightColor;
      span.style.color = "black";
      span.textContent = selectedText;

      range.deleteContents();
      range.insertNode(span);
      selection.removeAllRanges();
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [highlightMode, highlightColor]);

  const toggleBookmark = () => {
    setBookmarks((prev) =>
      prev.includes(currentPage)
        ? prev.filter((p) => p !== currentPage)
        : [...prev, currentPage]
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } transition-colors`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 border-b ${
          theme === "dark" ? "border-gray-800 bg-black" : "border-gray-200 bg-white"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="w-5 h-5" />
            </Button>
            <div>
              <h2 className={theme === "dark" ? "text-white" : "text-[#1d4d6a]"}>
                {book.title}
              </h2>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size */}
            <Button onClick={() => setFontSize(Math.max(14, fontSize - 2))} variant="ghost" size="sm">
              <ZoomOut className="w-5 h-5" />
            </Button>
            <span className="text-sm text-gray-500 w-12 text-center">{fontSize}px</span>
            <Button onClick={() => setFontSize(Math.min(26, fontSize + 2))} variant="ghost" size="sm">
              <ZoomIn className="w-5 h-5" />
            </Button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Highlight mode */}
            <Button
              onClick={() => setHighlightMode(!highlightMode)}
              variant="ghost"
              size="sm"
              className={`${highlightMode ? "bg-yellow-100 text-yellow-700" : ""}`}
            >
              <Highlighter className="w-5 h-5" />
            </Button>

            {/* Color picker */}
            {highlightMode && (
  <div className="flex items-center gap-2 ml-2">
    <label className="text-sm text-gray-600 dark:text-gray-300">
      Color:
    </label>
    <input
      type="color"
      value={highlightColor}
      onChange={(e) => setHighlightColor(e.target.value)}
      className="w-8 h-8 border rounded cursor-pointer"
    />
  </div>
)}
 

            {/* Bookmark */}
            <Button
              onClick={toggleBookmark}
              variant="ghost"
              size="sm"
              className={bookmarks.includes(currentPage) ? "text-[#bf2026]" : ""}
            >
              <Bookmark className="w-5 h-5" />
            </Button>

            {/* Theme toggle */}
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              variant="ghost"
              size="sm"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {/* Menu */}
            <Button onClick={() => setShowMenu(!showMenu)} variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Reading Area */}
      <div className="max-w-4xl mx-auto px-12 py-12 select-text">
        <div
          id="reading-content"
          className={`prose prose-lg max-w-none ${
            theme === "dark" ? "prose-invert" : ""
          }`}
          style={{ fontSize: `${fontSize}px` }}
          dangerouslySetInnerHTML={{ __html: sampleContent }}
        />
      </div>

      {/* Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 border-t ${
          theme === "dark" ? "border-gray-800 bg-black" : "border-gray-200 bg-white"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            variant="ghost"
            size="sm"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            variant="ghost"
            size="sm"
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="px-6 pb-3">
          <Slider
            value={[currentPage]}
            onValueChange={(v) => setCurrentPage(v[0])}
            min={1}
            max={totalPages}
            step={1}
          />
        </div>
      </div>
    </div>
  );
}

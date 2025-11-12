import { useState ,useEffect} from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { BookOpen, Grid3x3, List, Search, Filter, MoreVertical, Edit, Trash2, FolderPlus, StickyNote } from 'lucide-react';
import { toast } from 'sonner';

import axios from "axios";

interface MyLibraryProps {
  onOpenBook: (book: any) => void;
}

export function MyLibrary({ onOpenBook }: MyLibraryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [collectionName, setCollectionName] = useState('');
  const [bookNote, setBookNote] = useState('');

  const [books, setBooks] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [collections, setCollections] = useState<any[]>([]);
const [loadingCollections, setLoadingCollections] = useState(true);
useEffect(() => {
  const fetchCollections = async () => {
    try {
      const session = JSON.parse(localStorage.getItem("session") || "{}");
      const token = session?.access_token;
      if (!token) return;

      const res = await axios.get("http://localhost:5000/api/library/collections", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCollections(res.data || []);
    } catch (err) {
      console.error("Failed to load collections:", err);
      toast.error("Failed to load collections");
    } finally {
      setLoadingCollections(false);
    }
  };

  fetchCollections();
}, [isCollectionDialogOpen]); // refetch when a new one is added


useEffect(() => {
  const fetchLibrary = async () => {
    try {
      const session = JSON.parse(localStorage.getItem("session") || "{}");
      const token = session?.access_token;

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/library", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Flatten the nested books structure
      const formattedBooks = res.data.map((entry: any) => ({
        id: entry.books.id,
        title: entry.books.title,
        author: entry.books.author,
        genre: entry.books.genre,
        category: entry.books.category,
        cover_url: entry.books.cover_url,
        pages: entry.books.pages,
        price: entry.books.price,
        progress: entry.progress,
        purchased: entry.added_at,
      }));

      setBooks(formattedBooks);
    } catch (err) {
      console.error(err);
      setError("Failed to load your library");
    } finally {
      setLoading(false);
    }
  };

  fetchLibrary();
}, []);

// 🧠 Debounced search setup
let searchTimeout: any;

const handleSearch = async (query: string) => {
  try {
    const session = JSON.parse(localStorage.getItem("session") || "{}");
    const token = session?.access_token;
    if (!token) return;

    const res = await axios.get(`http://localhost:5000/api/library/search?query=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Format results properly
    const formatted = res.data.map((entry: any) => ({
      id: entry.books.id,
      title: entry.books.title,
      author: entry.books.author,
      genre: entry.books.genre,
      category: entry.books.category,
      cover_url: entry.books.cover_url,
      pages: entry.books.pages,
      price: entry.books.price,
      progress: entry.progress,
      purchased: entry.added_at,
    }));

    setBooks(formatted);
  } catch (err) {
    console.error("Search error:", err);
    toast.error("Search failed");
  }
};

// 🕓 Debounced input handler
const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  clearTimeout(searchTimeout);
  const value = e.target.value.trim();

  searchTimeout = setTimeout(() => {
    if (value.length > 0) {
      handleSearch(value);
    } else {
      // Re-fetch full library when clearing search
      const session = JSON.parse(localStorage.getItem("session") || "{}");
      const token = session?.access_token;
      axios
        .get("http://localhost:5000/api/library", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const formattedBooks = res.data.map((entry: any) => ({
            id: entry.books.id,
            title: entry.books.title,
            author: entry.books.author,
            genre: entry.books.genre,
            category: entry.books.category,
            cover_url: entry.books.cover_url,
            pages: entry.books.pages,
            price: entry.books.price,
            progress: entry.progress,
            purchased: entry.added_at,
          }));
          setBooks(formattedBooks);
        })
        .catch(() => toast.error("Failed to reload library"));
    }
  }, 400);
};



const handleRemoveBook = async (bookId: number) => {
  try {
    const session = JSON.parse(localStorage.getItem("session") || "{}");
    const token = session?.access_token;
    await axios.delete(`http://localhost:5000/api/library/remove/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Book removed from library");
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
  } catch (err) {
    toast.error("Failed to remove book");
  }
};


  const handleSaveNote = () => {
    toast.success('Note saved successfully!');
    setIsNoteDialogOpen(false);
  };

const addBookToLibrary = async (bookId: number) => {
  try {
    const session = JSON.parse(localStorage.getItem("session") || "{}");
    const token = session?.access_token;
    await axios.post(`http://localhost:5000/api/library/add/${bookId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Book added to library");
  } catch (err) {
    toast.error("Failed to add book");
  }
};

const handleDeleteCollection = async (id: number) => {
  if (!window.confirm("Are you sure you want to delete this collection?")) return;

  try {
    const session = JSON.parse(localStorage.getItem("session") || "{}");
    const token = session?.access_token;
    await axios.delete(`http://localhost:5000/api/library/collections/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Collection deleted");
    setCollections((prev) => prev.filter((c) => c.id !== id));
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete collection");
  }
};

const handleCreateCollection = async () => {
  if (!collectionName.trim()) return;

  try {
    const session = JSON.parse(localStorage.getItem("session") || "{}");
    const token = session?.access_token;
    await axios.post(
      "http://localhost:5000/api/library/collections",
      { name: collectionName },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success(`Collection "${collectionName}" created`);
    setCollectionName("");
    setIsCollectionDialogOpen(false);
  } catch (err) {
    console.error(err);
    toast.error("Failed to create collection");
  }
};


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1d4d6a] mb-1">My Library</h2>
          <p className="text-sm text-gray-500">{books.length} books in your collection</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsCollectionDialogOpen(true)}
            className="bg-[#bf2026] hover:bg-[#a01c22] text-white gap-2"
          >
            <FolderPlus className="w-4 h-4" />
            New Collection
          </Button>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
           <input
  type="text"
  placeholder="Search library..."
  onChange={handleSearchInput}
  className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bf2026] focus:border-transparent"
/>



          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white border border-gray-200 ">
          <TabsTrigger value="all">All Books</TabsTrigger>
          <TabsTrigger value="reading">Currently Reading</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="collection">Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <Card key={book.id} className="border-none shadow-md hover:shadow-xl transition-all group">
                  <CardContent className="p-0">
                    <div className="relative bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] h-48 flex items-center justify-center rounded-t-lg overflow-hidden">
                      <span className="text-7xl">{book.cover}</span>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                        <Button
                          onClick={() => onOpenBook(book)}
                          className="bg-[#bf2026] hover:bg-[#a01c22] text-white opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Read Now
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <Badge className="bg-blue-100 text-blue-700 mb-2">{book.category}</Badge>
                      <h3 className="text-[#1d4d6a] mb-1 line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{book.author}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Progress</span>
                          <span>{book.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#bf2026] h-2 rounded-full transition-all"
                            style={{ width: `${book.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 pt-1">
                          <span>{book.pages} pages</span>
                          <span>Added {new Date(book.purchased).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {books.map((book) => (
                <Card key={book.id} className="border-none shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] rounded flex items-center justify-center text-3xl">
                        {book.cover}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-[#1d4d6a] mb-1">{book.title}</h3>
                            <p className="text-sm text-gray-500">{book.author}</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700">{book.category}</Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{book.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-[#bf2026] h-2 rounded-full"
                                style={{ width: `${book.progress}%` }}
                              />
                            </div>
                          </div>
                          <Button
                            onClick={() => onOpenBook(book)}
                            className="bg-[#bf2026] hover:bg-[#a01c22] text-white"
                          >
                            <BookOpen className="w-4 h-4 mr-2" />
                            Read
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="reading" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.filter(b => b.progress > 0 && b.progress < 100).map((book) => (
              <Card key={book.id} className="border-none shadow-md hover:shadow-xl transition-all group">
                <CardContent className="p-0">
                  <div className="relative bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] h-48 flex items-center justify-center rounded-t-lg overflow-hidden">
                    <span className="text-7xl">{book.cover}</span>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                      <Button
                        onClick={() => onOpenBook(book)}
                        className="bg-[#bf2026] hover:bg-[#a01c22] text-white opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Continue Reading
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <Badge className="bg-blue-100 text-blue-700 mb-2">{book.category}</Badge>
                    <h3 className="text-[#1d4d6a] mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{book.author}</p>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{book.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#bf2026] h-2 rounded-full"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No completed books yet. Keep reading!</p>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.slice(0, 3).map((book) => (
              <Card key={book.id} className="border-none shadow-md hover:shadow-xl transition-all group">
                <CardContent className="p-0">
                  <div className="relative bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] h-48 flex items-center justify-center rounded-t-lg overflow-hidden">
                    <span className="text-7xl">{book.cover}</span>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                      <Button
                        onClick={() => onOpenBook(book)}
                        className="bg-[#bf2026] hover:bg-[#a01c22] text-white opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read Now
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <Badge className="bg-blue-100 text-blue-700 mb-2">{book.category}</Badge>
                    <h3 className="text-[#1d4d6a] mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{book.author}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Collection Dialog */}
      <Dialog open={isCollectionDialogOpen} onOpenChange={setIsCollectionDialogOpen}>
       <DialogContent aria-describedby="collection-desc">

          <DialogHeader>
  <DialogTitle className="text-[#1d4d6a]">Create New Collection</DialogTitle>
  <p className="text-sm text-gray-500" id="collection-desc">
    Enter a name for your new book collection.
  </p>
</DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="collection-name">Collection Name</Label>
              <Input
                id="collection-name"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="e.g., Summer Reading List"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCollectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateCollection}
              className="bg-[#bf2026] hover:bg-[#a01c22] text-white"
            >
              Create Collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#1d4d6a]">Add Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedBook && (
              <div className="p-3 bg-gray-50 rounded-lg mb-4">
                <p className="text-sm text-gray-600 mb-1">Book</p>
                <p className="text-[#1d4d6a]">{selectedBook.title}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="book-note">Your Note</Label>
              <Textarea
                id="book-note"
                value={bookNote}
                onChange={(e) => setBookNote(e.target.value)}
                placeholder="Add your thoughts, quotes, or important points..."
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNote}
              className="bg-[#bf2026] hover:bg-[#a01c22] text-white"
            >
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

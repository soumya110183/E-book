import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Upload, FileText, Plus, Edit, Trash2 } from 'lucide-react';

export function ContentManagement() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [editItem, setEditItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);

  const books = [
    { id: 1, title: 'Advanced Calculus', category: 'Mathematics', author: 'Dr. Smith', pages: 450, sales: 1240, status: 'Published' },
    { id: 2, title: 'Quantum Physics', category: 'Physics', author: 'Prof. Johnson', pages: 520, sales: 980, status: 'Published' },
    { id: 3, title: 'Machine Learning', category: 'CS', author: 'Dr. Chen', pages: 380, sales: 2150, status: 'Published' },
  ];

  const notes = [
    { id: 1, title: 'Calculus Quick Reference', category: 'Mathematics', author: 'Prof. Smith', downloads: 2450, price: 'Free' },
    { id: 2, title: 'Quantum Mechanics Notes', category: 'Physics', author: 'Dr. Johnson', downloads: 1890, price: '$4.99' },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1d4d6a] mb-1">Content Management</h2>
          <p className="text-sm text-gray-500">Upload and manage books, notes, and tests</p>
        </div>
        <Button
          onClick={() => setShowUploadDialog(true)}
          className="bg-[#bf2026] hover:bg-[#a01c22] text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          Upload Content
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="books" className="w-full">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="books">E-Books</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="tests">Mock Tests</TabsTrigger>
        </TabsList>

        {/* -------- E-BOOKS -------- */}
        <TabsContent value="books" className="mt-6">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="space-y-3">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >

                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-16 bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] rounded flex items-center justify-center text-2xl">
                        📘
                      </div>

                      <div className="flex-1">
                        <h4 className="text-[#1d4d6a] mb-1">{book.title}</h4>

                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{book.author}</span>
                          <span>•</span>
                          <Badge className="bg-blue-100 text-blue-700">{book.category}</Badge>
                          <span>•</span>
                          <span>{book.pages} pages</span>
                          <span>•</span>
                          <span>{book.sales} sales</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">

                      <Badge className="bg-green-100 text-green-700">{book.status}</Badge>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditItem({ ...book, type: 'book' });
                          setShowEditDialog(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => {
                          setDeleteItem({ ...book, type: 'book' });
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* -------- NOTES -------- */}
        <TabsContent value="notes" className="mt-6">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="space-y-3">

                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >

                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-16 bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] rounded flex items-center justify-center text-2xl">
                        📝
                      </div>

                      <div className="flex-1">
                        <h4 className="text-[#1d4d6a] mb-1">{note.title}</h4>

                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{note.author}</span>
                          <span>•</span>
                          <Badge className="bg-blue-100 text-blue-700">{note.category}</Badge>
                          <span>•</span>
                          <span>{note.downloads} downloads</span>
                          <span>•</span>
                          <span>{note.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditItem({ ...note, type: 'note' });
                          setShowEditDialog(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => {
                          setDeleteItem({ ...note, type: 'note' });
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                    </div>

                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* -------- TESTS -------- */}
        <TabsContent value="tests" className="mt-6">
          <Card className="border-none shadow-md">
            <CardContent className="p-6 text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No mock tests created yet</p>

              <Button className="mt-4 bg-[#bf2026] hover:bg-[#a01c22] text-white">
                Create Mock Test
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* ---------------- Upload Dialog ---------------- */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#1d4d6a]">Upload New Content</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            <div>
              <Label>Content Type</Label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bf2026]">
                <option>E-Book</option>
                <option>Notes</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input placeholder="Enter title" />
              </div>

              <div>
                <Label>Author</Label>
                <Input placeholder="Enter author name" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Computer Science</option>
                  <option>Chemistry</option>
                </select>
              </div>

              <div>
                <Label>Price</Label>
                <Input placeholder="$0.00 (Free)" />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea placeholder="Enter description" className="min-h-[100px]" />
            </div>

            <div>
              <Label>Upload File</Label>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#bf2026] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PDF, EPUB up to 50MB</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>

              <Button className="flex-1 bg-[#bf2026] hover:bg-[#a01c22] text-white">
                Upload & Publish
              </Button>
            </div>

          </div>
        </DialogContent>
      </Dialog>

      {/* ---------------- Edit Dialog ---------------- */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#1d4d6a]">Edit Content</DialogTitle>
          </DialogHeader>

          {editItem && (
            <div className="space-y-4">

              <div>
                <Label>Title</Label>
                <Input defaultValue={editItem.title} />
              </div>

              <div>
                <Label>Author</Label>
                <Input defaultValue={editItem.author} />
              </div>

              <div>
                <Label>Category</Label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                  <option>{editItem.category}</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>CS</option>
                </select>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea defaultValue={editItem.description || ''} className="min-h-[100px]" />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancel
                </Button>

                <Button className="flex-1 bg-[#bf2026] hover:bg-[#a01c22] text-white">
                  Save Changes
                </Button>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ---------------- Delete Confirmation Dialog ---------------- */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Confirm Delete</DialogTitle>
          </DialogHeader>

          {deleteItem && (
            <div className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to delete
                <span className="font-semibold text-[#1d4d6a]"> “{deleteItem.title}” </span>?
                This action cannot be undone.
              </p>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>

                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => {
                    console.log('Deleted:', deleteItem);
                    setShowDeleteDialog(false);
                    setDeleteItem(null);
                  }}
                >
                  Delete
                </Button>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}

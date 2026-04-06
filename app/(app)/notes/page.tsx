import { BookOpen, Plus, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock notes data
const mockNotes = [
  {
    id: "1",
    title: "Quadratic Equations Formula",
    subject: "Mathematics",
    topic: "Algebra",
    updatedAt: "2 hours ago",
    preview: "The quadratic formula is x = (-b +/- sqrt(b^2 - 4ac)) / 2a...",
  },
  {
    id: "2",
    title: "Chemical Balancing Tips",
    subject: "Science",
    topic: "Chemistry",
    updatedAt: "Yesterday",
    preview: "Always balance metals first, then non-metals, hydrogen, oxygen last...",
  },
  {
    id: "3",
    title: "Triangle Properties",
    subject: "Mathematics",
    topic: "Geometry",
    updatedAt: "3 days ago",
    preview: "Sum of angles = 180 degrees. Types: equilateral, isosceles, scalene...",
  },
];

const subjectColors: Record<string, string> = {
  Mathematics: "bg-primary-100 text-primary-700",
  Science: "bg-success-100 text-success-700",
  English: "bg-warning-100 text-warning-600",
};

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[var(--font-poppins)] text-2xl font-bold text-neutral-900">
            Notes
          </h1>
          <p className="text-neutral-500">
            Your personal study notes and quick references
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {/* Notes Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockNotes.map((note) => (
          <Card
            key={note.id}
            className="cursor-pointer transition-shadow hover:shadow-elevated"
          >
            <CardContent className="p-4">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                  <FileText className="h-5 w-5 text-neutral-600" />
                </div>
                <span className="text-xs text-neutral-500">{note.updatedAt}</span>
              </div>
              <h3 className="mb-1 font-semibold text-neutral-900">{note.title}</h3>
              <div className="mb-2 flex items-center gap-2">
                <Badge
                  className={subjectColors[note.subject] || "bg-neutral-100"}
                >
                  {note.subject}
                </Badge>
                <Badge variant="outline">{note.topic}</Badge>
              </div>
              <p className="line-clamp-2 text-sm text-neutral-500">
                {note.preview}
              </p>
            </CardContent>
          </Card>
        ))}

        {/* Add New Note Card */}
        <Card className="cursor-pointer border-2 border-dashed border-neutral-300 bg-neutral-50 transition-colors hover:border-primary-300 hover:bg-primary-50/30">
          <CardContent className="flex h-full min-h-[180px] flex-col items-center justify-center p-4 text-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
              <Plus className="h-6 w-6 text-neutral-500" />
            </div>
            <p className="font-medium text-neutral-600">Create New Note</p>
            <p className="text-sm text-neutral-500">Add to your collection</p>
          </CardContent>
        </Card>
      </div>

      {/* Free Tier Notice */}
      <Card className="bg-warning-50 border-warning-200">
        <CardContent className="flex items-center gap-4 p-4">
          <BookOpen className="h-8 w-8 text-warning-600" />
          <div className="flex-1">
            <p className="font-medium text-warning-700">
              Free Plan: 3 of 5 notes used
            </p>
            <p className="text-sm text-warning-600">
              Upgrade to Premium for unlimited notes
            </p>
          </div>
          <Button size="sm">Upgrade</Button>
        </CardContent>
      </Card>
    </div>
  );
}

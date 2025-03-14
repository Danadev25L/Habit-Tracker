"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Training = {
  id: number
  title: string
  description: string
  category: string
}

const categories = ["Exercise", "Coding", "Reading", "Studying"]

export function TrainingSection() {
  const [trainings, setTrainings] = useState<Training[]>([
    { id: 1, title: "Morning Run", description: "30 minutes jog in the park", category: "Exercise" },
    { id: 2, title: "React Project", description: "Work on personal React project", category: "Coding" },
    { id: 3, title: "Book Chapter", description: "Read one chapter of current book", category: "Reading" },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentTraining, setCurrentTraining] = useState<Training | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newCategory, setNewCategory] = useState("Exercise")

  const { toast } = useToast()

  const handleAddTraining = () => {
    if (newTitle.trim() === "") return

    const newTraining = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      category: newCategory,
    }

    setTrainings([...trainings, newTraining])
    setNewTitle("")
    setNewDescription("")
    setNewCategory("Exercise")
    setIsAddDialogOpen(false)

    toast({
      title: "Training Added",
      description: `New training "${newTitle}" has been added.`,
      duration: 3000,
    })
  }

  const handleEditTraining = () => {
    if (!currentTraining || newTitle.trim() === "") return

    setTrainings(
      trainings.map((training) =>
        training.id === currentTraining.id
          ? { ...training, title: newTitle, description: newDescription, category: newCategory }
          : training,
      ),
    )

    setCurrentTraining(null)
    setNewTitle("")
    setNewDescription("")
    setNewCategory("Exercise")
    setIsEditDialogOpen(false)

    toast({
      title: "Training Updated",
      description: `Training "${newTitle}" has been updated.`,
      duration: 3000,
    })
  }

  const handleDeleteTraining = (id: number) => {
    const trainingToDelete = trainings.find((t) => t.id === id)
    setTrainings(trainings.filter((training) => training.id !== id))

    toast({
      title: "Training Deleted",
      description: `Training "${trainingToDelete?.title}" has been deleted.`,
      duration: 3000,
    })
  }

  const openEditDialog = (training: Training) => {
    setCurrentTraining(training)
    setNewTitle(training.title)
    setNewDescription(training.description)
    setNewCategory(training.category)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Training Activities
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-colors">
              <Plus className="mr-2 h-4 w-4" />
              Add Training
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Training</DialogTitle>
              <DialogDescription>Create a new training activity to track.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Morning Workout"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe your training activity"
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <RadioGroup value={newCategory} onValueChange={setNewCategory}>
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <RadioGroupItem value={category} id={`category-${category}`} />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddTraining}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Add Training
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trainings.map((training) => (
          <Card
            key={training.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-purple-200 dark:hover:shadow-purple-900/20 border-purple-100 dark:border-purple-900/50"
          >
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-purple-100 dark:border-purple-900/50">
              <CardTitle className="text-purple-800 dark:text-purple-300">{training.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <CardDescription>{training.description}</CardDescription>
              <div className="mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                Category: {training.category}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => openEditDialog(training)}
                className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/30"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteTraining(training.id)}
                className="bg-pink-100 text-pink-700 hover:bg-pink-200 hover:text-pink-800 dark:bg-pink-900/30 dark:text-pink-400 dark:hover:bg-pink-900/50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Training</DialogTitle>
            <DialogDescription>Update your training activity details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input id="edit-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <RadioGroup value={newCategory} onValueChange={setNewCategory}>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <RadioGroupItem value={category} id={`edit-category-${category}`} />
                    <Label htmlFor={`edit-category-${category}`}>{category}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleEditTraining}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


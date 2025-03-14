"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialFeed() {
  // Mock data for social feed
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
      completedToday: true,
      streak: 7,
      likes: 3,
      liked: false,
    },
    {
      id: 2,
      name: "Sam Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SW",
      completedToday: true,
      streak: 12,
      likes: 5,
      liked: false,
    },
    {
      id: 3,
      name: "Taylor Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TS",
      completedToday: false,
      streak: 0,
      likes: 0,
      liked: false,
    },
    {
      id: 4,
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JL",
      completedToday: true,
      streak: 21,
      likes: 8,
      liked: true,
    },
  ])

  const toggleLike = (userId: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            likes: user.liked ? user.likes - 1 : user.likes + 1,
            liked: !user.liked,
          }
        }
        return user
      }),
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Friends Activity
          </CardTitle>
          <CardDescription>See how your friends are doing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between border-b pb-3 last:border-0 hover:bg-muted/30 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.completedToday ? (
                      <span className="flex items-center text-purple-600 dark:text-purple-400 font-medium">
                        <Check className="mr-1 h-4 w-4" /> Completed today
                      </span>
                    ) : (
                      "Not completed today"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                  <span className="font-medium text-purple-700 dark:text-purple-300">{user.streak}</span> day streak
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={user.liked ? "text-pink-600 dark:text-pink-400" : ""}
                  onClick={() => toggleLike(user.id)}
                >
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  <span>{user.likes}</span>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}


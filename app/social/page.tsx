import { SocialFeed } from "@/components/social-feed"

export default function SocialPage() {
  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
        Social Feed
      </h2>
      <SocialFeed />
    </div>
  )
}


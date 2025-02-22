
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, MessageSquare, Heart, Share2 } from "lucide-react";

interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Sarah J.",
      content: "Just completed a 10-minute meditation session. Feeling peaceful and centered. Anyone else practice mindfulness daily?",
      likes: 15,
      comments: 5,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Mike R.",
      content: "Had a breakthrough in therapy today. Remember, it's okay to ask for help when you need it. We're all in this together! 💪",
      likes: 24,
      comments: 8,
      timestamp: "4 hours ago"
    }
  ]);
  const [newPost, setNewPost] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const post: Post = {
      id: Date.now(),
      author: "You",
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: "Just now"
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Community</h1>
            <p className="text-muted-foreground">Connect with others on their mental health journey</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full p-3 rounded-md border bg-background mb-4"
                placeholder="Share your thoughts with the community..."
                rows={3}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Share Post
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {post.author[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold">{post.author}</h3>
                      <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <p className="mb-4">{post.content}</p>
                <div className="flex gap-6">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Heart className="h-4 w-4 mr-2" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Community;

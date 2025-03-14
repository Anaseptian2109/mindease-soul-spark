
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, MessageSquare, Heart, Share2, Send, Filter, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  liked: boolean;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

// Sample users for comments
const communityUsers = [
  "Sarah J.", "Mike R.", "Alex T.", "Jamie L.", "Taylor P.", 
  "Jordan K.", "Casey B.", "Morgan W.", "Avery S.", "Riley N."
];

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('communityPosts');
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    
    // Default posts if nothing in localStorage
    return [
      {
        id: 1,
        author: "Sarah J.",
        content: "Just completed a 10-minute meditation session. Feeling peaceful and centered. Anyone else practice mindfulness daily?",
        likes: 15,
        comments: [
          {
            id: 101,
            author: "Alex T.",
            content: "I try to meditate every morning for 5 minutes. It really helps set a positive tone for the day!",
            timestamp: "1 hour ago"
          }
        ],
        timestamp: "2 hours ago",
        liked: false
      },
      {
        id: 2,
        author: "Mike R.",
        content: "Had a breakthrough in therapy today. Remember, it's okay to ask for help when you need it. We're all in this together! 💪",
        likes: 24,
        comments: [
          {
            id: 201,
            author: "Jamie L.",
            content: "So proud of you for sharing this. Therapy has been life-changing for me too.",
            timestamp: "3 hours ago"
          },
          {
            id: 202,
            author: "Taylor P.",
            content: "Thank you for the reminder. Sometimes it's hard to reach out, but it's always worth it.",
            timestamp: "2 hours ago"
          }
        ],
        timestamp: "4 hours ago",
        liked: false
      }
    ];
  });
  
  const [newPost, setNewPost] = useState("");
  const [commentText, setCommentText] = useState("");
  const [activePost, setActivePost] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'popular' | 'recent'>('all');
  const commentInputRef = useRef<HTMLInputElement>(null);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('communityPosts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.trim()) {
      toast({
        title: "Empty Post",
        description: "Please write something before sharing",
        variant: "destructive"
      });
      return;
    }
    
    const post: Post = {
      id: Date.now(),
      author: "You",
      content: newPost,
      likes: 0,
      comments: [],
      timestamp: "Just now",
      liked: false
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
    
    toast({
      title: "Post Shared",
      description: "Your post has been shared with the community"
    });
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLiked = !post.liked;
        return {
          ...post,
          likes: newLiked ? post.likes + 1 : post.likes - 1,
          liked: newLiked
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please write something before commenting",
        variant: "destructive"
      });
      return;
    }
    
    const newComment: Comment = {
      id: Date.now(),
      author: "You",
      content: commentText,
      timestamp: "Just now"
    };
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
    
    setCommentText("");
    
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the post"
    });
  };

  const toggleComments = (postId: number) => {
    setActivePost(activePost === postId ? null : postId);
    setTimeout(() => {
      if (commentInputRef.current && activePost !== postId) {
        commentInputRef.current.focus();
      }
    }, 100);
  };

  const handleShare = (postId: number) => {
    toast({
      title: "Post Shared",
      description: "Post link copied to clipboard"
    });
  };

  // Filter posts based on selected filter
  const filteredPosts = [...posts].sort((a, b) => {
    if (filter === 'popular') {
      return b.likes - a.likes;
    } else if (filter === 'recent') {
      // This is a simplified sort based on timestamp string
      // In a real app, you'd use actual date objects
      return b.id - a.id;
    }
    return b.id - a.id; // Default to recent for 'all'
  });

  // Simulate community activity
  useEffect(() => {
    // Auto-generate a random comment every 30 seconds
    const randomCommentInterval = setInterval(() => {
      if (posts.length > 0 && Math.random() > 0.5) {
        const randomPostIndex = Math.floor(Math.random() * posts.length);
        const randomPost = posts[randomPostIndex];
        const randomUser = communityUsers[Math.floor(Math.random() * communityUsers.length)];
        
        const randomResponses = [
          "I completely agree with you! Thanks for sharing.",
          "This is so helpful. I've been dealing with something similar.",
          "Thank you for your vulnerability. It means a lot to this community.",
          "I'm going to try this approach. Sounds like it could really help.",
          "Has anyone else tried this? I'd love to hear more experiences.",
          "This resonates with me so much. Thank you!",
          "Sending support your way. We're all in this together.",
          "What a great perspective! I hadn't thought of it that way."
        ];
        
        const randomComment: Comment = {
          id: Date.now(),
          author: randomUser,
          content: randomResponses[Math.floor(Math.random() * randomResponses.length)],
          timestamp: "Just now"
        };
        
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === randomPost.id 
              ? { ...post, comments: [...post.comments, randomComment] }
              : post
          )
        );
        
        toast({
          title: "New Comment",
          description: `${randomUser} commented on a post`
        });
      }
    }, 30000);
    
    return () => clearInterval(randomCommentInterval);
  }, [posts, toast]);

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
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Be kind and respectful to others
                </p>
                <Button type="submit">
                  Share Post
                </Button>
              </div>
            </form>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Community Posts</h2>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                className="bg-background border rounded-md p-2 text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <option value="all">All Posts</option>
                <option value="popular">Most Liked</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
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
                  <div className="flex gap-6 mb-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={post.liked ? "text-primary" : "text-muted-foreground"}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${post.liked ? "fill-primary" : ""}`} />
                      {post.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={activePost === post.id ? "text-primary" : "text-muted-foreground"}
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {post.comments.length}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground"
                      onClick={() => handleShare(post.id)}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  
                  {activePost === post.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t pt-4"
                    >
                      <div className="space-y-4 mb-4">
                        {post.comments.map(comment => (
                          <div key={comment.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs">
                              {comment.author[0]}
                            </div>
                            <div className="flex-1 bg-background p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Input
                          ref={commentInputRef}
                          placeholder="Write a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          size="icon"
                          onClick={() => handleAddComment(post.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No posts yet. Be the first to share!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Community;

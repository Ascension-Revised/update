import React, { useState, useEffect } from 'react';

interface Post {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: { user: string; content: string; timestamp: string }[];
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts from the backend (placeholder for now)
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleLike = (postId: string) => {
    // Logic to handle liking a post
    console.log(`Liked post ${postId}`);
  };

  const handleComment = (postId: string, comment: string) => {
    // Logic to handle commenting on a post
    console.log(`Commented on post ${postId}: ${comment}`);
  };

  return (
    <div className="feed">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.user}</h3>
          <p>{post.content}</p>
          <small>{new Date(post.timestamp).toLocaleString()}</small>
          <div>
            <button onClick={() => handleLike(post.id)}>Like ({post.likes})</button>
            <button onClick={() => handleComment(post.id, 'Nice post!')}>Comment</button>
          </div>
          <div className="comments">
            {post.comments.map((comment, index) => (
              <div key={index}>
                <strong>{comment.user}</strong>: {comment.content}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
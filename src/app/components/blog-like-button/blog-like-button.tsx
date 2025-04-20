"use client";

import { useState } from "react";

type LikeButtonProps = {
  slug: string;
  initialLikes: number;
};

export default function LikeButton({ slug, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (liked || loading) return; // prevent double likes
    setLoading(true);

    try {
      const res = await fetch(`/api/blogs/${slug}/like`, {
        method: "POST",
      });

      const data = await res.json();
      if (data.likes !== undefined) {
        setLikes(data.likes);
        setLiked(true);
      }
    } catch (err) {
      console.error("Failed to like post", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="text-sm mt-4 px-3 py-1 border rounded hover:bg-pink-100 disabled:opacity-50"
      disabled={liked || loading}
    >
      ❤️ {likes} {liked ? "Liked" : "Like"}
    </button>
  );
}

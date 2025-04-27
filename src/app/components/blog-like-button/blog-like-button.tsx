"use client";

import { useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import s from "./blog-like-button.module.scss";

type LikeButtonProps = {
  blogId: number;
  initialLikes: number;
};

export default function LikeButton({ blogId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs/${blogId}/like`,
        {
          method: "POST",
        },
      );

      const data = await res.json();
      setLikes(data.likes);
      setLiked(true);
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    } catch (err) {
      console.error("Failed to like post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`${s.container} ${isAnimating ? s.animate : ""}`}
      disabled={liked || loading}
    >
      <FontAwesomeIcon icon={faHeart} className={s.icon} />
      <p>{likes}</p>
    </button>
  );
}

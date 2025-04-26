"use client";
import { useState } from "react";

import { useConfessStore } from "@/store/useConfessStore";
import { addPost } from "@/lib/functions";

export default function PostForm() {
  const [content, setContent] = useState("");
  const setIsConfessing = useConfessStore((state) => state.setIsConfessing);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addPost(content)
    } catch (error) {
      console.log(error)
    }
    setIsConfessing(false);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mb-6 bg-white p-4 rounded-xl shadow`}
    >
      <textarea
        className="w-full p-2 rounded border border-gray-300"
        placeholder="Say something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Post
      </button>
    </form>
  );
}

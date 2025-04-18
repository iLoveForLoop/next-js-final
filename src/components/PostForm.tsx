"use client";
import { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getSessionId } from "../utils/session";

export default function PostForm() {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const now = Timestamp.now();
    const expiresAt = Timestamp.fromDate(
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    );

    await addDoc(collection(db, "posts"), {
      content,
      createdAt: now,
      expiresAt,
      sessionId: getSessionId(),
      reactions: { like: 0, laugh: 0, cry: 0 },
    });
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white p-4 rounded-xl shadow"
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

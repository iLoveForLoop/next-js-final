"use client";
import { db } from "../lib/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getSessionId } from "../utils/session";

export default function PostCard({ post }: any) {
  const sessionId = getSessionId();
  const isOwner = post.sessionId === sessionId;

  const react = async (type: string) => {
    const ref = doc(db, "posts", post.id);
    await updateDoc(ref, {
      [`reactions.${type}`]: post.reactions[type] + 1,
    });
  };

  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", post.id));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-lg">{post.content}</p>
      <div className="mt-2 flex gap-2">
        <button onClick={() => react("like")}>❤️ {post.reactions.like}</button>
        <button onClick={() => react("laugh")}>
          😂 {post.reactions.laugh}
        </button>
        <button onClick={() => react("cry")}>😢 {post.reactions.cry}</button>
        {isOwner && (
          <button onClick={deletePost} className="text-red-500 ml-auto">
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
}

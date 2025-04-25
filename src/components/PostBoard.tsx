"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
  limit,
} from "firebase/firestore";
import PostCard from "./PostCard";

export default function PostBoard() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const now = Timestamp.now();
    const q = query(
      collection(db, "posts"),
      where("expiresAt", ">", now),
      orderBy("createdAt", "desc"),
      limit(12)
    );

    const kill = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    });

    return () => kill();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-700">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <div className="col-span-3 text-center py-12 text-gray-500">
          No confessions yet. Be the first to share!
        </div>
      )}
    </div>
  );
}

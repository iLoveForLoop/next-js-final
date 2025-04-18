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
      limit(50)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

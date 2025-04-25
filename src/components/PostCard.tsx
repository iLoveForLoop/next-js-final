"use client";
import { db } from "../lib/firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { getSessionId } from "../utils/session";

export default function PostCard({ post }: any) {
  const sessionId = getSessionId();
  const isOwner = post.sessionId === sessionId;

  async function react(newReaction: string) {
    const sessionId = getSessionId();
    const postRef = doc(db, "posts", post.id);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data();
      const userLikes = postData.userLikes || [];

      const existing = userLikes.find(
        (like: any) => like.sessionId === sessionId
      );

      if (!existing) {
        await updateDoc(postRef, {
          [`reactions.${newReaction}`]:
            (postData.reactions?.[newReaction] || 0) + 1,
          userLikes: [...userLikes, { sessionId, reaction: newReaction }],
        });
      } else {
        if (existing.reaction !== newReaction) {
          const updatedUserLikes = userLikes.map((like: any) =>
            like.sessionId === sessionId
              ? { ...like, reaction: newReaction }
              : like
          );

          await updateDoc(postRef, {
            [`reactions.${existing.reaction}`]:
              (postData.reactions?.[existing.reaction] || 1) - 1,
            [`reactions.${newReaction}`]:
              (postData.reactions?.[newReaction] || 0) + 1,
            userLikes: updatedUserLikes,
          });
        }
        // If same reaction, do nothing
      }
    }
  }

  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", post.id));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-lg">{post.content}</p>
      <div className="mt-2 flex gap-2">
        <button className="cursor-pointer" onClick={() => react("like")}>
          ❤️ {post.reactions.like}
        </button>
        <button className="cursor-pointer" onClick={() => react("laugh")}>
          😂 {post.reactions.laugh}
        </button>
        <button className="cursor-pointer" onClick={() => react("cry")}>
          😢 {post.reactions.cry}
        </button>
        {isOwner && (
          <button onClick={deletePost} className="text-red-500 ml-auto">
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
}

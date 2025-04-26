"use client";
import { getSessionId } from "../utils/session";
import { reactPost, delPost } from "@/lib/functions";
import EditForm from "./EditForm";


export default function PostCard({ post }: any) {
  const sessionId = getSessionId();
  const isOwner = post.sessionId === sessionId;

  async function react(newReaction: string) {

    try {
      await reactPost(newReaction, post.id)
    } catch (error) {
      console.log(error)
    }

    
  }

  const deletePost = async () => {
    try {
        delPost(post.id)
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-25">
        <EditForm/>
      </div>
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
          <>
            <button onClick={deletePost} className="btn bg-red-300">
            Delete
          </button>
          <button  className="btn bg-blue-300">
            Edit
          </button>
          </>
          
        )}
      </div>
    </div>
  );
}

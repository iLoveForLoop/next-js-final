"use client";
import PostBoard from "@/components/PostBoard";
import PostForm from "@/components/PostForm";
import ConfessButton from "@/components/ConfessButton";
import { useConfessStore } from "@/store/useConfessStore";

export default function Home() {
  const setIsConfessing = useConfessStore((state) => state.setIsConfessing);
  const isConfessing = useConfessStore((state) => state.isConfessing);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-0">
          <h1 className="text-5xl font-bold mb-2 text-purple-800">
            Anonymous Bulletin Board
          </h1>
          <p className="text-gray-600">
            Share your anonymous thoughts, secrets, and confessions
          </p>
        </div>
        {isConfessing && (
          <div
            onClick={(e) =>
              e.target === e.currentTarget && setIsConfessing(!isConfessing)
            }
            className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black/50 z-50"
          >
            <PostForm />
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Recent Post
          </h2>

          <PostBoard  />
        </div>
      </div>

      <ConfessButton
        label="Confess"
        onClick={() => setIsConfessing(!isConfessing)}
      />
    </main>
  );
}

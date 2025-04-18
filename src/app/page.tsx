import PostBoard from "@/components/PostBoard";
import PostForm from "@/components/PostForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">MDC Anonimity</h1>
        <PostForm />
        <PostBoard />
      </div>
    </main>
  );
}

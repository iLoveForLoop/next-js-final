"use client"
import React, { useState } from 'react'

export default function EditForm({post}: any) {
  const [content, setContent ] = useState(post.content)

  const handleSubmit = () => {
    
  }
  return (
    <div>
      <form
      onSubmit={handleSubmit}
      className={`mb-6 bg-white p-4 rounded-xl shadow`}
    >
      <textarea
        className="w-full p-2 rounded border border-gray-300"
        placeholder="Say something..."
        value={post.content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Post
      </button>
    </form>
    </div>
  )
}


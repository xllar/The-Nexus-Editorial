import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';

interface CommentType {
  name: string;
  comment: string;
}

export default function Comment({ postSlug }: { postSlug: string }) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch comments on load
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/auth/comment?postSlug=${postSlug}`);
        setComments(res.data || []);
      } catch (err) {
        console.error('Failed to load comments', err);
      }
    };

    fetchComments();
  }, [postSlug]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error state
    setIsLoading(true)
    if (!comment) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const res = await axios.post('/api/auth/comment', {
        name: session?.user?.name || 'Anonymous',
        email: session?.user?.email,
        comment,
        postSlug,
      });

      if (res.status === 200) {
        setSuccess('Comment submitted successfully!');
        setComment(''); // Clear comment input
        setComments([...comments, res.data.result]); // Add new comment to the list
      } else {
        setError('Failed to submit comment.');
      }
    } catch (err) {
      setError('Failed to submit comment.');
    }finally{
      setIsLoading(false);
    }
  };

  // Loading state
  if (status === 'loading') {
    return <p>Loading comments...</p>;
  }

  return (
    <section className="my-8">
      <h3 className="text-2xl font-semibold mb-6">Comments:</h3>

      {/* Comment list */}
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((cmt, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="font-semibold">{cmt.name}</p>
              <p className="text-gray-700">{cmt.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      {session ? (
        <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 border rounded-lg shadow-md">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <label htmlFor="comment" className="block mb-2 font-medium text-gray-700">
            Leave a Comment:
          </label>
          <textarea
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Type your comment here..."
          ></textarea>

          <p className="mt-4 text-sm text-gray-500">
            Logged in as <strong>{session.user?.email}</strong>
          </p>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
           {isLoading ?'loading...':'Submit Comment'}
          </button>
        </form>
      ) : (
        <div className="mt-6">
          <p className="text-gray-500">Please sign in to leave a comment.</p>
          <button
            onClick={() => signIn()}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Sign In
          </button>
        </div>
      )}
    </section>
  );
}

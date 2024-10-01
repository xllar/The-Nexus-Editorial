import { NextResponse } from 'next/server';
import client from '@/app/utils/sanityClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, comment, postSlug } = body;

    if (!name || !email || !comment || !postSlug) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Find the post ID using the slug
    const postQuery = `*[_type == "post" && slug.current == $slug][0]{_id}`;
    const post = await client.fetch(postQuery, { slug: postSlug });

    if (!post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    const result = await client.create({
      _type: 'comment',
      name,
      email,
      comment,
      post: { _type: 'reference', _ref: post._id },
      approved: true,
    });

    return NextResponse.json({ message: 'Comment submitted successfully!', result }, { status: 200 });
  } catch (error) {
    console.error('Error submitting comment:', error);
    return NextResponse.json({ error: 'Failed to submit the comment.' }, { status: 500 });
  }
}

// Add GET handler to fetch comments for a specific post
export async function GET(req: Request) {
  const postSlug = new URL(req.url).searchParams.get('postSlug');

  if (!postSlug) {
    return NextResponse.json({ error: 'Post slug is required.' }, { status: 400 });
  }

  try {
    const commentsQuery = `*[_type == "comment" && post->slug.current == $slug && approved == true]{name, comment}`;
    const comments = await client.fetch(commentsQuery, { slug: postSlug });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments.' }, { status: 500 });
  }
}
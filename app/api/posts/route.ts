import { NextResponse } from 'next/server';

// Placeholder data for posts
const posts = [
  {
    id: '1',
    user: 'John Doe',
    content: 'This is my first post!',
    timestamp: new Date().toISOString(),
    likes: 10,
    comments: [
      { user: 'Jane Smith', content: 'Great post!', timestamp: new Date().toISOString() },
    ],
  },
  {
    id: '2',
    user: 'Jane Smith',
    content: 'Hello, world!',
    timestamp: new Date().toISOString(),
    likes: 5,
    comments: [],
  },
];

export async function GET() {
  return NextResponse.json(posts);
}
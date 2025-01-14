import { Metadata } from 'next';
import { PostList } from '@/components/posts/PostList';
import { Pagination } from '@/components/ui/Pagination';

export const metadata: Metadata = {
  title: 'Home | Blog Management System',
  description: 'Discover the latest blog posts from our community',
};

const POSTS_PER_PAGE = 9;

async function getPosts(page: number = 1) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}&limit=${POSTS_PER_PAGE}`,
      {
        next: { revalidate: 60 },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      pagination: {
        total: 0,
        page: 1,
        limit: POSTS_PER_PAGE,
        totalPages: 0
      }
    };
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const { posts, pagination } = await getPosts(currentPage);

  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero__title">
          Welcome to Blog Management System
        </h1>
        <p className="hero__subtitle">
          Discover interesting articles and share your thoughts
        </p>
      </section>

      <section className="content">
        <h2 className="content__title">
          Latest Posts {pagination.total > 0 && `(${pagination.total})`}
        </h2>
        {posts.length > 0 ? (
          <>
            <PostList posts={posts} />
            {pagination.totalPages > 1 && (
              <div className="content__pagination">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={(page) => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('page', page.toString());
                    window.location.href = url.toString();
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <p className="content__empty">No posts found.</p>
        )}
      </section>
    </div>
  );
} 
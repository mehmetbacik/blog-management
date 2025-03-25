interface FeaturedEmptyStateProps {
  message: string;
}

export function FeaturedEmptyState({ message }: FeaturedEmptyStateProps) {
  return <p className="featured-posts__postList--empty">{message}</p>;
}

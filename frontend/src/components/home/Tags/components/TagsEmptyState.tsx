interface TagsEmptyStateProps {
    message: string;
  }
  
  export function TagsEmptyState({ message }: TagsEmptyStateProps) {
    return <p className="tags__list--empty">{message}</p>;
  }
  
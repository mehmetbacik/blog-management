import Link from "next/link";

interface TagsListProps {
  tags: string[];
}

export function TagsList({ tags }: TagsListProps) {
  return (
    <div className="tags__list">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/search?tags=${tag}`}
          className="tags__list--item"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}

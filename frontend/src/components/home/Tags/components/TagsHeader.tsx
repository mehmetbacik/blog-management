interface TagsHeaderProps {
  title: string;
  description: string;
}

export function TagsHeader({ title, description }: TagsHeaderProps) {
  return (
    <header className="tags__header">
      <h2 className="tags__header--title">{title}</h2>
      <p className="tags__header--description">{description}</p>
    </header>
  );
}

interface FeaturedHeaderProps {
  title: string;
  description: string;
}

export function FeaturedHeader({ title, description }: FeaturedHeaderProps) {
  return (
    <header className="featured-posts__header">
      <h2 className="featured-posts__header--title">{title}</h2>
      <p className="featured-posts__header--description">{description}</p>
    </header>
  );
}

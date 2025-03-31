interface AboutSectionProps {
  title: string;
  content: string;
}

export default function AboutSection({ title, content }: AboutSectionProps) {
  return (
    <section className="about__section">
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
}

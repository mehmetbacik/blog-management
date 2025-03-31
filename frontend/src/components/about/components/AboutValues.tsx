const values = [
  {
    title: "Transparency",
    description: "Open communication and honesty are our core principles.",
  },
  {
    title: "Quality",
    description: "Content quality and user experience are our top priorities.",
  },
  {
    title: "Community",
    description: "We grow together with a strong sense of community.",
  },
];

export default function AboutValues() {
  return (
    <section className="about__section">
      <h2>Our Values</h2>
      <div className="about__values">
        {values.map((value, index) => (
          <div className="about__value-item" key={index}>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

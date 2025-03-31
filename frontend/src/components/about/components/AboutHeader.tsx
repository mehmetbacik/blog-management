import Image from "next/image";

export default function AboutHeader() {
  return (
    <div className="about__header">
      <h1 className="about__title">About Us</h1>
      <div className="about__image">
        <Image
          src="/img/about.jpg"
          alt="BlogHub Team"
          width={1200}
          height={600}
          priority
        />
      </div>
    </div>
  );
}

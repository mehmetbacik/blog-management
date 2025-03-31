import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us - BlogHub",
  description: "Detailed information about the BlogHub platform",
};

export default function AboutPage() {
  return (
    <div className="about">
      <div className="container">
        <div className="about__wrapper">
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
          <div className="about__content">
            <section className="about__section">
              <h2>Our Mission</h2>
              <p>
                At BlogHub, our goal is to provide a free platform for writers
                and readers. We aim to create a space where everyone can share
                their thoughts, exchange knowledge, and grow within the
                community.
              </p>
            </section>
            <section className="about__section">
              <h2>Our Vision</h2>
              <p>
                We strive to be a leading platform in digital publishing and
                continuously improve to offer the best blogging experience to
                our users. With innovative features and a user-friendly
                interface, we make a difference.
              </p>
            </section>
            <section className="about__section">
              <h2>Our Values</h2>
              <div className="about__values">
                <div className="about__value-item">
                  <h3>Transparency</h3>
                  <p>Open communication and honesty are our core principles.</p>
                </div>
                <div className="about__value-item">
                  <h3>Quality</h3>
                  <p>
                    Content quality and user experience are our top priorities.
                  </p>
                </div>
                <div className="about__value-item">
                  <h3>Community</h3>
                  <p>We grow together with a strong sense of community.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

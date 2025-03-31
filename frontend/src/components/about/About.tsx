import { Metadata } from "next";
import AboutHeader from "./components/AboutHeader";
import AboutSection from "./components/AboutSection";
import AboutValues from "./components/AboutValues";

export default function AboutPage() {
  return (
    <>
      <AboutHeader />
      <div className="about__content">
        <AboutSection
          title="Our Mission"
          content="At BlogHub, our goal is to provide a free platform for writers and readers. We aim to create a space where everyone can share their thoughts, exchange knowledge, and grow within the community."
        />
        <AboutSection
          title="Our Vision"
          content="We strive to be a leading platform in digital publishing and continuously improve to offer the best blogging experience to our users. With innovative features and a user-friendly interface, we make a difference."
        />
        <AboutValues />
      </div>
    </>
  );
}

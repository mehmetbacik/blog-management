import { Metadata } from "next";
import Image from "next/image";

import About from "@/components/about/About";

export const metadata: Metadata = {
  title: "About Us - BlogHub",
  description: "Detailed information about the BlogHub platform",
};

export default function AboutPage() {
  return (
    <div className="about">
      <div className="container">
        <div className="about__wrapper">
          <About />
        </div>
      </div>
    </div>
  );
}

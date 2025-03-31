import { Metadata } from 'next';
import Contact from '@/components/contact/Contact';

export const metadata: Metadata = {
  title: 'Contact - BlogHub',
  description: 'Get in touch with BlogHub',
};

export default function ContactPage() {
  return (
    <div className="contact">
      <div className="container">
        <div className="contact__wrapper">
          <Contact />
        </div>
      </div>
    </div>
  );
} 
import { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact - BlogHub',
  description: 'Get in touch with BlogHub',
};

export default function ContactPage() {
  return (
    <div className="contact">
      <div className="container">
        <div className="contact__wrapper">
          <div className="contact__header">
            <h1 className="contact__title">Get in Touch</h1>
            <p className="contact__subtitle">
              Have questions, suggestions, or feedback? We'd love to hear from you.
            </p>
          </div>
          <div className="contact__content">
            <div className="contact__info">
              <div className="contact__info-item">
                <h3>Address</h3>
                <p>Istanbul, Turkey</p>
              </div>
              <div className="contact__info-item">
                <h3>Email</h3>
                <p>info@bloghub.com</p>
              </div>
              <div className="contact__info-item">
                <h3>Phone</h3>
                <p>+90 (212) XXX XX XX</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
} 
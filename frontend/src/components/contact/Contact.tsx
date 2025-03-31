import ContactForm from "./components/ContactForm";
import ContactHeader from "./components/ContactHeader";
import ContactInfo from "./components/ContactInfo";

export default function ContactPage() {
  return (
    <>
      <ContactHeader />
      <div className="contact__content">
        <ContactInfo />
        <ContactForm />
      </div>
    </>
  );
}

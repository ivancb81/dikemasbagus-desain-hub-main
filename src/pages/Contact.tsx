
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import SubmissionSuccess from '@/components/contact/SubmissionSuccess';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow mt-16">
        {/* Hero Section */}
        <ContactHero />

        {/* Form Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-2xl mx-auto bg-white shadow-md p-6 md:p-8 rounded">
            {isSubmitted ? (
              <SubmissionSuccess onReset={() => setIsSubmitted(false)} />
            ) : (
              <ContactForm onFormSubmit={setIsSubmitted} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

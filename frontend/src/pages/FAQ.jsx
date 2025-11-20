import React from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "How do I track my order?",
      a: "Go to Profile → Orders to see real-time status. You'll also receive email updates with tracking links.",
    },
    {
      q: "Can I cancel or edit my order?",
      a: "You can cancel or edit within 1 hour of placing the order (before dispatch). After dispatch, contact support.",
    },
    {
      q: "Do you offer gift wrapping?",
      a: "Yes! Choose gift wrap at checkout. You can add a personal note as well.",
    },
    {
      q: "Are all books brand new?",
      a: "We primarily sell new books. If a title is pre-loved, it will be clearly labeled with condition details.",
    },
    {
      q: "Which payment methods do you accept?",
      a: "Visa, MasterCard, Amex, Cash on Delivery (selected locations), and popular digital wallets.",
    },
  ];

  return (
    <section className="min-h-screen bg-[#3B2F2F] text-[#F2E8D5] py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFD9A8] drop-shadow">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-[#F2E8D5]/80 text-lg">
            Answers to the most common questions about orders, shipping, and policies.
          </p>
        </header>

        {/* FAQ Accordion */}
        <div className="space-y-5">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="
                group rounded-xl border border-[#8B5E3C]/40 
                bg-[#4A3B34]/80 backdrop-blur-sm p-5
                open:shadow-lg open:shadow-black/40 transition-all
              "
            >
              <summary className="
                cursor-pointer list-none font-semibold
                text-[#FFD9A8] text-lg flex items-center gap-2
              ">
                <span className="text-[#E85A4F] font-bold">Q{i + 1}.</span>
                {item.q}
              </summary>

              <p className="mt-3 text-[#F2E8D5]/90 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        {/* Contact section */}
        <p className="mt-10 text-sm text-center text-[#F2E8D5]/70">
          Still need help?  
          <a
            className="text-[#E85A4F] underline hover:text-[#FFD9A8] transition"
            href="mailto:support@bookhive.lk"
          >
            support@bookhive.lk
          </a>
        </p>
      </div>
    </section>
  );
}

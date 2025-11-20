import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-[#3B2F2F] text-[#F2E8D5] py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFD9A8] drop-shadow">
            Privacy Policy
          </h1>
          <p className="mt-3 text-[#F2E8D5]/80 text-lg">
            How we collect, use, and protect your data.
          </p>
        </header>

        {/* Main Card */}
        <article
          className="
            rounded-xl border border-[#8B5E3C]/40 
            bg-[#4A3B34]/80 backdrop-blur p-6 md:p-8 
            space-y-8 shadow-xl shadow-black/40
          "
        >

          {/* Section: Info We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Information We Collect
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-[#F2E8D5]/90">
              <li>Account data (name, email, phone)</li>
              <li>Order and payment details</li>
              <li>Usage data (pages visited, preferences)</li>
            </ul>
          </section>

          {/* Section: How We Use */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              How We Use Your Data
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-[#F2E8D5]/90">
              <li>Process orders and provide customer support</li>
              <li>Improve recommendations and user experience</li>
              <li>Send updates you opt into (unsubscribe anytime)</li>
            </ul>
          </section>

          {/* Section: Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Data Sharing
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90 leading-relaxed">
              We never sell your data. We only share it with trusted service partners 
              (payments, delivery, analytics) under strong privacy agreements.
            </p>
          </section>

          {/* Section: Security */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Security
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90 leading-relaxed">
              While no system can be 100% secure, we use industry-standard 
              security practices to protect your data and respond promptly 
              to potential issues.
            </p>
          </section>

          {/* Section: Your Choices */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Your Choices
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-[#F2E8D5]/90">
              <li>View and update your info from your Profile</li>
              <li>
                Request data export or deletion via{" "}
                <a
                  className="underline text-[#E85A4F] hover:text-[#FFD9A8]"
                  href="mailto:privacy@bookhive.lk"
                >
                  privacy@bookhive.lk
                </a>
              </li>
              <li>Adjust cookies & notifications in Settings</li>
            </ul>
          </section>

          <p className="text-sm text-[#F2E8D5]/50 mt-6">
            Effective date: 01 Jan 2025
          </p>
        </article>

      </div>
    </section>
  );
}

import React from "react";

export default function TermsConditions() {
  return (
    <section className="min-h-screen bg-[#3B2F2F] text-[#F2E8D5] py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFD9A8] drop-shadow">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-[#F2E8D5]/80 text-lg">
            Please read these terms carefully before using BookHive.
          </p>
        </header>

        {/* Content Card */}
        <article
          className="
            rounded-xl border border-[#8B5E3C]/40
            bg-[#4A3B34]/80 backdrop-blur
            p-6 md:p-8 space-y-8
            shadow-xl shadow-black/40
            leading-relaxed
          "
        >

          {/* 1. Use of Site */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              1. Use of the Site
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90">
              By accessing BookHive, you agree to comply with these terms and follow all applicable
              laws. Misuse of the platform, attempts to disrupt our systems, or any unauthorized
              access is strictly prohibited.
            </p>
          </section>

          {/* 2. Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              2. Accounts
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90">
              You are responsible for maintaining the confidentiality of your account credentials.
              All activities under your account are your responsibility. Ensure your information is
              accurate and updated.
            </p>
          </section>

          {/* 3. Orders & Pricing */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              3. Orders & Pricing
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90">
              Prices may change without prior notice. An order is confirmed only after successful
              payment authorization. BookHive reserves the right to cancel orders due to stock
              issues, system errors, or invalid information.
            </p>
          </section>

          {/* 4. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              4. Intellectual Property
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90">
              All content, images, logos, and design elements are the property of BookHive or its
              licensors. Do not reproduce, copy, or distribute any material without permission.
            </p>
          </section>

          {/* 5. Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              5. Liability
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90">
              To the maximum extent permitted by law, BookHive shall not be held responsible for
              indirect, incidental, or consequential damages arising from your use of our platform.
            </p>
          </section>

          {/* 6. Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              6. Changes to Terms
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90">
              These terms may be updated periodically. Continued use of our site following changes
              constitutes acceptance of the revised terms.
            </p>
          </section>

          <p className="text-sm text-[#D7C4A9]">
            Effective Date: <span className="font-medium">01 Jan 2025</span>
          </p>

        </article>
      </div>
    </section>
  );
}

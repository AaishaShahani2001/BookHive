import React from "react";

export default function ReturnsRefunds() {
  return (
    <section className="min-h-screen bg-[#3B2F2F] text-[#F2E8D5] py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFD9A8] drop-shadow">
            Returns & Refunds
          </h1>
          <p className="mt-3 text-[#F2E8D5]/80 text-lg">
            Our goal is to make returns simple and fair.
          </p>
        </header>

        {/* Main Content Card */}
        <article
          className="
            rounded-xl border border-[#8B5E3C]/40 
            bg-[#4A3B34]/80 backdrop-blur 
            p-6 md:p-8 space-y-8 
            shadow-xl shadow-black/40
          "
        >

          {/* Section: Return Window */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Return Window
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90 leading-relaxed">
              You can return eligible items within <strong>14 days</strong> of delivery in unused condition.
              Please keep original packaging and invoice.
            </p>
          </section>

          {/* Section: Non-returnable Items */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Non-returnable Items
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-[#F2E8D5]/90">
              <li>Gift cards, digital products</li>
              <li>Clearance items marked “Final Sale”</li>
              <li>Damaged items due to misuse</li>
            </ul>
          </section>

          {/* Section: How to Start a Return */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              How to Start a Return
            </h2>
            <ol className="mt-3 list-decimal pl-6 space-y-2 text-[#F2E8D5]/90">
              <li>Go to <span className="font-medium">Profile → Orders</span> and select the item.</li>
              <li>Choose <span className="font-medium">Request Return</span> and pick a reason.</li>
              <li>Print the label or schedule a pickup (where available).</li>
            </ol>
          </section>

          {/* Section: Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Refunds
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90 leading-relaxed">
              Once we receive and inspect the item, refunds are issued to your original payment method
              within <strong>5–7 business days</strong>.  
              For Cash on Delivery orders, we offer bank transfer or store credit.
            </p>
          </section>

          {/* Section: Exchanges */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Exchanges
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90 leading-relaxed">
              Need a different edition or title? Choose <strong>Exchange</strong> during the return request,
              and we’ll guide you through availability.
            </p>
          </section>

        </article>

        {/* Footer Note */}
        <p className="mt-6 text-sm text-[#F2E8D5]/60 text-center">
          Questions? Email{" "}
          <a href="mailto:returns@bookhive.lk" className="underline text-[#E85A4F] hover:text-[#FFD9A8]">
            returns@bookhive.lk
          </a>
        </p>

      </div>
    </section>
  );
}

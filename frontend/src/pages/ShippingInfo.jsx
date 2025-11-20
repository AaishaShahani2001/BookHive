import React from "react";

export default function ShippingInfo() {
  return (
    <section className="min-h-screen bg-[#3B2F2F] text-[#F2E8D5] py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFD9A8] drop-shadow">
            Shipping Information
          </h1>
          <p className="mt-3 text-[#F2E8D5]/80 text-lg">
            Delivery options, costs, and estimated timelines.
          </p>
        </header>

        {/* Content Card */}
        <article
          className="
            rounded-xl border border-[#8B5E3C]/40 
            bg-[#4A3B34]/80 backdrop-blur 
            p-6 md:p-8 space-y-8 
            shadow-xl shadow-black/40
          "
        >

          {/* Delivery Options */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Delivery Options
            </h2>
            <ul className="mt-3 list-disc pl-6 space-y-2 text-[#F2E8D5]/90">
              <li>
                <strong>Standard:</strong> 3–5 business days (most locations)
              </li>
              <li>
                <strong>Express:</strong> 1–2 business days (major cities)
              </li>
              <li>
                <strong>Store Pickup:</strong> Free — ready in 24–48 hours
              </li>
            </ul>
          </section>

          {/* Shipping Rates */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Shipping Rates
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90 leading-relaxed">
              Rates are calculated at checkout based on weight, destination, and delivery speed.
              Orders above <strong>LKR 10,000</strong> qualify for 
              <span className="text-[#FFD9A8] font-semibold"> free standard shipping</span>.
            </p>
          </section>

          {/* International Shipping */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              International Shipping
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90 leading-relaxed">
              We currently ship only within Sri Lanka.  
              For bulk or international shipments, contact{" "}
              <a
                className="underline text-[#E85A4F] hover:text-[#FFD9A8]"
                href="mailto:shipping@bookhive.lk"
              >
                shipping@bookhive.lk
              </a>.
            </p>
          </section>

          {/* Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-[#FFD9A8]">
              Tracking
            </h2>
            <p className="mt-3 text-[#F2E8D5]/90 leading-relaxed">
              Once your order ships, a tracking link will be sent via email or SMS.
              You can also check real-time updates in{" "}
              <span className="font-medium text-[#FFD9A8]">
                Profile → Orders
              </span>.
            </p>
          </section>

        </article>

      </div>
    </section>
  );
}

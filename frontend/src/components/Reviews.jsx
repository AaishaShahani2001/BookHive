// src/components/Reviews.jsx
import React from "react";
import { motion } from "framer-motion";

const defaultReviews = [
  {
    id: 1,
    name: "Aarav Sen",
    title: "Great curation & fast delivery",
    text:
      "Found two tech titles I’d been hunting for. Smooth checkout and the packaging was solid. Will buy again!",
    rating: 5,
    img: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
  },
  {
    id: 2,
    name: "Nethmi Perera",
    title: "Love the recommendations",
    text:
      "The ‘You might also like’ picks were spot on. Discovered a brilliant fiction series.",
    rating: 4,
    img: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
  },
  {
    id: 3,
    name: "Ishan Fernando",
    title: "Clean UI, easy browsing",
    text:
      "Filters for genres and price made it super easy. Wishlisted a bunch for later!",
    rating: 5,
    img: "https://covers.openlibrary.org/b/isbn/9780062316110-L.jpg",
  },
  {
    id: 4,
    name: "Suhani Jayasuriya",
    title: "Exactly what I needed",
    text:
      "Got a rare print for my uni project. The copy arrived in perfect condition.",
    rating: 5,
    img: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
];

function Stars({ rating = 5 }) {
  const total = 5;
  return (
    <div className="flex items-center" aria-label={`Rating: ${rating} of 5`}>
      {Array.from({ length: total }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-5 w-5 ${
            i < rating ? "fill-[#E85A4F]" : "fill-[#8B5E3C]/40"
          }`}
        >
          <path d="M10 15.27 15.18 18l-1.64-5.03L18 9.24l-5.19-.04L10 4 7.19 9.2 2 9.24l4.46 3.73L4.82 18 10 15.27z" />
        </svg>
      ))}
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Reviews({ reviews = defaultReviews }) {
  return (
    <section className="w-full py-14 md:py-20 bg-[#3B2F2F]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Title */}
        <div className="mb-10 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-[#D7C4A9]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Readers Say
          </motion.h2>

          <motion.p
            className="mt-2 text-[#F2E8D5]/80"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            viewport={{ once: true }}
          >
            Real feedback from our community of book lovers.
          </motion.p>
        </div>

        {/* Review Cards */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reviews.map((r) => (
            <motion.article
              key={r.id}
              variants={card}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="
                group overflow-hidden rounded-2xl
                border border-[#8B5E3C]/30
                bg-[#4A3B34]/60 backdrop-blur-sm
                shadow-xl shadow-black/30
              "
            >
              <div className="aspect-[16/10] overflow-hidden">
                <motion.img
                  src={r.img}
                  alt={r.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="p-5">
                <Stars rating={r.rating} />

                <h3 className="mt-3 text-lg font-semibold text-[#F2E8D5]">
                  {r.title}
                </h3>

                <p className="mt-2 text-sm text-[#D7C4A9] leading-relaxed">
                  {r.text}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#D7C4A9]">
                    {r.name}
                  </span>

                  <motion.span
                    className="
                      rounded-full border border-[#D7C4A9]/40 
                      px-2 py-0.5 text-[11px] 
                      text-[#F2E8D5]/80
                    "
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Verified Reader
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

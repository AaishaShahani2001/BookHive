// src/components/Reviews.jsx
import React from "react";
import { motion } from "framer-motion";

// IMPORT LOCAL IMAGES
import review1 from "../assets/reviews/review1.png";
import review2 from "../assets/reviews/review2.jpg";
import review3 from "../assets/reviews/review3.jpg";
import review4 from "../assets/reviews/review4.webp";

const defaultReviews = [
  {
    id: 1,
    name: "Aarav Sen",
    title: "The 5 AM Club",
    text:
      "This book completely changed my daily routine. A powerful read on discipline, productivity, and mindset.",
    rating: 5,
    img: review1,
  },
  {
    id: 2,
    name: "Nethmi Perera",
    title: "Famous Five",
    text:
      "A nostalgic and fun adventure series. Perfect for young readers and anyone who loves classic storytelling.",
    rating: 5,
    img: review2,
  },
  {
    id: 3,
    name: "Ishan Fernando",
    title: "Artificial Intelligence",
    text:
      "An insightful introduction to AI concepts. Helped me understand machine learning and real-world applications.",
    rating: 5,
    img: review3,
  },
  {
    id: 4,
    name: "Suhani Jayasuriya",
    title: "Python Programming",
    text:
      "Beginner-friendly and well structured. Great explanations with practical examples for learning Python.",
    rating: 4,
    img: review4,
  },
];

function Stars({ rating = 5 }) {
  return (
    <div className="flex items-center" aria-label={`Rating: ${rating} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-5 w-5 ${i < rating ? "fill-[#E85A4F]" : "fill-[#8B5E3C]/40"
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

        {/* SECTION HEADER */}
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

        {/* REVIEW CARDS */}
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
              {/* IMAGE */}
              <div className="aspect-[16/10] overflow-hidden">
                <motion.img
                  src={r.img}
                  alt={r.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* CONTENT */}
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

                  <span
                    className="
                      rounded-full border border-[#D7C4A9]/40
                      px-2 py-0.5 text-[11px]
                      text-[#F2E8D5]/80
                    "
                  >
                    Verified Reader
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

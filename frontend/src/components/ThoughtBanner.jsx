// src/components/ThoughtBanner.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import thoughtImg from "../assets/thoughtImg.jpg";

export default function ThoughtBanner() {
  const thought = {
    quote: "A room without books is like a body without a soul.",
    author: "Cicero",
  };

  return (
    <section className="w-full bg-[#3B2F2F] py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* LEFT: QUOTE + CTA */}
          <motion.div
            className="py-10 lg:py-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-semibold text-[#D7C4A9]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Food for Thought
            </motion.h2>

            <motion.blockquote
              className="mt-5 text-xl md:text-2xl leading-relaxed text-[#F2E8D5]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              “{thought.quote}”
            </motion.blockquote>

            <motion.cite
              className="mt-3 block text-[#D7C4A9]/90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              — {thought.author}
            </motion.cite>

            <motion.p
              className="mt-6 text-[#D7C4A9]"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Join our community of readers and start your next chapter today.
            </motion.p>

            <motion.div
              className="mt-8 inline-block"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/signup"
                className="
                  rounded-full border border-[#D7C4A9] 
                  px-8 py-3 text-lg font-semibold 
                  text-[#F2E8D5] 
                  bg-[#8B5E3C]/20
                  hover:bg-[#8B5E3C] hover:border-[#8B5E3C]
                  hover:text-white
                  backdrop-blur-sm
                  transition-all
                "
              >
                Create Account
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: IMAGE SIDE */}
          <div
            className="
              relative h-[260px] sm:h-[340px] lg:h-[420px] 
              overflow-hidden rounded-3xl 
              border border-[#8B5E3C]/40 
              shadow-xl shadow-black/30
              bg-[#4A3B34]
            "
          >
            <motion.img
              src={thoughtImg}
              alt="Reading inspiration"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.08, opacity: 0.9 }}
              whileInView={{ scale: 1, x: -10, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />

            {/* CAFE THEME GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3B2F2F]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

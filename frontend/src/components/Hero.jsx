// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/heroImgk.jpg";

const container = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative h-screen md:h-[75vh] w-full overflow-hidden">

      {/* Background Image with subtle motion */}
      <motion.img
        src={heroImg}
        alt="Books background"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.1, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1, y: -10 }}
        transition={{ duration: 5, ease: "easeOut" }}
      />

      {/* Dark Café Espresso Overlay */}
      <div className="absolute inset-0 bg-[#3B2F2F]/70 backdrop-blur-[1px]" />

      {/* Center Content */}
      <motion.div
        className="relative z-10 h-full max-w-3xl mx-auto px-6 flex flex-col items-center justify-center text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Main Heading */}
        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl font-semibold 
                     text-[#F2E8D5] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
        >
          Find Your Next Favorite Book
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={item}
          className="mt-4 text-lg md:text-xl text-[#D7C4A9] leading-relaxed"
        >
          Curated picks to inspire your mind, fuel your growth, 
          and make reading your daily ritual.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={item} className="mt-8">
          <motion.div whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.96 }}>
            <Link
              to="/all-books"
              className="
                inline-block rounded-full 
                px-8 md:px-10 py-3 
                text-lg md:text-2xl font-semibold
                border border-[#D7C4A9] 
                text-[#F2E8D5]
                bg-[#8B5E3C]/30 backdrop-blur-sm
                hover:bg-[#8B5E3C] hover:text-white hover:border-[#8B5E3C]
                transition-all duration-300
              "
            >
              Discover Books
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.span
          className="mt-10 inline-block text-[#D7C4A9]/80 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
      </motion.div>
    </section>
  );
}

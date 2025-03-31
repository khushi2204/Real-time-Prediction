"use client";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col items-center space-y-6 overflow-visible"
      >
        <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent 
          text-[6rem] sm:text-[7rem] md:text-[8rem] xl:text-[10rem] font-bold tracking-tight text-center leading-none">
          CryptoWeather Nexus
        </h1>
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Go to Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </LampContainer>
  );
}

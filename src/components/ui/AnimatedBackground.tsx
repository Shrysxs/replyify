"use client";
import { motion } from "framer-motion";

export default function AnimatedBackground() {

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      
      {/* Animated grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        data-parallax="0.05"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 120, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 120, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating orbs with parallax */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        data-parallax="0.1"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 120, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-8"
        data-parallax="0.15"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 4, delay: 1, ease: "easeOut" }}
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 120, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

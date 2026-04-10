import React, { useMemo } from "react";
import heroImg from "../assets/hero-cinematic.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlobeCanvas from "./GlobeCanvas";

const ParticleField = () => {
  const particles = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: "100%" }}
          animate={{
            opacity: [0, 0.4, 0],
            y: ["100vh", "-10vh"],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: "#2ECC71",
            borderRadius: "50%",
            filter: "blur(1px)",
            boxShadow: "0 0 10px #2ECC71"
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] lg:min-h-screen bg-[#0a0e0b] flex items-center overflow-hidden pt-28 pb-16 md:pt-0 md:pb-0">
      {/* Background Graphic Asset with Dolly-In Effect */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 0.4 }}
        transition={{ duration: 3, ease: "easeOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      />

      {/* Cinematic Overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, rgba(15, 61, 46, 0.4), transparent 60%)', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a0e0b 20%, transparent 60%)', zIndex: 2 }} />

      <ParticleField />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto w-full px-6 relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mt-20 lg:mt-32"
          >

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] md:leading-[1.05] tracking-tight mb-8 font-montserrat lg:max-w-4xl">
              Transforming Industry Through <span className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] bg-clip-text text-transparent">ICT Innovation</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-12 font-medium">
              Empowering the next generation of technical talent with world-class engineering excellence, AI integration, and core industrial consulting.
            </p>

            <div className="flex flex-wrap gap-5 justify-start">
              <Link to="/courses#courses-grid" className="no-underline">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] min-h-[72px] px-12 rounded-2xl text-lg font-black uppercase tracking-widest cursor-pointer border-none flex items-center justify-center leading-tight shadow-xl"
                >
                  Get Started
                </motion.button>
              </Link>
              <Link to="/about" className="no-underline">
                <motion.button
                  whileHover={{ background: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-white border-2 border-white/20 min-h-[72px] px-12 rounded-2xl text-lg font-black uppercase tracking-widest cursor-pointer transition-all duration-300 flex items-center justify-center leading-tight"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Digital Globe Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ position: 'relative', justifyContent: 'center' }}
            className="hidden lg:flex relative justify-center lg:mt-32"
          >
            {/* Soft Green Glow behind globe */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(46, 204, 113, 0.15) 0%, transparent 70%)', filter: 'blur(50px)' }} />

            <div className="w-full max-w-[550px] aspect-square relative">
              {/* Atmospheric Glow */}
              <div style={{ position: 'absolute', inset: '5%', background: 'radial-gradient(circle, rgba(46, 204, 113, 0.1) 0%, transparent 75%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: -1 }} />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <GlobeCanvas size={550} />
              </div>

              {/* HUD Technical Frames */}
              <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(46, 204, 113, 0.05)', borderRadius: '50%', pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#0a0e0b', padding: '0 10px', color: '#2ECC71', fontSize: '10px', fontWeight: 800, letterSpacing: '2px' }}>
                  SYS_LOAD_STABLE
                </div>
                <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#0a0e0b', padding: '0 10px', color: '#2ECC71', fontSize: '10px', fontWeight: 800, letterSpacing: '2px' }}>
                  GEO_LAT_SYNC
                </div>
              </div>

              {/* Scanning Line Effect */}
              <motion.div
                animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute', left: '10%', right: '10%', height: '1px',
                  background: 'linear-gradient(to right, transparent, #2ECC71, transparent)',
                  zIndex: 5,
                  boxShadow: '0 0 10px #2ECC71'
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

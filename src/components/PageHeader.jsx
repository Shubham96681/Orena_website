import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PageHeader({ title, subtitle, breadcrumb, illustration, buttons }) {
    return (
        <section className="relative pt-24 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 bg-[#0a0e0b] overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2ECC71_1px,transparent_1px)] bg-[size:40px_40px] z-[1]" />

            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-[#0F3D2E]/40 rounded-full blur-[120px] z-[2]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#2ECC71]/5 rounded-full blur-[100px] z-[2]" />

            {/* Cinematic Overlay for Seamless Blending */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,transparent_10%,#0a0e0b_95%)] pointer-events-none z-[3]" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10 cursor-default">

                {/* LEFT TEXT */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-1/2 relative z-10 text-left"
                >
                    {breadcrumb && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[10px] md:text-xs font-black text-[#2ECC71] uppercase tracking-[4px] mb-8"
                        >
                            {breadcrumb}
                        </motion.p>
                    )}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8 max-w-2xl"
                    >
                        {title}
                    </motion.h1>
                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            className="text-base md:text-xl text-white/40 leading-relaxed mb-12 font-bold max-w-xl"
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="flex flex-wrap gap-6"
                    >
                        {buttons ? buttons : (
                            <Link to="/contact#form-section" className="no-underline">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0_0_40px_rgba(46,204,113,0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-[#2ECC71]/10 border-none cursor-pointer"
                                >
                                    Get Started
                                </motion.button>
                            </Link>
                        )}
                    </motion.div>
                </motion.div>

                {/* RIGHT ILLUSTRATION (Background on Mobile, Side-by-Side on Desktop) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 lg:relative lg:inset-auto w-full lg:w-1/2 flex items-center justify-center z-0 lg:z-10 opacity-20 lg:opacity-100 pointer-events-none lg:pointer-events-auto"
                    style={{
                        maskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 50%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 50%, transparent 100%)'
                    }}
                >
                    {illustration || (
                        <div className="w-full max-w-[360px]">
                            <motion.div
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                className="w-full aspect-square relative"
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(46,204,113,0.15)" strokeWidth="0.2" strokeDasharray="3 3" />
                                    <circle cx="50" cy="50" r="35" fill="rgba(46,204,113,0.1)" stroke="#2ECC71" strokeWidth="0.5" />
                                    {[...Array(6)].map((_, i) => (
                                        <ellipse key={i} cx="50" cy="50" rx={10 + i * 8} ry="46" fill="none" stroke="rgba(46,204,113,0.1)" strokeWidth="0.4" />
                                    ))}
                                </svg>
                            </motion.div>
                        </div>
                    )}
                </motion.div>

            </div>
        </section>
    );
}

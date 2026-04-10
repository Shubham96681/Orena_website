import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <section className="pt-16 md:pt-32 pb-24 md:pb-40 px-4 md:px-8" style={{ background: '#0a0e0b', position: 'relative', overflow: 'hidden' }}>
            {/* Background Glows */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(126, 217, 87, 0.08) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-br from-white/5 to-[#7ed957]/5 backdrop-blur-3xl rounded-[40px] md:rounded-[60px] p-10 md:p-20 text-center relative z-10 border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
            >
                {/* Simplified technological accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(to right, transparent, #7ed957, transparent)', opacity: 0.5 }} />
                
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[#7ed957] font-black uppercase tracking-[4px] text-xs md:text-sm mb-6"
                >
                    Accelerate Your Growth
                </motion.p>

                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-8 max-w-4xl mx-auto">
                    Ready to Scale Your <span className="text-[#7ed957]">Technical Workforce?</span>
                </h2>
                
                <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
                    Partner with Orena Solutions today and gain access to India's most elite, industry-ready engineering ecosystem.
                </p>

                <div className="flex justify-center flex-wrap gap-6">
                    <Link to="/experts" className="no-underline">
                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0_0_40px_rgba(126,217,87,0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#7ed957] text-[#0a0e0b] px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all duration-300"
                        >
                            Hire Elite Talent
                        </motion.button>
                    </Link>
                    <Link to="/contact#form-section" className="no-underline">
                        <motion.button 
                            whileHover={{ background: 'rgba(255,255,255,0.08)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all duration-300"
                        >
                            Contact Sales ➔
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}


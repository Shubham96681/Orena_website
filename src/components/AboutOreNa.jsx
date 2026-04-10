import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
    { year: "2015", text: "Founded with a vision for tech excellence" },
    { year: "2018", text: "Crossed 1000+ engineers trained" },
    { year: "2021", text: "Launched Global ICT Consulting division" },
    { year: "2024", text: "Leading AI & Digital Transformation hub" }
];

export default function AboutOreNa() {
    return (
        <section className="py-24 md:py-40 px-6 md:px-12 bg-[#0a0e0b] relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-[#2ECC71] font-black uppercase tracking-[4px] text-xs md:text-sm mb-6">
                        Our Legacy
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
                        Crafting <span className="text-gradient">Preferred Engineers</span> for the Global Stage
                    </h2>
                    <p className="text-base md:text-lg text-white/50 leading-relaxed mb-12 font-medium">
                        Orena Solution is more than just a training hub. We are a digital transformation partner that bridges the gap between traditional engineering and the futuristic tech ecosystem. Our mission is to empower professionals with the tools of tomorrow.
                    </p>

                    {/* Timeline Animation */}
                    <div className="relative pl-10 border-l-4 border-[#2ECC71]/10 ml-2 space-y-12">
                        {milestones.map((m, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative group"
                            >
                                <div className="absolute left-[-46px] top-1 w-6 h-6 rounded-full bg-[#2ECC71] border-4 border-[#0a0e0b] shadow-[0_0_25px_rgba(46,204,113,0.5)] group-hover:scale-125 transition-transform duration-500" />
                                <div className="text-xl md:text-2xl font-black text-[#2ECC71] mb-2 tracking-tighter leading-none">{m.year}</div>
                                <div className="text-base md:text-lg text-white/40 font-bold leading-relaxed">{m.text}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Visual / Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative pb-16 lg:pb-0"
                >
                    <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
                        <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                            alt="Engineering Excellence"
                            className="w-full h-auto block"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e0b] to-transparent" />
                    </div>

                    {/* Floating Decorative Element */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-10 -right-4 md:-right-10 w-40 h-40 md:w-52 md:h-52 bg-[#2ECC71]/10 backdrop-blur-2xl rounded-[32px] border border-[#2ECC71]/20 z-20 flex items-center justify-center text-center p-6 shadow-2xl"
                    >
                        <div>
                            <div className="text-4xl md:text-5xl font-black text-[#2ECC71] mb-1">15+</div>
                            <div className="text-[10px] md:text-xs text-white font-black uppercase tracking-[2px]">Years Experience</div>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}

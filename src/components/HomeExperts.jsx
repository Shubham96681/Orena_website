import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const experts = [
    {
        name: "Dr. Arun Varma",
        role: "AI & ML Strategy",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        tags: ["Neural Networks", "Deep Learning"]
    },
    {
        name: "Sanjay Mehta",
        role: "Cloud Architect",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        tags: ["AWS", "Azure", "DevOps"]
    },
    {
        name: "Priya Sharma",
        role: "Data Science Lead",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        tags: ["Python", "Big Data", "Analytics"]
    },
    {
        name: "Vikram Singh",
        role: "Cyber Security",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        tags: ["PenTesting", "Blockchain"]
    }
];

export default function HomeExperts() {
    return (
        <section className="py-16 md:py-32 px-4 md:px-8" style={{ background: '#0a0e0b', position: 'relative', overflow: 'hidden' }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#2ECC71] font-black uppercase tracking-[4px] text-xs md:text-sm mb-6"
                    >
                        World-Class Mentorship
                    </motion.p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                        Industry <span className="text-gradient">Experts</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {experts.map((e, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 backdrop-blur-2xl rounded-[40px] p-10 text-center border border-white/10 transition-all duration-500 shadow-2xl hover:border-[#2ECC71]/40 group"
                        >
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-8 relative p-1.5 bg-gradient-to-tr from-[#2ECC71] to-[#6DD400] shadow-[0_0_30px_rgba(46,204,113,0.3)]">
                                <img 
                                    src={e.image} 
                                    alt={e.name}
                                    className="w-full h-full rounded-full object-cover border-4 border-[#0a0e0b] group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight group-hover:text-[#2ECC71] transition-colors">{e.name}</h3>
                            <p className="text-xs md:text-sm text-[#2ECC71] font-black uppercase tracking-[2px] mb-8">{e.role}</p>
                            
                            <div className="flex flex-wrap gap-2 justify-center">
                                {e.tags.map(t => (
                                    <span key={t} className="text-[10px] font-black text-white/30 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-[1px] group-hover:border-white/10 transition-colors">{t}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .expert-card:hover { 
                    border-color: rgba(46, 204, 113, 0.4) !important; 
                    box-shadow: 0 30px 60px rgba(0,0,0,0.6); 
                    background: rgba(255,255,255,0.06) !important;
                }
            `}} />
        </section>
    );
}

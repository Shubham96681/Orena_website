import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─── Animated counter using Framer Motion ─── */
const Counter = ({ target, suffix }) => {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', fontWeight: 900, color: '#2ECC71', lineHeight: 1, letterSpacing: '-2px' }}
        >
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                {target.toLocaleString()}{suffix}
            </motion.span>
        </motion.span>
    );
};

const engineers = [
    { name: "AI Engineer", meta: "Cloud & Strategy — 1+ yrs", sal: "₹5K–6L / mo", tags: ["PyTorch", "LangChain", "LLMs"], status: "Available", color: "#2ECC71" },
    { name: "Cloud Architect", meta: "Infra & DevOps — 5+ yrs", sal: "₹8K–12L / mo", tags: ["AWS", "K8s", "Terraform"], status: "Hired", color: "#2ECC71" },
    { name: "Data Scientist", meta: "Analytics — 4+ yrs", sal: "₹6K–9L / mo", tags: ["Pandas", "Spark", "NoSQL"], status: "Interviewing", color: "#2ECC71" },
];

const stats = [
    { target: 5000, suffix: '+', label: 'Engineers Trained', sub: 'Nationwide engineering workforce' },
    { target: 200, suffix: '+', label: 'Corporate Partners', sub: 'Fortune 500 hiring network' },
    { target: 15, suffix: '+', label: 'Years of Innovation', sub: 'Pioneering ICT breakthroughs' },
    { target: 98, suffix: '%', label: 'Success Rate', sub: 'Quarterly placement metrics' },
];

export default function Stats() {
    return (
        <section className="pt-16 md:pt-32 pb-20 md:pb-36 px-4 md:px-8" style={{
            background: '#0a0e0b',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Glows */}
            <div style={{ position: 'absolute', top: '0', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(46, 204, 113, 0.04) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(46, 204, 113, 0.03) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ── STATS GRID ── */}
                <div className="text-center mb-20 md:mb-32">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#2ECC71] font-black uppercase tracking-[4px] text-xs md:text-sm mb-6"
                    >
                        National Impact
                    </motion.p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-16 md:mb-24 max-w-4xl mx-auto">
                        Driving India's <span className="text-gradient">Digital Transformation</span>
                    </h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-x-12">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="flex flex-col items-center group"
                            >
                                <div className="flex items-baseline gap-1 mb-4 group-hover:scale-105 transition-transform duration-500">
                                    <span className="text-[clamp(3rem,8vw,4.5rem)] font-black text-[#2ECC71] leading-none tracking-tighter">
                                        {s.target.toLocaleString()}
                                    </span>
                                    <span className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-[#2ECC71]/40 leading-none">{s.suffix}</span>
                                </div>
                                <div className="text-sm md:text-lg font-black text-white uppercase tracking-[2px] leading-tight text-center">{s.label}</div>
                                <div className="text-xs md:text-sm text-white/30 mt-3 font-bold max-w-[200px] leading-relaxed text-center">{s.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── TALENT MARKETPLACE ── */}
                <div className="mt-16 md:mt-24">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12">
                        <div>
                            <p className="text-[#2ECC71] font-black uppercase tracking-[4px] text-xs md:text-sm mb-4">Talent Marketplace</p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">Pre-Vetted <span className="text-gradient">Experts</span></h2>
                        </div>
                        <Link to="/experts" className="no-underline shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-[2px] backdrop-blur-2xl transition-all duration-300"
                            >
                                View Marketplace ➔
                            </motion.button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {engineers.map((e, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.8 }}
                                whileHover={{ y: -12 }}
                                className="bg-white/5 backdrop-blur-2xl rounded-[32px] md:rounded-[40px] p-8 md:p-10 border border-white/10 transition-all duration-500 shadow-2xl relative overflow-hidden group hover:border-[#2ECC71]/30 w-full"
                            >
                                {/* Status Badge */}
                                <div className="absolute top-6 right-6 flex items-center gap-2 bg-[#2ECC71]/10 px-3 py-1.5 rounded-full border border-[#2ECC71]/20">
                                    <span className="w-2 h-2 rounded-full bg-[#2ECC71] shadow-[0_0_10px_#2ECC71]" />
                                    <span className="text-[10px] font-black text-[#2ECC71] uppercase tracking-[1px]">{e.status}</span>
                                </div>

                                <div className="mb-8 pt-2">
                                    <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight group-hover:text-[#2ECC71] transition-colors">{e.name}</h3>
                                    <p className="text-xs text-white/30 font-bold uppercase tracking-[1px]">{e.meta}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-10">
                                    {e.tags.map((t, ti) => (
                                        <span key={ti} className="bg-white/5 text-white/50 text-[10px] font-black px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-[1px] group-hover:border-white/10 transition-colors">{t}</span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                                    <div>
                                        <div className="text-[10px] text-white/20 font-black uppercase tracking-[1px] mb-1">Est. Salary</div>
                                        <div className="text-lg md:text-xl font-black text-white tracking-tight">{e.sal}</div>
                                    </div>
                                    <Link to="/contact#form-section" className="no-underline">
                                        <motion.div
                                            whileHover={{ scale: 1.1, backgroundColor: '#2ECC71', color: '#0a0e0b' }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-12 h-12 bg-[#2ECC71]/10 text-[#2ECC71] rounded-xl border border-[#2ECC71]/20 flex items-center justify-center text-lg transition-all duration-300"
                                        >
                                            ➔
                                        </motion.div>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}

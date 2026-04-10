import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import AnimatedWave from '../components/AnimatedWave';
import { motion } from 'framer-motion';

const leaders = [
    { name: "Dr. Sayanth J", role: "Chief Visionary Officer", desc: "Digital Transformation Architect with 20+ years in ICT strategy.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
    { name: "Megha S", role: "Director of Academy", desc: "Expert in pedagogy and workforce skill architecting.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
    { name: "Rahul V", role: "Head of Engineering", desc: "Full-stack architect leading our core technical implementation.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" }
];

export default function TeamPage() {
    const TeamIllustration = (
        <motion.img
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            src="/hero-team-v2.png"
            alt="Orena Team"
            className="w-full h-auto block object-contain"
            style={{
                WebkitMaskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 80%)',
                maskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 80%)',
            }}
        />
    );

    return (
        <div style={{ background: '#0a0e0b', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Background Decorative Glow */}
            <div style={{ position: 'absolute', top: '15%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>The <span className="text-gradient">Architects</span> of Workforce Excellence</>}
                subtitle="Our diverse team of domain experts and engineering leaders are united by a single mission: to redefine India's technical landscape."
                illustration={TeamIllustration}
                breadcrumb="Home / About / Team"
            />

            {/* TEAM SECTION */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 md:mb-24 text-center"
                    >
                        <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Expert Guild</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">The Core Technical Directorate</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                        {leaders.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                whileHover={{ y: -15 }}
                                className="bg-white/5 backdrop-blur-2xl rounded-[60px] p-12 md:p-16 border border-white/10 transition-all duration-500 shadow-2xl hover:border-[#2ECC71]/40 text-center flex flex-col group"
                            >
                                <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-10">
                                    <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#2ECC71]/30 animate-spin-slow group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#2ECC71] to-[#6DD400] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700" />
                                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#2ECC71]/50 relative z-10 shadow-[0_0_50px_rgba(46,204,113,0.3)]">
                                        <img src={m.image} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    </div>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-[#2ECC71] transition-colors">{m.name}</h3>
                                <p className="text-xs md:text-sm font-black text-[#2ECC71] mb-8 uppercase tracking-[4px]">{m.role}</p>
                                <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium flex-grow">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <div className="py-24 md:py-32 lg:py-48 px-4 md:px-8 bg-[#0a0e0b] text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%) z-0 blur-[80px]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Join the <span className="text-gradient">OreNa Operation</span></h2>
                    <p className="mb-12 text-white/50 text-xl max-w-3xl mx-auto leading-relaxed">We're always scouting for high-performance domain experts and technical visionaries to join our core guild.</p>
                    <Link to="/contact#form-section">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] py-5 px-12 rounded-2xl font-black text-lg no-underline uppercase tracking-wider"
                        >
                            View Careers
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            ` }} />
        </div>
    );
}

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import AnimatedWave from '../components/AnimatedWave';
import { motion } from 'framer-motion';

const events = [
    { title: 'Tech Innovation Summit 2025', date: 'March 15, 2025', location: 'Orena Hub, Bengaluru', tag: 'Conference', imgColor: '#4caf50' },
    { title: 'AI in Healthcare Workshop', date: 'April 22, 2025', location: 'Online Webinar', tag: 'Workshop', imgColor: '#1a5c32' },
    { title: 'Campus Recruitment Drive - NIT', date: 'May 10, 2025', location: 'NIT Campus', tag: 'Hiring', imgColor: '#7ed957' },
    { title: 'Industry 4.0 Hackathon', date: 'June 05, 2025', location: 'Orena Innovation Lab', tag: 'Hackathon', imgColor: '#2e7d52' },
];

export default function EventsPage() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const EventsIllustration = (
        <motion.img
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            src="/hero-about-v2.png"
            alt="Orena Events"
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
            <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>Connect, Collaborate & <span className="text-gradient">Code</span></>}
                subtitle="Join our technical events, hackathons, and corporate workshops designed to keep you at the vanguard of modern engineering."
                illustration={EventsIllustration}
                breadcrumb="Home / About / Events"
            />

            <section ref={sectionRef} className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24 text-center"
                >
                    <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Technical Calendar</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Operational Events & Matrix Summits</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                    {events.map((e, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ y: -15 }}
                            className="bg-white/5 backdrop-blur-2xl rounded-[60px] border border-white/10 shadow-[0_45px_100px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col group hover:border-[#2ECC71]/40"
                        >
                            <div className="h-64 md:h-80 w-full flex items-center justify-center relative overflow-hidden border-b border-white/5 transition-all duration-700" style={{ background: `linear-gradient(135deg, ${e.imgColor}22, #0a0e0b)` }}>
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2ECC71_2px,transparent_2px)] bg-[size:32px_32px]" />
                                <motion.span
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 0.3 }}
                                    viewport={{ once: true }}
                                    className="text-8xl md:text-9xl grayscale brightness-200 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700"
                                >
                                    🗓️
                                </motion.span>
                                <div className="absolute top-8 left-8">
                                    <span className="px-6 py-3 rounded-full bg-[#2ECC71]/10 backdrop-blur-xl text-xs font-black text-[#2ECC71] border border-[#2ECC71]/20 uppercase tracking-[3px] shadow-2xl">
                                        {e.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="p-10 md:p-16 flex-grow flex flex-col">
                                <div className="flex flex-wrap gap-4 mb-10">
                                    <div className="bg-white/5 text-[#2ECC71] py-3 px-6 rounded-2xl text-xs md:text-sm font-black flex items-center gap-3 border border-white/10 shadow-inner">
                                        <span className="text-lg">📅</span> {e.date}
                                    </div>
                                    <div className="bg-white/5 text-[#2ECC71] py-3 px-6 rounded-2xl text-xs md:text-sm font-black flex items-center gap-3 border border-white/10 shadow-inner">
                                        <span className="text-lg">📍</span> {e.location}
                                    </div>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-12 tracking-tighter group-hover:text-[#2ECC71] transition-colors">{e.title}</h3>
                                <Link to="/admission#form-section" className="mt-auto no-underline">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: '0_0_40px_rgba(46,204,113,0.4)' }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] py-6 rounded-2xl font-black text-base md:text-lg uppercase tracking-widest transition-all"
                                    >
                                        Secure Registration &rarr;
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Final */}
            <div className="py-20 md:py-32 lg:py-40 px-4 md:px-8 bg-[#0a0e0b] text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%) z-0 blur-[80px]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Architect a <span className="text-gradient">Summit</span></h2>
                    <p className="mb-12 text-white/50 text-xl max-w-3xl mx-auto leading-relaxed">Interested in organizing a high-performance hackathon or corporate matrix workshop? Coordinate with our events division.</p>
                    <Link to="/contact#form-section">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] py-5 px-12 rounded-2xl font-black text-lg no-underline uppercase tracking-wider"
                        >
                            Partner with Us
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

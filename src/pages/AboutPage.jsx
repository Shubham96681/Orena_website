import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import HomeClients from '../components/HomeClients';
import AnimatedWave from '../components/AnimatedWave';
import { motion } from 'framer-motion';

import aboutHeroImg from '../assets/hero-about.png';

export default function AboutPage() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const AboutIllustration = (
        <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            src={aboutHeroImg}
            alt="About OreNa"
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
            <div style={{ position: 'absolute', top: '15%', right: '-12%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>Shaping <span className="text-gradient">ICT Innovation</span> by Bridging the Skills Gap</>}
                subtitle="Orena Solutions is the definitive platform where engineering theory meets industrial application."
                illustration={AboutIllustration}
                breadcrumb="Home / About"
            />

            {/* WHO WE ARE */}
            <section ref={sectionRef} className="px-6 md:px-12 py-20 md:py-32 relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Operational Core</h2>
                    <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-4xl mb-16 md:mb-24 font-medium">
                        Orena Solution stands at the terminal point of the engineering lifecycle, identifying and neutralizing the critical knowledge gaps in the ICT domain. Our mission is to forge domain-ready engineers through high-performance training and direct industrial integration. We don't just educate; we build the technical infrastructure of tomorrow.
                    </p>
                </motion.div>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {[
                        { num: '15,000', suffix: '+', label: 'Engineers Deployed', desc: 'Pre-vetted technical talent', grad: 'linear-gradient(135deg, #2ECC71 0%, #6DD400 100%)' },
                        { num: '5,000', suffix: '+', label: 'Academic Nodes', desc: 'Partner university network', grad: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)' },
                        { num: '200', suffix: '+', label: 'Industry Partners', desc: 'Global corporate integration', grad: 'linear-gradient(135deg, #2ecc71 0%, #1e8449 100%)' },
                        { num: '98', suffix: '%', label: 'Efficiency Ratio', desc: 'Deployment success rate', grad: 'linear-gradient(135deg, #2ecc71 0%, #145a32 100%)' }
                    ].map((st, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                            className="bg-white/5 backdrop-blur-2xl rounded-[40px] p-10 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-300 group flex flex-col justify-center min-h-[300px]"
                        >
                            <div style={{ width: '5px', height: '80px', background: st.grad, position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', borderRadius: '0 5px 5px 0' }}></div>
                            
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-5xl md:text-6xl font-black text-[#2ECC71] leading-none tracking-tighter transition-transform duration-500 group-hover:scale-105">
                                    {st.num}
                                </span>
                                <span className="text-3xl md:text-4xl font-black text-[#2ECC71]/60 leading-none">{st.suffix}</span>
                            </div>
                            
                            <div className="text-xl font-black text-white mb-3 uppercase tracking-tight leading-tight">
                                {st.label}
                            </div>
                            <div className="text-sm md:text-base text-white/30 leading-relaxed font-bold">
                                {st.desc}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* HOW WE DO IT & CLIENTS */}
            <section className="py-20 md:py-32 lg:py-40 relative z-10 text-center bg-white/[0.01]">
                <div className="max-w-4xl mx-auto mb-20 px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Strategic Methodology</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Iterative Excellence</h2>
                        <p className="text-lg md:text-xl text-white/50 leading-relaxed font-medium">
                            Constant, strategic collaboration bridging university curriculum and corporate architecture. We utilize proprietary labs, senior industrial mentorship, and high-fidelity assessments to ensure total project readiness.
                        </p>
                    </motion.div>
                </div>

                <div className="py-16 md:py-24 border-y border-white/5 background-black/20">
                    <div className="opacity-60 grayscale brightness-150">
                        <HomeClients />
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <div className="py-20 md:py-32 lg:py-40 px-6 md:px-12 bg-[#0a0e0b] text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%) z-0 blur-[80px]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Connect with the <span className="text-gradient">OreNa Mesh</span></h2>
                    <p className="mb-12 text-white/50 text-xl max-w-3xl mx-auto leading-relaxed">Initiate your digital transformation today with India's most advanced engineering talent pool.</p>
                    <Link to="/contact#form-section">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] py-5 px-12 rounded-2xl font-black text-lg no-underline uppercase tracking-wider cursor-pointer border-none"
                        >
                            Get Started
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

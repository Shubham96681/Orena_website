import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import HomeClients from '../components/HomeClients';
import { Link } from 'react-router-dom';

import campusHeroImg from '../assets/hero-campus.png';

export default function CampusDrivePage() {
    const DriveIllustration = (
        <motion.img 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            src={campusHeroImg} 
            alt="Campus Drive" 
            className="w-full h-auto block object-contain"
            style={{
                WebkitMaskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 80%)',
                maskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 80%)',
            }}
        />
    );

    const stats = [
        { label: 'Corporate Partners', value: '500+' },
        { label: 'Students Placed', value: '25,000+' },
        { label: 'Avg. Package', value: '6.5 LPA' },
        { label: 'Hiring Efficiency', value: '95%' }
    ];

    const benefits = [
        { title: 'Pre-Vetted Talent', desc: 'Every student undergoes rigorous technical and behavioral assessment.' },
        { title: 'Domain Expertise', desc: 'Candidates trained in specific tech-stacks like AI, Cloud, and Embedded Systems.' },
        { title: 'End-to-End Logistics', desc: 'We manage everything from scheduling to technical interview infrastructure.' },
        { title: 'Zero Cost Hiring', desc: 'No placement fees. Focus entirely on finding the right cultural fit.' }
    ];

    return (
        <div style={{ background: '#0a0e0b', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Background Decorative Glow */}
            <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>Bridge the <span className="text-gradient">Talent Gap</span></>}
                subtitle="Partner with OreNa to bring top-tier engineering professionals directly to your workforce. Streamlined, vetted, and ready for impact."
                breadcrumb="Home / Campus Drive"
                illustration={DriveIllustration}
            />

            {/* Stats Bar */}
            <section className="py-16 md:py-24 px-4 md:px-8 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center p-10 md:p-12 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 transition-all duration-300 hover:border-[#2ECC71]/30 group"
                        >
                            <div className="text-5xl md:text-6xl font-black text-[#2ECC71] mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500">{s.value}</div>
                            <div className="text-xs md:text-sm font-black text-white/30 uppercase tracking-[3px]">{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 md:mb-24">
                        <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1rem' }}>The Advantage</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Why Recruit from OreNa?</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-12 md:p-16 bg-white/5 backdrop-blur-2xl rounded-[50px] border border-white/10 flex flex-col gap-8 transition-all duration-500 hover:border-[#2ECC71]/40 group"
                            >
                                <div className="text-4xl bg-[#2ECC71]/10 w-20 h-20 flex items-center justify-center rounded-3xl text-[#2ECC71] border border-[#2ECC71]/20 shadow-inner group-hover:bg-[#2ECC71] group-hover:text-[#0a0e0b] group-hover:rotate-6 transition-all duration-500">
                                    ⚡
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-[#2ECC71] transition-colors">{b.title}</h3>
                                <p className="text-sm md:text-base text-white/50 leading-relaxed font-bold">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 md:py-32 lg:py-40 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%) z-0 blur-[80px]" />
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ position: 'relative', zIndex: 10 }}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight">Initiate Your <span className="text-gradient">Selection Cycle</span></h2>
                    <p className="text-xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed">Connect with our Corporate Relations team to schedule your placement session.</p>
                    <Link to="/contact#form-section">
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] h-20 px-16 rounded-2xl font-black text-xl flex items-center justify-center mx-auto uppercase tracking-widest cursor-pointer no-underline border-none select-none w-fit"
                        >
                            Express Interest
                        </motion.div>
                    </Link>
                </motion.div>
            </section>

            <HomeClients />
        </div>
    );
}

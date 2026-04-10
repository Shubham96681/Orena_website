import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import HomeClients from '../components/HomeClients';
import AnimatedWave from '../components/AnimatedWave';
import { motion } from 'framer-motion';

export default function AboutClientsPage() {
    const ClientsIllustration = (
        <div className="relative w-full max-w-[450px] lg:max-w-[700px] mx-auto lg:ml-auto">
            <motion.img 
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                src="/hero-about-v2.png" 
                alt="Orena Clients" 
                className="w-full h-auto block object-contain opacity-90 brightness-110 contrast-110"
                style={{ 
                    imageRendering: 'high-quality', 
                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)', 
                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)' 
                }} 
            />
        </div>
    );

    return (
        <div style={{ background: '#0a0e0b', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Background Decorative Glow */}
            <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(46, 204, 113, 0.1) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>Trusted by India's <span className="text-gradient">Top Enterprises</span></>}
                subtitle="Join our network of elite hiring partners and corporate clients who rely on Orena for mission-critical engineering support."
                illustration={ClientsIllustration}
                breadcrumb="Home / About / Clients"
            />

            <div className="py-20 px-4 md:px-8 relative z-10">
                <div className="opacity-80 brightness-[1.5] grayscale max-w-7xl mx-auto">
                    <HomeClients />
                </div>
            </div>

            <section className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto text-center relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24"
                >
                    <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Strategic Footprint</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8">Operational Network Intensity</h2>
                    <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-4xl mx-auto font-medium">
                        From Fortune 500 companies to high-growth tech startups, Orena Solutions provides the foundational expertise and talent architecture that drives modern business across India.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {['200+ Hiring Partners', '15+ Core Domains', '98% Client Satisfaction', 'Pan-India Delivery'].map((item, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 backdrop-blur-2xl p-12 md:p-14 rounded-[40px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-[#2ECC71]/40 group flex items-center justify-center text-center"
                        >
                            <span className="text-xl md:text-2xl font-black text-[#2ECC71] leading-tight group-hover:scale-110 transition-transform duration-500">{item}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Final */}
            <div className="py-20 md:py-32 lg:py-48 px-4 md:px-8 bg-[#0a0e0b] text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%) z-0 blur-[80px]" />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Initiate <span className="text-gradient">Partnership</span></h2>
                    <p className="mb-12 text-white/50 text-xl max-w-3xl mx-auto leading-relaxed">Join the network of companies building India's tech future with industry-ready talent and architectural excellence.</p>
                    <Link to="/contact#form-section">
                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] py-5 px-12 rounded-2xl font-black text-lg no-underline uppercase tracking-wider"
                        >
                            Become a Partner
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

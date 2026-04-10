import React from 'react';
import PageHeader from '../components/PageHeader';
import HomeDomains from '../components/HomeDomains';
import AnimatedWave from '../components/AnimatedWave';
import { motion } from 'framer-motion';

export default function AboutDomainsPage() {
    const DomainsIllustration = (
        <div className="relative w-full max-w-[450px] lg:max-w-[700px] mx-auto lg:ml-auto">
            <motion.img 
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                src="/hero-courses-v2.png" 
                alt="Orena Domains" 
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
            <div style={{ position: 'absolute', top: '15%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(46, 204, 113, 0.1) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>Specialized Engineering <span className="text-gradient">Domains</span> & Expertise</>}
                subtitle="We operate at the core of technical innovation, from semiconductor architecture to enterprise-scale AI solutions."
                illustration={DomainsIllustration}
                breadcrumb="Home / About / Domains"
            />
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-20 md:py-32 px-4 md:px-8 relative z-10"
            >
                <div className="max-w-7xl mx-auto text-center mb-16 md:mb-24">
                    <p className="text-[10px] md:text-sm font-black text-[#2ECC71] uppercase tracking-[4px] mb-6">Technical Architecture</p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight mb-8">Operational Verticals</h2>
                    <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-bold">Discover our core areas of technical expertise and domain proficiency.</p>
                </div>
                <HomeDomains />
            </motion.div>

            {/* CTA Final */}
            <div className="py-20 md:py-32 lg:py-48 px-4 md:px-8 bg-[#0a0e0b] text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%) z-0 blur-[80px]" />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Secure <span className="text-gradient">Domain Expertise</span></h2>
                    <p className="mb-12 text-white/50 text-xl max-w-3xl mx-auto leading-relaxed">Leverage our deep technical proficiency in specialized ICT verticals to scale your engineering operations.</p>
                    <Link to="/contact#form-section">
                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] py-5 px-12 rounded-2xl font-black text-lg no-underline uppercase tracking-wider"
                        >
                            View Case Studies
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

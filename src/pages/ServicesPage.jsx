import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import AnimatedWave from '../components/AnimatedWave';
import serviceHeroImg from '../assets/hero-services.png';
import { motion } from 'framer-motion';

const servicesOptions = [
    { num: '01', title: "Campus Recruitment Training", desc: "Recognized as the primary bridge between academics and high-performance corporate environments.", link: 'campus-recruitment' },
    { num: '02', title: "Talent Acquisition", desc: "Strategic sourcing and pre-veting of elite engineering talent for India's technological giants.", link: 'talent-acquisition' },
    { num: '03', title: "Expert Exchange", desc: "Collaborate with industry veterans and technical gurus for consulting and strategic mentorship.", link: 'expert-exchange' },
    { num: '04', title: "Corporate Workshops", desc: "Customized technical and behavioral upskilling programs designed for enterprise efficiency.", link: 'corporate-workshop' },
    { num: '05', title: "IP Patent & Development", desc: "Transforming engineering breakthroughs into protected intellectual assets and global patents.", link: 'ip-patent' },
    { num: '06', title: "Setting Up Designing Labs", desc: "State-of-the-art infrastructure setup for educational institutions and corporate R&D centers.", link: 'designing-labs' },
    { num: '07', title: "Industry Projects", desc: "Real-world project experiences for students and agile project execution for businesses.", link: 'industry-projects' },
    { num: '08', title: "Research & Development", desc: "End-to-end product engineering from conceptualization to prototyping and industrial launch.", link: 'research-development' }
];

const steps = [
    { title: "Strategic Audit", ico: "🔍", desc: "In-depth analysis of your current infrastructure and identifying gaps." },
    { title: "Custom Roadmap", ico: "🗺️", desc: "Designing a tailored solution that aligns with your business goals." },
    { title: "Agile Execution", ico: "⚙️", desc: "Rapid deployment and iterative testing for high-quality outcomes." },
    { title: "Continuous Support", ico: "🛡️", desc: "Ongoing maintenance and scaling support for long-term success." }
];

export default function ServicesPage() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const ServicesIllustration = (
        <motion.img 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={serviceHeroImg} 
            alt="IT Services" 
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
            <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>Empowering Business with <span className="text-gradient">ICT Innovation</span></>}
                subtitle="Orena Solutions offers comprehensive IT services designed to modernize infrastructure and supercharge enterprise workflows."
                illustration={ServicesIllustration}
                breadcrumb="Home / Services"
            />

            {/* SERVICES CARDS */}
            <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 md:mb-24"
                    >
                        <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1rem' }}>Our Expertise</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Core Technical Offerings</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {servicesOptions.map((s, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -15 }}
                                className="bg-white/5 backdrop-blur-2xl rounded-[40px] p-10 md:p-12 border border-white/10 transition-all duration-500 shadow-2xl hover:border-[#2ECC71]/40 group flex flex-col gap-8 relative overflow-hidden"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="text-2xl bg-[#2ECC71] text-[#0a0e0b] w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl font-black shadow-[0_0_30px_rgba(46,204,113,0.3)] group-hover:scale-110 transition-transform duration-500">
                                        {s.num}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight group-hover:text-[#2ECC71] transition-colors">{s.title}</h3>
                                </div>
                                <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium flex-grow">{s.desc}</p>
                                <Link to={`/services/${s.link}`} className="no-underline">
                                    <div className="flex items-center gap-3 text-[#2ECC71] font-black text-xs uppercase tracking-[2px] group-hover:translate-x-2 transition-transform">
                                        Explore Protocol ➔
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4-STEP APPROACH */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative z-10 text-center bg-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 md:mb-24"
                    >
                         <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1rem' }}>Our Process</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Proven 4-Step Execution</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {steps.map((st, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-2xl rounded-[40px] p-10 md:p-12 text-left border border-white/10 transition-all duration-500 shadow-2xl hover:border-[#2ECC71]/40 flex flex-col gap-8 group"
                                whileHover={{ y: -10 }}
                            >
                                <div className="text-4xl bg-[#2ECC71]/10 w-20 h-20 flex items-center justify-center rounded-2xl text-[#2ECC71] border border-[#2ECC71]/20 shadow-inner group-hover:bg-[#2ECC71] group-hover:text-[#0a0e0b] group-hover:rotate-6 transition-all duration-500">
                                    {st.ico}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-[#2ECC71] transition-colors">{st.title}</h3>
                                <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium flex-grow">{st.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final Section */}
            <div className="py-20 md:py-32 lg:py-40 px-4 md:px-8 bg-[#0a0e0b] text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%) z-0 blur-[80px]" />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ position: 'relative', zIndex: 10 }}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to Scale Your Infrastructure?</h2>
                    <p className="text-white/50 text-xl max-w-3xl mx-auto mb-12 leading-relaxed">Partner with Orena Solutions for world-class technical engineering and ICT consulting.</p>
                    <Link to="/contact#form-section">
                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] py-5 px-12 rounded-2xl font-black text-lg no-underline uppercase tracking-wider"
                        >
                            Start Your Project
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

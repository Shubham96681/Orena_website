import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import AnimatedWave from '../components/AnimatedWave';
import { motion } from 'framer-motion';
import expertsHeroImg from '../assets/hero-experts.png';

const Avatar = ({ color, jacket, skin, hair }) => (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
        <circle cx="30" cy="30" r="30" fill={color} />
        <ellipse cx="30" cy="40" rx="17" ry="14" fill={jacket} />
        <circle cx="30" cy="22" r="13" fill={skin} />
        <path d="M17 18 Q30 10 43 18 Q40 9 30 8 Q20 9 17 18Z" fill={hair} />
        <circle cx="25" cy="23" r="2.8" fill="#1c1208" />
        <circle cx="35" cy="23" r="2.8" fill="#1c1208" />
        <path d="M25 30 Q30 35 35 30" stroke="#c07858" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
);

export default function ExpertsPage() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        const container = sectionRef.current;
        if (container) {
            const reveals = container.querySelectorAll('.rv, .rv-fade');
            reveals.forEach(el => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    const experts = [
        {
            name: "AI & ML Specialist",
            meta: "Deep Learning — 3+ years",
            sal: "₹7K–10L / mo",
            tags: ["PyTorch", "OpenAI", "NLP"],
            avatar: { color: "#ccebd4", jacket: "#66bb6a", skin: "#f8d0b0", hair: "#1c1208" }
        },
        {
            name: "Cloud Solutions Architect",
            meta: "DevOps & Cloud — 6+ years",
            sal: "₹12K–15L / mo",
            tags: ["Azure", "Docker", "Ansible"],
            avatar: { color: "#b3d9be", jacket: "#388e3c", skin: "#f5c5a3", hair: "#0d0a04" }
        },
        {
            name: "Senior Data Scientist",
            meta: "Big Data — 4+ years",
            sal: "₹9K–13L / mo",
            tags: ["Python", "Spark", "KubeFlow"],
            avatar: { color: "#a5d6b0", jacket: "#2e7d52", skin: "#f0b898", hair: "#1c1208" }
        },
        {
            name: "Full Stack Engineer",
            meta: "MERN Stack — 5+ years",
            sal: "₹8K–12L / mo",
            tags: ["React", "Node.js", "GraphQL"],
            avatar: { color: "#d1e7dd", jacket: "#198754", skin: "#ffdbac", hair: "#332211" }
        },
        {
            name: "Security Researcher",
            meta: "Cybersecurity — 4+ years",
            sal: "₹10K–14L / mo",
            tags: ["Penetration Testing", "SIEM", "Zero Trust"],
            avatar: { color: "#f8f9fa", jacket: "#212529", skin: "#e0ac69", hair: "#222222" }
        },
        {
            name: "Blockchain Developer",
            meta: "Web3 & DeFi — 2+ years",
            sal: "₹11K–16L / mo",
            tags: ["Solidity", "Rust", "Hyperledger"],
            avatar: { color: "#e2e3e5", jacket: "#6c757d", skin: "#8d5524", hair: "#000000" }
        }
    ];

    const ExpertIllustration = (
        <motion.img 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            src={expertsHeroImg} 
            alt="Tech Experts" 
            className="w-full h-auto block object-contain"
            style={{
                WebkitMaskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 80%)',
                maskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 80%)',
            }}
        />
    );

    return (
        <div style={{ background: '#0a0e0b', minHeight: '100vh', position: 'relative', overflow: 'hidden' }} ref={sectionRef}>
            {/* Background Decorative Glow */}
            <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>The <span className="text-gradient">Talent Mesh</span>: Elite Vetted Engineers</>}
                subtitle="Connect with a guild of domain-ready engineers, pre-vetted for technical excellence and cultural alignment."
                illustration={ExpertIllustration}
                breadcrumb="Home / Experts"
            />

            {/* EXPERTS GRID */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-16 md:mb-24 text-center"
                    >
                        <div>
                            <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Global Deployment</p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">Engineers Ready for Impact</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {experts.map((e, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                whileHover={{ y: -15 }}
                                className="bg-white/5 backdrop-blur-2xl rounded-[40px] p-10 md:p-12 border border-white/10 transition-all duration-500 shadow-2xl hover:border-[#2ECC71]/40 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at top right, #2ECC71, transparent 70%)` }} />
                                
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 relative z-10 text-center sm:text-left">
                                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl border border-[#2ECC71]/20 shadow-2xl overflow-hidden flex-shrink-0 -rotate-3 group-hover:rotate-0 transition-transform duration-500 bg-white/5">
                                        <Avatar {...e.avatar} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight group-hover:text-[#2ECC71] transition-colors">{e.name}</h3>
                                        <p className="text-sm text-white/40 font-bold mb-4">{e.meta}</p>
                                        <div className="inline-block bg-[#2ECC71]/10 text-[#2ECC71] px-5 py-2 rounded-full border border-[#2ECC71]/20 text-xs md:text-sm font-black uppercase tracking-[1px]">{e.sal}</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-12 relative z-10 justify-center sm:justify-start">
                                    {e.tags.map((t, ti) => (
                                        <span key={ti} className="bg-white/5 text-white/50 text-[10px] md:text-xs font-black px-4 py-2 rounded-full border border-white/5 uppercase tracking-[1px] group-hover:border-white/10 transition-colors">{t}</span>
                                    ))}
                                </div>
                                <Link to="/contact#form-section" className="no-underline relative z-10 mt-auto">
                                    <motion.button 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] py-5 rounded-2xl text-base font-black uppercase tracking-widest shadow-xl transition-all duration-300"
                                    >
                                        Hire Expert
                                    </motion.button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VETTING PROCESS */}
            <section className="py-20 md:py-32 lg:py-40 px-4 md:px-8 bg-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 md:mb-24"
                    >
                         <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Standard Bearers</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Our Rigorous Vetting Ecosystem</h2>
                        <p className="text-lg md:text-xl text-white/50 max-w-4xl mx-auto font-medium">Only the top 3% of global engineering talent enters our mesh, ensuring uncompromising quality for your infrastructure projects.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {[
                            { title: "Technical Assessment", ico: "💻", desc: "Hardcore coding challenges and complex system design architecture evaluations." },
                            { title: "Domain Knowledge", ico: "🧠", desc: "Specific deep-dives into industry-standard tech-stacks and deployment methodologies." },
                            { title: "Behavioral Analysis", ico: "🤝", desc: "Deep vetting of communication, emotional intelligence, and leadership potential." },
                            { title: "Peer Certification", ico: "🎯", desc: "Final validation by our board of senior architects before project onboarding." }
                        ].map((st, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white/5 backdrop-blur-2xl rounded-[40px] p-10 md:p-12 text-center border border-white/10 transition-all duration-500 shadow-2xl hover:border-[#2ECC71]/40 group flex flex-col gap-8"
                            >
                                <div className="text-4xl md:text-5xl bg-[#2ECC71]/10 w-20 h-20 flex items-center justify-center rounded-3xl text-[#2ECC71] border border-[#2ECC71]/20 shadow-inner group-hover:bg-[#2ECC71] group-hover:text-[#0a0e0b] group-hover:rotate-6 transition-all duration-500 mx-auto">
                                    {st.ico}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-[#2ECC71] transition-colors">{st.title}</h3>
                                <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium flex-grow">{st.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <div className="py-20 md:py-32 lg:py-40 px-4 md:px-8 bg-[#0a0e0b] text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%) z-0 blur-[80px]" />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ position: 'relative', zIndex: 10 }}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Architect the <span className="text-gradient">Future</span> of Your Team</h2>
                    <p className="mb-12 text-white/50 text-xl max-w-3xl mx-auto leading-relaxed">Partner with OreNa to inject world-class engineering expertise directly into your deployment cycle.</p>
                    <Link to="/contact#form-section" className="no-underline">
                        <motion.div 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] h-20 px-16 rounded-2xl font-black text-xl flex items-center justify-center mx-auto uppercase tracking-wider cursor-pointer border-none select-none w-fit"
                        >
                            Onboard an Expert
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

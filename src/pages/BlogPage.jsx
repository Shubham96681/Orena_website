import React, { useEffect, useRef, useState } from 'react';
import PageHeader from '../components/PageHeader';
import AnimatedWave from '../components/AnimatedWave';
import { motion } from 'framer-motion';

const articles = [
    { title: "Cybersecurity Essentials for Businesses", desc: "Discover the critical protocols and architectural safeguards needed to protect modern enterprise data.", imgColor: '#a5d6a7' },
    { title: "Unlocking Cloud Computing Potential", desc: "Mastering scalable infrastructure and serverless deployment for high-availability ICT applications.", imgColor: '#81c784' },
    { title: "How Organizations Inspire Silenced Employees", desc: "Building a culture of innovation and psychological safety in high-performing engineering teams.", imgColor: '#66bb6a' },
    { title: "How 5G Opulent Meet Talent Solutions Training", desc: "The intersection of high-speed connectivity and workforce development in the next-generation digital age.", imgColor: '#4caf50' }
];

export default function BlogPage() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: '' });

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        setCaptcha({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' });
    }, []);

    const BlogIllustration = (
        <motion.img
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            src="/hero-about-v2.png"
            alt="Orena Blog"
            className="w-full h-auto block object-contain"
            style={{
                WebkitMaskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 80%)',
                maskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 80%)',
            }}
        />
    );

    const handleSubscribe = async (e) => {
        e.preventDefault();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
            toast.error("Security check failed. Please try again.");
            setCaptcha(p => ({ ...p, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' }));
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Newsletter Subscriber',
                    email,
                    phone: 'N/A',
                    interest: 'Newsletter Subscription',
                    type: 'Subscriber',
                    source_page: '/blog'
                })
            });
            if (res.ok) {
                toast.success("Subscribed to OreNa Insights!");
                setEmail('');
                setCaptcha(p => ({ ...p, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' }));
            } else {
                toast.error("Subscription failed. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ background: '#0a0e0b', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Background Decorative Glow */}
            <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>ICT Insights & <span className="text-gradient">Tech Transmissions</span></>}
                subtitle="Expert perspectives on the future of technology, global hiring trends, and ICT innovations at the architectural level."
                illustration={BlogIllustration}
                breadcrumb="Home / Blog"
            />

            {/* LATEST ARTICLES GRID */}
            <section ref={sectionRef} className="py-20 md:py-32 px-4 md:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 md:mb-24 text-center"
                    >
                        <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Technical Intelligence</p>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-black text-white tracking-tight">Digital Trends & Engineering Insights</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                        {articles.map((a, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                whileHover={{ y: -15 }}
                                className="bg-white/5 backdrop-blur-2xl rounded-[60px] border border-white/10 shadow-[0_45px_100px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 flex flex-col group hover:border-[#2ECC71]/40"
                            >
                                <div className="h-64 md:h-80 w-full flex items-center justify-center relative overflow-hidden border-b border-white/5 transition-all duration-700" style={{ background: `linear-gradient(135deg, ${a.imgColor}22, #0a0e0b)` }}>
                                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2ECC71_2px,transparent_2px)] bg-[size:32px_32px]" />
                                    <motion.span
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 0.3 }}
                                        viewport={{ once: true }}
                                        className="text-8xl md:text-9xl grayscale brightness-200 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700"
                                    >
                                        📝
                                    </motion.span>
                                    <div className="absolute bottom-8 left-8 px-6 py-3 rounded-full bg-[#2ECC71]/10 backdrop-blur-xl text-xs font-black text-[#2ECC71] border border-[#2ECC71]/20 uppercase tracking-[3px] shadow-2xl">
                                        Engineering
                                    </div>
                                </div>

                                <div className="p-10 md:p-16 flex-grow flex flex-col">
                                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6 tracking-tighter group-hover:text-[#2ECC71] transition-colors">{a.title}</h3>
                                    <p className="text-base md:text-lg text-white/40 leading-relaxed flex-grow mb-12 font-bold">{a.desc}</p>

                                    <div className="flex flex-wrap gap-5 mt-auto">
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: '0_0_40px_rgba(46,204,113,0.4)' }}
                                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] py-5 px-12 rounded-2xl font-black uppercase tracking-widest text-sm md:text-base transition-all"
                                        >
                                            Read Protocol
                                        </motion.button>
                                        <button className="bg-white/5 text-white/60 border border-white/10 px-8 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                                            Share
                                        </button>
                                    </div>
                                </div>
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
                    className="relative z-10 max-w-5xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">Stay Ahead with <span className="text-gradient">OreNa Insights</span></h2>
                    <p className="mb-16 text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-bold">Subscribe to our technical briefing for the latest architectural trends and global workforce telemetry.</p>
                    
                    <form className="flex flex-col gap-6 max-w-lg mx-auto" onSubmit={handleSubscribe}>
                        <div className="flex-1 relative group">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="agent@network.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-10 text-white text-lg outline-none focus:border-[#2ECC71] transition-all backdrop-blur-md placeholder:text-white/20 font-bold"
                            />
                        </div>
                        
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between gap-4">
                            <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Bot Check: {captcha.num1} + {captcha.num2}?</span>
                            <input 
                                value={captcha.answer} 
                                onChange={(e) => setCaptcha({ ...captcha, answer: e.target.value })} 
                                type="number" 
                                required 
                                className="w-20 bg-[#0a0e0b] border border-white/10 rounded-xl px-2 py-3 text-white focus:outline-none focus:border-[#2ECC71] text-center font-black" 
                                placeholder="?" 
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0_0_40px_rgba(46,204,113,0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            disabled={submitting}
                            type="submit"
                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] py-6 px-12 rounded-2xl font-black text-lg uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                            {submitting ? 'Authenticating...' : 'Subscribe Protocol'}
                        </motion.button>
                        <p className="text-[10px] text-white/30 uppercase tracking-[1px] mt-4">Encrypted Transmission Secured</p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

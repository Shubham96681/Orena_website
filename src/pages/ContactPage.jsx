import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import AnimatedWave from '../components/AnimatedWave';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const location = useLocation();

    // Auto-scroll to form if #form-section is in the URL Hash
    useEffect(() => {
        if (location.hash === '#form-section') {
            const el = document.getElementById('form-section');
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
            }
        }
    }, [location.hash]);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '+91 ', subject: '', message: '' });
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: '' });
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        setCaptcha({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (formData.firstName.length < 2) { toast.error("Please enter a valid first name."); return; }
        if (formData.lastName.length < 2) { toast.error("Please enter a valid last name."); return; }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) { toast.error("Please enter a valid email address."); return; }
        
        const phoneRegex = /^(\+91[\-\s]?)?[6789]\d{9}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            toast.error("Please enter a valid 10-digit Indian phone number.");
            return;
        }

        if (formData.message.length < 10) { toast.error("Message is too short. Please provide more detail."); return; }

        if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
            toast.error("Incorrect verification. Please calculate again.");
            setCaptcha(p => ({ ...p, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' }));
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message
                })
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                toast.success(`Message from ${formData.firstName} sent! We'll be in touch.`);
                setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
            } else throw new Error(data.error || 'Submission failed');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setStatus('idle');
            setCaptcha(p => ({ ...p, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' }));
        }
    };

    const ContactIllustration = (
        <motion.img
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            src="/hero-about-v2.png"
            alt="Contact Us"
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
            <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>Let's Talk <span className="text-gradient">Technology</span></>}
                subtitle="Whether you're developing your career or architecting a team, our engineering hub is ready to assist."
                illustration={ContactIllustration}
                breadcrumb="Home / Contact"
            />

            <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto flex gap-16 flex-wrap relative z-10">
                {/* Contact Information */}
                <div className="w-full lg:flex-1">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Communication Channels</h2>
                        <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-12 font-medium">
                            Reach out to discuss your technical challenges, hiring needs, or specialized training requirements. Our coordination team responds within one operational cycle.
                        </p>

                        <div className="flex flex-col gap-6 md:gap-8">
                            {[
                                { icon: '📍', title: 'Operational Hub', text: 'Vadodara Innovation Center, Gujarat, India', link: null },
                                { icon: '📧', title: 'Data Transmission', text: 'contactus@orena.solutions', link: 'mailto:contactus@orena.solutions' },
                                { icon: '📞', title: 'Priority Access', text: '+91 98243 47721', link: 'tel:+919824347721' }
                            ].map((c, i) => (
                                <motion.div
                                    key={c.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ x: 10 }}
                                    className="flex gap-6 md:gap-8 bg-white/5 p-6 md:p-8 rounded-[32px] border border-white/10 shadow-2xl transition-all"
                                >
                                    <div className="w-16 h-16 md:w-[70px] md:h-[70px] rounded-2xl bg-[#2ECC71]/10 flex items-center justify-center text-3xl md:text-[2.2rem] border border-[#2ECC71]/20">
                                        {c.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xs md:text-sm font-black text-[#2ECC71] mb-2 tracking-[2px] uppercase">{c.title}</h3>
                                        {c.link ? (
                                            <a href={c.link} className="text-base md:text-lg text-white no-underline font-bold transition-colors hover:text-[#2ECC71]">{c.text}</a>
                                        ) : (
                                            <p className="text-base md:text-lg text-white font-bold m-0">{c.text}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Contact Form */}
                <div className="w-full lg:flex-[2]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-2xl rounded-[40px] md:rounded-[50px] p-10 md:p-16 lg:p-20 border border-white/10 shadow-[0_42px_100px_rgba(0,0,0,0.5)] scroll-mt-32 md:scroll-mt-56"
                        id="form-section"
                    >
                        <h3 className="text-3xl md:text-5xl font-black text-white mb-12 tracking-tighter">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                <div className="space-y-4">
                                    <label className="block text-[10px] md:text-xs font-black text-[#2ECC71] uppercase tracking-[4px]">First Name</label>
                                    <input value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} type="text" placeholder="John" required className="contact-input w-full bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 text-white text-base md:text-lg focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md" />
                                </div>
                                <div className="md:pt-8">
                                    <input value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} type="text" placeholder="Doe" required className="contact-input w-full bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 text-white text-base md:text-lg focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                <div className="space-y-4">
                                    <label className="block text-[10px] md:text-xs font-black text-[#2ECC71] uppercase tracking-[4px]">Email Address</label>
                                    <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="john@example.com" required className="contact-input w-full bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 text-white text-base md:text-lg focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md" />
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] md:text-xs font-black text-[#2ECC71] uppercase tracking-[4px]">Phone Number</label>
                                    <input value={formData.phone} maxLength="14" onChange={e => setFormData({ ...formData, phone: e.target.value })} type="tel" placeholder="+91 9999999999" required className="contact-input w-full bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 text-white text-base md:text-lg focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] md:text-xs font-black text-[#2ECC71] uppercase tracking-[4px]">Inquiry Type</label>
                                <select value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="contact-input w-full bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 text-white text-base md:text-lg focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md appearance-none">
                                    <option value="" disabled className="bg-[#0a0e0b]">Select Reason for Contact</option>
                                    <option value="Technical Architecture Hire" className="bg-[#0a0e0b]">Hire Technical Talent</option>
                                    <option value="Engineering Upskilling" className="bg-[#0a0e0b]">Corporate Training</option>
                                    <option value="Innovation Consulting" className="bg-[#0a0e0b]">General Inquiry</option>
                                    <option value="Strategic Partnership" className="bg-[#0a0e0b]">Partnership Programs</option>
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] md:text-xs font-black text-[#2ECC71] uppercase tracking-[4px]">Message</label>
                                <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="How can we help you?" required rows="4" className="contact-input w-full bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 text-white text-base md:text-lg focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md resize-none" />
                            </div>

                            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between gap-4">
                                <span className="text-sm font-bold text-white/80">Security Protocol: What is {captcha.num1} + {captcha.num2}?</span>
                                <input value={captcha.answer} onChange={e => setCaptcha({ ...captcha, answer: e.target.value })} type="number" required className="w-24 bg-[#0a0e0b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2ECC71] text-center font-black" placeholder="?" />
                            </div>

                            <div className="text-[10px] text-white/40 leading-relaxed uppercase tracking-[1px]">
                                <strong>Data Privacy Notice:</strong> Your transmission is encrypted. Information provided is strictly utilized for the stated operational briefing and is securely validated via our server-side infrastructure against malicious injection attacks.
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(46,204,113,0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] h-20 flex items-center justify-center rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl transition-all duration-300 mt-2 disabled:opacity-50 border-none cursor-pointer leading-none"
                            >
                                {status === 'loading' ? 'Sending Message...' : 'Submit Message →'}
                            </motion.button>
                        </form>
                    </motion.div>
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
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Visit our <span className="text-gradient">Innovation Lab</span></h2>
                    <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed font-medium">Engage with our core team at our global Vadodara headquarters for iterative consultation.</p>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .contact-input:focus {
                    border-color: #2ECC71 !important;
                    background: rgba(46, 204, 113, 0.05) !important;
                    box-shadow: 0 0 20px rgba(46, 204, 113, 0.1) !important;
                }
            `}} />
        </div>
    );
}

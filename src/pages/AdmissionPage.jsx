import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdmissionPage() {
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
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '+91 ', degree: '', year: '', interest: '', message: ''
    });
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: '' });
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        setCaptcha({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' });
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const nextStep = () => {
        if (formData.name.trim().length < 3) { toast.error("Full name is too short."); return; }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) { toast.error("Please enter a valid email address."); return; }
        const phoneRegex = /^(\+91[\-\s]?)?[6789]\d{9}$/;
        if (!phoneRegex.test(formData.phone)) { toast.error("Please enter a valid 10-digit Indian phone number."); return; }
        setStep(2);
    };

    const prevStep = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.degree.length < 2) { toast.error("Please provide your degree details."); return; }

        if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
            toast.error("Incorrect verification. Please calculate again.");
            setCaptcha(p => ({ ...p, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' }));
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name, email: formData.email, phone: formData.phone,
                    interest: `${formData.interest} (${formData.degree} ${formData.year}) - Msg: ${formData.message}`,
                    type: 'Admission', source_page: '/admission'
                })
            });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                toast.success(`Application for ${formData.name} submitted!`);
                setFormData({ name: '', email: '', phone: '', degree: '', year: '', interest: '', message: '' });
                setStep(1);
            } else throw new Error(data.error || 'Submission failed');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setStatus('idle');
            setCaptcha(p => ({ ...p, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' }));
        }
    };

    const AdmissionIllustration = (
        <motion.img
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            src="/hero-admission-latest.png"
            alt="Admission"
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
            <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={<>Apply for <span className="text-gradient">Campus Drive</span> & Admissions</>}
                subtitle="Join our elite technical training programs. Take the first step towards a rewarding engineering career with industry-tailored curriculum and 100% placement assistance."
                breadcrumb="Home / Admission"
                illustration={AdmissionIllustration}
            />

            <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-2xl rounded-[40px] md:rounded-[60px] p-10 md:p-20 lg:p-28 border border-white/10 shadow-[0_42px_100px_rgba(0,0,0,0.5)] relative z-10 scroll-mt-32 md:scroll-mt-56"
                    id="form-section"
                >
                    <div className="text-center mb-16 md:mb-20">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-[#2ECC71]/10 rounded-full text-[#2ECC71] text-[10px] md:text-xs font-black uppercase tracking-[3px] border border-[#2ECC71]/20 mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
                            Enrolment 2025 Open
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">Admission Application</h2>
                        <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-bold">
                            Initiate your journey into India's most advanced technical ecosystem. Complete the form below to begin.
                        </p>
                    </div>

                    {/* Multi-Step Indicators */}
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center gap-4">
                            <div className={`flex flex-col items-center gap-2`}>
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-black text-lg border-2 transition-all duration-500 ${step >= 1 ? 'border-[#2ECC71] bg-[#2ECC71]/10 text-[#2ECC71] shadow-[0_0_20px_rgba(46,204,113,0.3)]' : 'border-white/20 text-white/40'}`}>1</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${step >= 1 ? 'text-[#2ECC71]' : 'text-white/40'}`}>Personal</span>
                            </div>
                            <div className={`w-16 h-[2px] rounded-full transition-all duration-500 mb-6 ${step >= 2 ? 'bg-[#2ECC71]' : 'bg-white/10'}`}></div>
                            <div className={`flex flex-col items-center gap-2`}>
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-black text-lg border-2 transition-all duration-500 ${step >= 2 ? 'border-[#2ECC71] bg-[#2ECC71]/10 text-[#2ECC71] shadow-[0_0_20px_rgba(46,204,113,0.3)]' : 'border-white/20 text-white/40'}`}>2</div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${step >= 2 ? 'text-[#2ECC71]' : 'text-white/40'}`}>Academic</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="relative w-full">
                        {step === 1 && (
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 20, opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                            >
                                <div className="col-span-1 md:col-span-2 space-y-3">
                                    <label className="block text-[10px] font-black text-[#2ECC71] uppercase tracking-[3px]">Full Name *</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                        </div>
                                        <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="First and Last name"
                                            className="admission-input w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-[#2ECC71] uppercase tracking-[3px]">Email Address *</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                        </div>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@access.com"
                                            className="admission-input w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-[#2ECC71] uppercase tracking-[3px]">Phone Number *</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                        </div>
                                        <input type="tel" name="phone" required maxLength="14" value={formData.phone} onChange={handleChange} placeholder="+91 9999999999"
                                            className="admission-input w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md" />
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.01, boxShadow: '0_0_30px_rgba(46,204,113,0.3)' }}
                                        whileTap={{ scale: 0.99 }}
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] py-5 rounded-xl text-sm font-black uppercase tracking-widest shadow-xl transition-all duration-300 border-none cursor-pointer"
                                    >
                                        Next Step →
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                            >
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-[#2ECC71] uppercase tracking-[3px]">Qualification *</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                                        </div>
                                        <select name="degree" required value={formData.degree} onChange={handleChange}
                                            className="admission-input w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-10 text-white/80 text-sm focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md appearance-none cursor-pointer">
                                            <option value="" className="bg-[#0a0e0b]">Select Degree</option>
                                            <option value="B.Tech/BE" className="bg-[#0a0e0b]">B.Tech / B.E.</option>
                                            <option value="M.Tech/ME" className="bg-[#0a0e0b]">M.Tech / M.E.</option>
                                            <option value="BCA/MCA" className="bg-[#0a0e0b]">BCA / MCA</option>
                                            <option value="B.Sc/M.Sc" className="bg-[#0a0e0b]">B.Sc / M.Sc</option>
                                            <option value="Other" className="bg-[#0a0e0b]">Other</option>
                                        </select>
                                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71] pointer-events-none text-[10px]">▼</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-[#2ECC71] uppercase tracking-[3px]">Graduation Year *</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                                        </div>
                                        <input type="number" name="year" required value={formData.year} onChange={handleChange} placeholder="e.g. 2025"
                                            className="admission-input w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md" />
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 space-y-3">
                                    <label className="block text-[10px] font-black text-[#2ECC71] uppercase tracking-[3px]">Preferred Technical Program</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                        <select name="interest" required value={formData.interest} onChange={handleChange}
                                            className="admission-input w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-10 text-white/80 text-sm focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md appearance-none cursor-pointer">
                                            <option value="" className="bg-[#0a0e0b]">Select Core Path</option>
                                            <option value="Campus Recruitment Training" className="bg-[#0a0e0b]">Campus Recruitment Training</option>
                                            <option value="Corporate Workshop" className="bg-[#0a0e0b]">Corporate Workshop</option>
                                            <option value="Python Bootcamp" className="bg-[#0a0e0b]">Advanced Python Bootcamp</option>
                                            <option value="Digital Marketing" className="bg-[#0a0e0b]">Strategic Digital Marketing</option>
                                            <option value="Embedded Systems" className="bg-[#0a0e0b]">Embedded Systems & AIoT Hardware</option>
                                        </select>
                                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71] pointer-events-none text-[10px]">▼</span>
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 space-y-3">
                                    <label className="block text-[10px] font-black text-[#2ECC71] uppercase tracking-[3px]">Message / Objective</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-5 text-white/40 group-focus-within:text-[#2ECC71] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                        </div>
                                        <textarea name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="How can we help develop your career?"
                                            className="admission-input w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white text-sm focus:border-[#2ECC71] transition-all outline-none backdrop-blur-md resize-none" />
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 pt-2">
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between gap-4 mb-6">
                                        <span className="text-[10px] font-black text-[#2ECC71]/80 uppercase tracking-widest">Protocol: {captcha.num1} + {captcha.num2} = ?</span>
                                        <input value={captcha.answer} onChange={e => setCaptcha({ ...captcha, answer: e.target.value })} type="number" required className="w-16 bg-[#0a0e0b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#2ECC71] text-center font-black text-xs" placeholder="?" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.08)' }}
                                            whileTap={{ scale: 0.99 }}
                                            type="button"
                                            onClick={prevStep}
                                            className="w-full bg-white/5 text-white border border-white/10 py-5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer"
                                        >
                                            ← Back
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.01, boxShadow: '0_0_30px_rgba(46,204,113,0.3)' }}
                                            whileTap={{ scale: 0.99 }}
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] py-5 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl transition-all duration-300 disabled:opacity-50 border-none cursor-pointer"
                                        >
                                            {status === 'loading' ? 'Encrypting...' : 'Finalize Apply →'}
                                        </motion.button>
                                    </div>
                                    <div className="text-center mt-8 space-y-2">
                                        <p className="text-[9px] text-white/20 font-bold uppercase tracking-[1px] max-w-lg mx-auto leading-relaxed">
                                            <strong>Privacy Note:</strong> Your data is secured via end-to-end encryption. Submitted details are used solely for program placement evaluations.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </section>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .admission-input:focus {
                        border-color: #2ECC71 !important;
                        background: rgba(46, 204, 113, 0.05) !important;
                        box-shadow: 0 0 20px rgba(46, 204, 113, 0.1) !important;
                        transform: translateY(-2px);
                    }
                `}} />
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function LeadFormModal({ isOpen, onClose, courseName = "General Inquiry", type = "Enrollment" }) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '+91 ' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: '' });

    useEffect(() => {
        if (isOpen) {
            setCaptcha({
                num1: Math.floor(Math.random() * 10) + 1,
                num2: Math.floor(Math.random() * 10) + 1,
                answer: ''
            });
            setStatus('idle');
            setFormData({ name: '', email: '', phone: '+91 ' });
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Math CAPTCHA validation
        // Client-side pre-flight validation
        if (formData.name.length < 3) { toast.error("Please enter your full name."); return; }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) { toast.error("Please enter a valid email address."); return; }
        
        const phoneRegex = /^(\+91[\-\s]?)?[6789]\d{9}$/;
        if (!phoneRegex.test(formData.phone)) { toast.error("Please enter a valid 10-digit Indian phone number."); return; }

        if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
            toast.error("Incorrect verification. Please calculate again.");
            setCaptcha({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' });
            return;
        }

        setStatus('loading');
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    interest: courseName,
                    type: type,
                    source_page: window.location.pathname
                })
            });

            const result = await response.json();
            if (response.ok) {
                setStatus('success');
                toast.success("Interest logged! We'll be in touch.");
                setTimeout(() => onClose(), 2000);
            } else throw new Error(result.error || 'Submission failed');
        } catch (error) {
            toast.error(error.message);
            setStatus('idle');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#0a0e0b]/90 backdrop-blur-xl p-4"
                >
                    <motion.div
                        initial={{ y: 50, scale: 0.9, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 20, scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-lg bg-[#0F1410] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-[#2ECC71]/10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white/40 hover:text-[#2ECC71] transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {status === 'success' ? (
                            <div className="text-center py-10 space-y-4">
                                <div className="w-20 h-20 bg-[#2ECC71]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#2ECC71]/50">
                                    <svg className="w-10 h-10 text-[#2ECC71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-black text-white">Application Received</h3>
                                <p className="text-white/60">Our admission team will review your prospect profile for <span className="text-[#2ECC71]">{courseName}</span> and contact you shortly.</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h2 className="text-3xl font-black text-white tracking-tight mb-2">
                                        Request <span className="text-[#2ECC71]">Access</span>
                                    </h2>
                                    <p className="text-white/50 text-sm">Please provide your details to request {type.toLowerCase()} for <br /><strong className="text-white">{courseName}</strong>.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-black text-white/50 uppercase tracking-widest mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2ECC71] focus:bg-[#2ECC71]/5 transition-all text-sm"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-black text-white/50 uppercase tracking-widest mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2ECC71] focus:bg-[#2ECC71]/5 transition-all text-sm"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-white/50 uppercase tracking-widest mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                required
                                                maxLength="14"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2ECC71] focus:bg-[#2ECC71]/5 transition-all text-sm"
                                                placeholder="+91 9999999999"
                                            />
                                        </div>
                                    </div>

                                    {/* Bot Prevention Math CAPTCHA */}
                                    <div className="p-4 bg-[#2ECC71]/5 border border-[#2ECC71]/20 rounded-xl flex items-center justify-between gap-4 mt-2">
                                        <span className="text-sm font-bold text-white/80">Security: What is {captcha.num1} + {captcha.num2}?</span>
                                        <input
                                            type="number"
                                            required
                                            value={captcha.answer}
                                            onChange={(e) => setCaptcha({ ...captcha, answer: e.target.value })}
                                            className="w-20 bg-[#0a0e0b] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#2ECC71] text-center"
                                            placeholder="?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full mt-2 bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] font-black uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        {status === 'loading' ? 'Processing...' : 'Submit Request'}
                                    </button>

                                    <div className="text-[10px] text-white/30 text-center leading-relaxed mt-4">
                                        <strong>Privacy Notice:</strong> By submitting this form, you consent to OreNa Solution collecting your name, email, and phone number to vet your application and contact you regarding educational services. Your data is encrypted and never sold to third parties.
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

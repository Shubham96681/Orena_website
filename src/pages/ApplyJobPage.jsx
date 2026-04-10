import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ApplyJobPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [jobDetails, setJobDetails] = useState(null);

    useEffect(() => {
        if (id && id !== 'general') {
            fetch(`/api/jobs/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.id) {
                        setJobDetails(data);
                        setForm(prev => ({ ...prev, applied_position: data.title }));
                    }
                })
                .catch(err => console.error('Error fetching job details:', err));
        }
    }, [id]);

    const [form, setForm] = useState({
        name: '', dob: '', email: '', phone: '+91 ', skills: '', college_name: '',
        bachelor_degree: '', engineering_discipline: '', master_degree: '', collage_name2: '',
        master_discipline: '', certification_course: '', training_institute: '', applied_position: '',
        ctc: '', ectc: '', experience: '', current_location: '', preferred_location: '',
        tenth_percentage: '', twelfth_percentage: '', diploma_percentage: '', degree_percentage: '',
        pg_percentage: '', notice_period: '', looking_for_job: '', holding_offer: ''
    });

    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: '' });

    useEffect(() => {
        setCaptcha({ 
            num1: Math.floor(Math.random() * 10) + 1, 
            num2: Math.floor(Math.random() * 10) + 1, 
            answer: '' 
        });
    }, []);

    const [files, setFiles] = useState({
        resume: null,
        certificate: null
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Basic size check
            if (e.target.name === 'resume' && file.size > 10 * 1024 * 1024) {
                toast.error("Resume must be smaller than 10MB");
                e.target.value = '';
                return;
            }
            if (e.target.name === 'certificate' && file.size > 100 * 1024 * 1024) {
                toast.error("Certificate must be smaller than 100MB");
                e.target.value = '';
                return;
            }
        }
        setFiles({ ...files, [e.target.name]: file });
    };

    const nextStep = () => {
        if (step === 1) {
            if (form.name.trim().length < 3) { toast.error("Please enter your full name."); return; }
            if (!form.dob) { toast.error("Please enter your date of birth."); return; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(form.email)) { toast.error("Please enter a valid email address."); return; }
            const phoneRegex = /^(\+91[\-\s]?)?[6789]\d{9}$/;
            if (!phoneRegex.test(form.phone)) { toast.error("Please enter a valid 10-digit Indian phone number."); return; }
            if (form.current_location.trim().length < 2) { toast.error("Please enter your current location."); return; }
            setStep(2);
        } else if (step === 2) {
            if (form.skills.trim().length < 2) { toast.error("Please provide your skills."); return; }
            if (form.college_name.trim().length < 2) { toast.error("Please provide your college name."); return; }
            if (form.degree_percentage.trim().length < 1) { toast.error("Please provide your degree percentage."); return; }
            setStep(3);
        }
    };

    const prevStep = () => {
        setStep(p => p - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- Field Verification ---
        if (!files.resume) { toast.error("Please upload your updated resume."); return; }

        if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
            toast.error("Incorrect verification. Please calculate again.");
            setCaptcha(p => ({ ...p, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' }));
            return;
        }

        setSubmitting(true);

        const formData = new FormData();
        if (id && id !== 'general') formData.append('job_id', id);
        
        Object.keys(form).forEach(key => {
            formData.append(key, form[key]);
        });

        if (files.resume) formData.append('resume', files.resume);
        if (files.certificate) formData.append('certificate', files.certificate);

        try {
            const res = await fetch('/api/applications', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                toast.success('Application submitted successfully!');
                setTimeout(() => navigate('/careers'), 2000);
            } else {
                const data = await res.json();
                toast.error(data.error || 'Submission failed');
                setCaptcha(p => ({ ...p, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' }));
            }
        } catch (err) {
            toast.error('An error occurred while submitting.');
            setCaptcha(p => ({ ...p, num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: '' }));
        } finally {
            setSubmitting(false);
        }
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2ECC71] focus:bg-[#2ECC71]/5 transition-all mt-1 backdrop-blur-md";
    const labelClasses = "block text-[10px] font-black text-[#2ECC71] uppercase tracking-[3px] ml-1";

    return (
        <div className="bg-[#0a0e0b] min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-white relative">
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#2ECC71]/10 to-transparent pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    {jobDetails ? (
                        <>
                            <p className="text-[#2ECC71] text-xs font-black uppercase tracking-[4px] mb-2">Hiring For {jobDetails.company_name}</p>
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4 uppercase">
                                {jobDetails.title}
                            </h1>
                        </>
                    ) : (
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
                            Job Application Form
                        </h1>
                    )}
                    <p className="text-gray-400 font-medium">Please fill out all the mandatory fields below to apply.</p>
                </motion.div>

                {/* Multi-Step Indicators */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-2 md:gap-4 w-full max-w-lg">
                        <div className="flex flex-col items-center gap-2 z-10 basis-1/3">
                            <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-black text-sm md:text-lg border-2 transition-all duration-500 bg-black ${step >= 1 ? 'border-[#2ECC71] bg-[#2ECC71]/10 text-[#2ECC71] shadow-[0_0_20px_rgba(46,204,113,0.3)]' : 'border-white/20 text-white/40'}`}>1</div>
                            <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-colors ${step >= 1 ? 'text-[#2ECC71]' : 'text-white/40'}`}>Personal</span>
                        </div>
                        <div className={`flex-1 h-[2px] rounded-full transition-all duration-500 mb-6 ${step >= 2 ? 'bg-[#2ECC71]' : 'bg-white/10'}`}></div>
                        <div className="flex flex-col items-center gap-2 z-10 basis-1/3">
                            <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-black text-sm md:text-lg border-2 transition-all duration-500 bg-black ${step >= 2 ? 'border-[#2ECC71] bg-[#2ECC71]/10 text-[#2ECC71] shadow-[0_0_20px_rgba(46,204,113,0.3)]' : 'border-white/20 text-white/40'}`}>2</div>
                            <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-colors ${step >= 2 ? 'text-[#2ECC71]' : 'text-white/40'}`}>Academics</span>
                        </div>
                        <div className={`flex-1 h-[2px] rounded-full transition-all duration-500 mb-6 ${step >= 3 ? 'bg-[#2ECC71]' : 'bg-white/10'}`}></div>
                        <div className="flex flex-col items-center gap-2 z-10 basis-1/3">
                            <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-black text-sm md:text-lg border-2 transition-all duration-500 bg-black ${step >= 3 ? 'border-[#2ECC71] bg-[#2ECC71]/10 text-[#2ECC71] shadow-[0_0_20px_rgba(46,204,113,0.3)]' : 'border-white/20 text-white/40'}`}>3</div>
                            <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-colors ${step >= 3 ? 'text-[#2ECC71]' : 'text-white/40'}`}>Submit</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-black/50 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                    
                    {step === 1 && (
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-8">
                        <div>
                            <h3 className="text-[#2ECC71] border-b border-white/10 pb-3 mb-6 font-black text-xs uppercase tracking-[4px]">Personal Identity Matrix</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                    <label className={labelClasses}>Full Name *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                        </div>
                                        <input required name="name" value={form.name} onChange={handleChange} className={`${inputClasses} pl-10`} type="text" placeholder="Identity Name"/>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className={labelClasses}>Date of Birth *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                                        </div>
                                        <input required name="dob" value={form.dob} onChange={handleChange} className={`${inputClasses} pl-10`} type="date"/>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className={labelClasses}>Email Address *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                        </div>
                                        <input required name="email" value={form.email} onChange={handleChange} className={`${inputClasses} pl-10`} type="email" placeholder="access@vector.com"/>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className={labelClasses}>Comms Vector *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                        </div>
                                        <input required name="phone" maxLength="14" value={form.phone} onChange={handleChange} className={`${inputClasses} pl-10`} type="tel" placeholder="+91 9999999999"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[#2ECC71] border-b border-white/10 pb-3 mb-6 font-black text-xs uppercase tracking-[4px]">Deployment Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                    <label className={labelClasses}>Deployment Vector *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        </div>
                                        <input required name="applied_position" value={form.applied_position} onChange={handleChange} className={`${inputClasses} pl-10`} type="text" placeholder="Target Position"/>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className={labelClasses}>Experience Tier *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </div>
                                        <select required name="experience" value={form.experience} onChange={handleChange} className={`${inputClasses} pl-10 appearance-none`}>
                                            <option value="" disabled>Select Tier</option>
                                            <option value="1 year">Level 1 (1 Year)</option><option value="2 years">Level 2 (2 Years)</option>
                                            <option value=">2 years">Senior Level (&gt;2 Years)</option><option value="Other">Custom Tier</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-[8px]">▼</span>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className={labelClasses}>Hub Location *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                        </div>
                                        <input required name="current_location" value={form.current_location} onChange={handleChange} className={`${inputClasses} pl-10`} type="text" placeholder="Current City"/>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className={labelClasses}>Target Hub *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <input required name="preferred_location" value={form.preferred_location} onChange={handleChange} className={`${inputClasses} pl-10`} type="text" placeholder="Preferred City"/>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className={labelClasses}>Current Efficiency (CTC)</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <input name="ctc" value={form.ctc} onChange={handleChange} className={`${inputClasses} pl-10 font-mono`} type="text" placeholder="Current CTC"/>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className={labelClasses}>Expected Efficiency (ECTC) *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <input required name="ectc" value={form.ectc} onChange={handleChange} className={`${inputClasses} pl-10 font-mono text-[#2ECC71] font-black`} type="text" placeholder="Expected CTC"/>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className={labelClasses}>Notice Interval *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <input required name="notice_period" value={form.notice_period} onChange={handleChange} className={`${inputClasses} pl-10`} type="text" placeholder="Days/Months"/>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className={labelClasses}>Active Search *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </div>
                                        <select required name="looking_for_job" value={form.looking_for_job} onChange={handleChange} className={`${inputClasses} pl-10 appearance-none`}>
                                            <option value="" disabled>Select Status</option>
                                            <option value="Yes">Active</option><option value="No">Passive</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-[8px]">▼</span>
                                    </div>
                                </div>
                                <div className="relative group col-span-1 md:col-span-2">
                                    <label className={labelClasses}>External Protocols (Existing Offers) *</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#2ECC71]">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                                        </div>
                                        <select required name="holding_offer" value={form.holding_offer} onChange={handleChange} className={`${inputClasses} pl-10 appearance-none`}>
                                            <option value="" disabled>Select Status</option>
                                            <option value="Yes">Holding Active Offer</option><option value="No">No Existing Offers</option><option value="Other">Evaluating Options</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-[8px]">▼</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 text-right">
                            <motion.button type="button" onClick={nextStep} whileHover={{ scale: 1.01, boxShadow: '0_0_30px_rgba(46,204,113,0.3)' }} whileTap={{ scale: 0.99 }} className="w-full md:w-auto px-10 py-5 rounded-xl font-black text-sm flex items-center justify-center bg-gradient-to-r from-[#2ECC71] to-[#36D1DC] text-[#0a0e0b] ml-auto cursor-pointer border-none block uppercase tracking-widest">
                                Next Step →
                            </motion.button>
                        </div>
                    </motion.div>
                    )}

                    {step === 2 && (
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-8">
                        <div>
                            <h3 className="text-[#2ECC71] border-b border-gray-800 pb-2 mb-4 font-semibold text-lg">Education & Skills</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2"><label className={labelClasses}>Skills *</label><input required name="skills" value={form.skills} onChange={handleChange} className={inputClasses} type="text" placeholder="e.g. React, Node.js, Python"/></div>
                                <div><label className={labelClasses}>College Name *</label><input required name="college_name" value={form.college_name} onChange={handleChange} className={inputClasses} type="text"/></div>
                                <div><label className={labelClasses}>Engineering Discipline *</label><input required name="engineering_discipline" value={form.engineering_discipline} onChange={handleChange} className={inputClasses} type="text"/></div>
                                
                                <div>
                                    <label className={labelClasses}>Bachelor Degree/Passed out Year *</label>
                                    <select required name="bachelor_degree" value={form.bachelor_degree} onChange={handleChange} className={inputClasses}>
                                        <option value="" disabled>Select Year</option>
                                        <option value="2024">2024</option><option value="2023">2023</option>
                                        <option value="2022">2022</option><option value="2021">2021</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {form.bachelor_degree === 'Other' && <input placeholder="Specify year" onChange={e => setForm({...form, bachelor_degree: e.target.value})} className={`${inputClasses} mt-2`} />}
                                </div>

                                <div>
                                    <label className={labelClasses}>Any Certification course *</label>
                                    <select required name="certification_course" value={form.certification_course} onChange={handleChange} className={inputClasses}>
                                        <option value="" disabled>Select</option>
                                        <option value="Yes">Yes</option><option value="No">No</option><option value="Other">Other</option>
                                    </select>
                                </div>
                                
                                <div><label className={labelClasses}>Training Institute Name</label><input name="training_institute" value={form.training_institute} onChange={handleChange} className={inputClasses} type="text"/></div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[#2ECC71] border-b border-gray-800 pb-2 mb-4 font-semibold text-lg">Post-Graduation Details (Optional)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label className={labelClasses}>Master College Name</label><input name="collage_name2" value={form.collage_name2} onChange={handleChange} className={inputClasses} type="text"/></div>
                                <div><label className={labelClasses}>Master Discipline</label><input name="master_discipline" value={form.master_discipline} onChange={handleChange} className={inputClasses} type="text"/></div>
                                <div>
                                    <label className={labelClasses}>Master Degree/Passed out Year</label>
                                    <select name="master_degree" value={form.master_degree} onChange={handleChange} className={inputClasses}>
                                        <option value="">Select Year</option>
                                        <option value="2024">2024</option><option value="2023">2023</option>
                                        <option value="2022">2022</option><option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[#2ECC71] border-b border-gray-800 pb-2 mb-4 font-semibold text-lg">Academic Percentages / CGPA</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div><label className={labelClasses}>10th Percentage *</label><input required name="tenth_percentage" value={form.tenth_percentage} onChange={handleChange} className={inputClasses} type="text"/></div>
                                <div><label className={labelClasses}>12th Percentage *</label><input required name="twelfth_percentage" value={form.twelfth_percentage} onChange={handleChange} className={inputClasses} type="text"/></div>
                                <div><label className={labelClasses}>Diploma Percentage</label><input name="diploma_percentage" value={form.diploma_percentage} onChange={handleChange} className={inputClasses} type="text"/></div>
                                <div><label className={labelClasses}>Degree Percentage *</label><input required name="degree_percentage" value={form.degree_percentage} onChange={handleChange} className={inputClasses} type="text"/></div>
                                <div><label className={labelClasses}>Post Graduate Percentage</label><input name="pg_percentage" value={form.pg_percentage} onChange={handleChange} className={inputClasses} type="text"/></div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-800 flex justify-between gap-4">
                            <motion.button type="button" onClick={prevStep} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full md:w-auto px-10 h-14 rounded-xl font-black text-lg flex items-center justify-center bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-colors">
                                ← Back
                            </motion.button>
                            <motion.button type="button" onClick={nextStep} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full md:w-auto px-10 h-14 rounded-xl font-black text-lg flex items-center justify-center bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] shadow-[0_10px_30px_rgba(46,204,113,0.3)] cursor-pointer border-none block">
                                Next Step →
                            </motion.button>
                        </div>
                    </motion.div>
                    )}

                    {step === 3 && (
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-8">
                        <div>
                            <h3 className="text-[#2ECC71] border-b border-gray-800 pb-2 mb-4 font-semibold text-lg">Documents Upload</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>Updated Resume * <span className="text-xs text-gray-500">(Max 10MB)</span></label>
                                    <input required name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="mt-2 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2ECC71]/20 file:text-[#2ECC71] hover:file:bg-[#2ECC71]/30"/>
                                </div>
                                <div>
                                    <label className={labelClasses}>Training/Intern Certificate <span className="text-xs text-gray-500">(Max 100MB)</span></label>
                                    <input name="certificate" type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleFileChange} className="mt-2 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2ECC71]/20 file:text-[#2ECC71] hover:file:bg-[#2ECC71]/30"/>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between gap-4">
                            <span className="text-sm font-bold text-[#2ECC71]/80">Security Protocol: What is {captcha.num1} + {captcha.num2}? *</span>
                            <input 
                                value={captcha.answer} 
                                onChange={e => setCaptcha({ ...captcha, answer: e.target.value })} 
                                type="number" 
                                required 
                                className="w-24 bg-[#0a0e0b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2ECC71] text-center font-black" 
                                placeholder="?" 
                            />
                        </div>

                        <div className="text-[10px] text-white/30 text-center leading-relaxed">
                            <strong>Privacy Notice:</strong> By submitting this application, you consent to OreNa Solution collecting your personal and professional data to evaluate your candidacy. Your data is encrypted and used only for recruitment purposes.
                        </div>

                        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
                            <motion.button type="button" onClick={prevStep} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full md:w-auto px-8 py-5 rounded-xl font-black text-xs flex items-center justify-center bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-colors uppercase tracking-widest">
                                ← Back
                            </motion.button>

                            <motion.button 
                                type="submit" 
                                disabled={submitting} 
                                whileHover={!submitting ? { scale: 1.01, boxShadow: '0_0_30px_rgba(46,204,113,0.3)' } : {}}
                                whileTap={!submitting ? { scale: 0.99 } : {}}
                                className={`w-full md:flex-1 py-5 rounded-xl font-black text-xs flex items-center justify-center leading-none border-none cursor-pointer uppercase tracking-widest transition-all ${submitting ? 'bg-white/5 text-gray-500 cursor-wait' : 'bg-[#2ECC71] text-[#0a0e0b] shadow-xl hover:brightness-110'}`}
                            >
                                {submitting ? 'Syncing...' : 'Submit Deployment Link'}
                            </motion.button>
                        </div>
                    </motion.div>
                    )}

                </form>
            </div>
        </div>
    );
}

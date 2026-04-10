import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoursePreviewModal({ isOpen, onClose, course, onEnroll }) {
    if (!course) return null;

    const handleEnroll = () => {
        onClose();
        if (onEnroll) onEnroll(course);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0a0e0b]/90 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-[#111812] w-full max-w-5xl max-h-[90vh] rounded-[40px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden flex flex-col lg:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#2ECC71] hover:bg-white/10 transition-all z-20 cursor-pointer"
                        >
                            ✕
                        </button>

                        {/* Left: Media & Header Column */}
                        <div className="w-full lg:w-2/5 border-r border-white/5 flex flex-col">
                            <div className="h-64 lg:h-80 relative group overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111812] to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-16 h-16 rounded-full bg-[#2ECC71] flex items-center justify-center shadow-[0_0_30px_rgba(46,204,113,0.5)] cursor-pointer">
                                        <span className="text-2xl text-[#0a0e0b] ml-1">▶</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-10 flex-1">
                                <span className="text-[#2ECC71] font-black uppercase tracking-[3px] text-xs mb-4 block">{course.categoryName}</span>
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-none tracking-tighter">{course.title}</h2>
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest">{course.level}</div>
                                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest">12 Modules</div>
                                </div>
                                <button
                                    onClick={handleEnroll}
                                    className="w-full bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] h-16 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center shadow-lg cursor-pointer border-none"
                                >
                                    Enroll Program
                                </button>
                            </div>
                        </div>

                        {/* Right: Content Column */}
                        <div className="w-full lg:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                            <div className="mb-12">
                                <h4 className="text-white font-black uppercase tracking-[2px] text-xs mb-6 opacity-30">Executive Summary</h4>
                                <p className="text-white/60 text-lg leading-relaxed font-medium">
                                    {course.longDesc || course.summary || "This specialized technical curriculum is engineered to bridge the gap between architectural theory and industrial application. It focuses on the terminal lifecycle of modern technical talent deployment."}
                                </p>
                            </div>

                            <div className="mb-12">
                                <h4 className="text-white font-black uppercase tracking-[2px] text-xs mb-6 opacity-30">What You'll Master</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(course.outcomes || [
                                        'Industrial Best Practices',
                                        'Modern Architectural Patterns',
                                        'High-Performance Optimization',
                                        'Scalable Lifecycle Management'
                                    ]).map((outcome, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                                            <span className="text-[#2ECC71] font-black">✓</span>
                                            <span className="text-white/50 text-xs font-bold leading-tight">{outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-white font-black uppercase tracking-[2px] text-xs mb-6 opacity-30">Syllabus Structure</h4>
                                <div className="space-y-3">
                                    {(course.curriculum || [
                                        { module: 'Module 01: Core Fundamentals & Setup', duration: '2 Weeks' },
                                        { module: 'Module 02: Advanced Industrial Integration', duration: '4 Weeks' },
                                        { module: 'Module 03: Performance Optimization', duration: '3 Weeks' },
                                        { module: 'Module 04: Project Synthesis & Launch', duration: '3 Weeks' }
                                    ]).map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-[#2ECC71]/30 transition-all group cursor-default">
                                            <span className="text-white/70 text-sm font-black tracking-tight group-hover:text-white transition-colors">{item.module}</span>
                                            <span className="text-[10px] font-black text-[#2ECC71] opacity-50">{item.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const courses = [
    { title: "GIS & Remote Sensing", duration: "12 Weeks", tag: "Advanced", icon: "🌍", progress: 85, color: "#2ECC71" },
    { title: "Embedded Systems & IoT", duration: "16 Weeks", tag: "Hardware", icon: "🤖", progress: 70, color: "#6DD400" },
    { title: "Data Analytics & Python", duration: "14 Weeks", tag: "Software", icon: "📊", progress: 95, color: "#2ECC71" },
    { title: "UI/UX & Product Design", duration: "10 Weeks", tag: "Design", icon: "🎨", progress: 60, color: "#6DD400" }
];

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    })
};

export default function HomeCourses() {
    return (
        <section className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden bg-[#0a0e0b]">
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(46, 204, 113, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 1, zIndex: 1 }} />
            <div style={{ position: 'absolute', top: '20%', right: '0', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%)', zIndex: 0, filter: 'blur(60px)' }} />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full text-center md:text-left"
                    >
                        <p className="text-[#2ECC71] font-black uppercase tracking-[4px] text-[10px] md:text-xs mb-4">Modern Education</p>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter">Industry Ready <span className="text-gradient">Certification</span></h2>
                    </motion.div>
                    
                    <Link to="/courses#courses-grid" className="no-underline group w-full md:w-auto text-center md:text-right">
                        <motion.div 
                            whileHover={{ x: 5 }}
                            className="text-[#2ECC71] text-xs md:text-sm font-black flex items-center justify-center md:justify-end gap-3 uppercase tracking-[2px] transition-all duration-300"
                        >
                            Explore All Courses <span className="group-hover:translate-x-2 transition-transform duration-300">➔</span>
                        </motion.div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {courses.map((c, i) => (
                        <Link to="/courses#courses-grid" key={i} className="no-underline group h-full">
                            <motion.div
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={cardVariants}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className="bg-white/5 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 border border-white/10 h-full relative overflow-hidden transition-all duration-500 shadow-2xl hover:border-[#2ECC71]/40 group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at top right, ${c.color}, transparent 70%)` }} />
                                
                                <div className="flex justify-between items-start mb-10">
                                    <div className="text-4xl w-16 h-16 bg-white/5 flex items-center justify-center rounded-2xl border border-white/10 shadow-inner">{c.icon}</div>
                                    <span className="text-[10px] font-black text-[#2ECC71] bg-[#2ECC71]/10 px-4 py-2 rounded-full tracking-[2px] uppercase">{c.tag}</span>
                                </div>
                                
                                <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight leading-tight group-hover:text-[#2ECC71] transition-colors">{c.title}</h3>
                                
                                <div className="flex items-center gap-3 text-sm text-white/40 font-bold mb-8">
                                    <span className="text-[#2ECC71]">⏳</span> {c.duration}
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-8">
                                    <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-[1px] mb-3">
                                        <span>Capacity</span>
                                        <span style={{ color: c.color }}>{c.progress}% Full</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${c.progress}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                            className="h-full rounded-full shadow-[0_0_15px_rgba(46,204,113,0.3)]"
                                            style={{ background: c.color }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-[#2ECC71]/60 font-black text-xs uppercase tracking-[2px] group-hover:text-[#2ECC71] group-hover:translate-x-2 transition-all duration-300">
                                    Explore Program <span>➔</span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .course-card-dark:hover {
                    border-color: rgba(46, 204, 113, 0.45) !important;
                    background: rgba(255, 255, 255, 0.06) !important;
                    box-shadow: 0 40px 100px -20px rgba(0,0,0,0.8);
                }
                .course-card-dark:hover .explore-btn {
                    color: #fff !important;
                    opacity: 1 !important;
                }
                .course-card-dark:hover .explore-btn span {
                    transform: translateX(6px);
                }
            `}} />
        </section>
    );
}



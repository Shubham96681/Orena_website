import React from 'react';
import { motion } from 'framer-motion';

const domains = [
    { title: "Automation", desc: "Implementing intelligent systems to streamline and accelerate industrial processes with next-gen AI.", icon: "⚙️" },
    { title: "E-Commerce", desc: "Scalable platforms driving digital sales and enhancing user retail experiences through data-driven UX.", icon: "🛍️" },
    { title: "Industry 4.0", desc: "Smart manufacturing via connected factories, IoT hubs, and predictive data analytics.", icon: "🏭" },
    { title: "Consumer Tech", desc: "Embedded software and intuitive interfaces for modern household and personal devices.", icon: "📱" },
    { title: "IT Services", desc: "Core digital infrastructure, software engineering, and global tech support ecosystems.", icon: "💻" }
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" }
    })
};

export default function HomeDomains() {
    return (
        <section className="pt-16 md:pt-32 pb-16 md:pb-24 px-4 md:px-8" style={{ 
            background: '#0a0e0b', 
            position: 'relative', 
            overflow: 'hidden' 
        }}>
            {/* Background technological pattern */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(126, 217, 87, 0.05)" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-24 px-4"
                >
                    <p className="text-[#7ed957] font-black uppercase tracking-[4px] text-xs md:text-sm mb-6">Global Impact</p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight max-w-4xl mx-auto">Business <span className="text-[#7ed957]">Domains</span></h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
                    {domains.map((d, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="bg-white/5 backdrop-blur-2xl rounded-[32px] p-10 text-center border border-white/10 transition-all duration-500 shadow-2xl hover:border-[#7ed957]/40 group"
                        >
                            <div className="text-5xl mb-8 filter drop-shadow-[0_0_15px_rgba(126,217,87,0.4)] group-hover:scale-110 transition-transform duration-500">{d.icon}</div>
                            <h3 className="text-xl font-black text-white mb-4 tracking-tight group-hover:text-[#7ed957] transition-colors">{d.title}</h3>
                            <p className="text-xs md:text-sm text-white/50 leading-relaxed font-medium">{d.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .domain-card-dark:hover {
                    border-color: rgba(126, 217, 87, 0.4) !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
                }
            `}} />
        </section>
    );
}


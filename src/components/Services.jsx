import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
    { icon: "🖥️", title: "ICT Consulting", desc: "Expert strategies to align your technology with business goals, ensuring scalable and future-proof digital infrastructure." },
    { icon: "💻", title: "Software Engineering", desc: "Building high-performance, robust software solutions using modern frameworks tailored to your specific enterprise needs." },
    { icon: "☁️", title: "Cloud Integration", desc: "Seamless migration and management of cloud-native architectures for enhanced security, flexibility, and operational efficiency." },
    { icon: "🧠", title: "AI & Data Science", desc: "Unlock actionable insights and automate complex processes with state-of-the-art machine learning models and data analytics." },
    { icon: "🛡️", title: "Cyber Security", desc: "Comprehensive protection for your digital assets, ensuring compliance and peace of mind in an evolving threat landscape." },
    { icon: "🔬", title: "IP & R&D", desc: "Dedicated research and patent-focused development services to foster true innovation and competitive differentiation." }
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" }
    })
};

export default function Services() {
    return (
        <section className="pt-24 md:pt-40 pb-20 md:pb-32 px-4 md:px-8 bg-[#0a0e0b] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#2ECC71]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[15%] right-[-10%] w-[600px] h-[600px] bg-[#2ECC71]/3 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24 px-4"
                >
                    <p className="text-[#2ECC71] font-black uppercase tracking-[4px] text-[10px] md:text-sm mb-6">
                        Core Expertise
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter max-w-4xl mx-auto">
                        Premium ICT Solutions for <span className="text-gradient">Scale & Innovation</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            whileHover={{ y: -15, scale: 1.02 }}
                            className="bg-white/5 backdrop-blur-2xl rounded-[40px] p-10 md:p-12 border border-white/10 transition-all duration-500 shadow-2xl hover:border-[#2ECC71]/40 group relative overflow-hidden cursor-pointer flex flex-col h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#2ECC71]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#2ECC71]/10 flex items-center justify-center rounded-2xl border border-[#2ECC71]/20 text-3xl md:text-4xl mb-10 group-hover:bg-[#2ECC71] group-hover:rotate-6 transition-all duration-500 shadow-inner">
                                <span className="group-hover:scale-110 group-hover:brightness-0 transition-all duration-500">{s.icon}</span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight leading-tight group-hover:text-[#2ECC71] transition-colors">{s.title}</h3>
                            <p className="text-sm md:text-base text-white/50 leading-relaxed mb-10 font-medium flex-grow">{s.desc}</p>

                            <Link to="/services" className="no-underline inline-flex items-center justify-center md:justify-start gap-3 bg-[#2ECC71]/10 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none text-[#2ECC71] font-black text-xs uppercase tracking-[2px] transition-all hover:brightness-110">
                                View Details ➔
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}



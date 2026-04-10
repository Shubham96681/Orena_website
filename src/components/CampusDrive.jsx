import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LeadFormModal from './LeadFormModal';

export default function CampusDrive() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <section className="py-16 md:py-32 px-4 md:px-8" style={{ background: '#0a0e0b', position: 'relative', overflow: 'hidden' }}>
            {/* Background Gradient Blob */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 100% 0%, rgba(46, 204, 113, 0.1) 0%, transparent 70%)',
                zIndex: 0
            }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-[#0F3D2E] to-[#1a5c48] rounded-[40px] md:rounded-[60px] p-10 md:p-20 text-center relative z-10 border border-[#2ECC71]/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
            >
                {/* Simplified particle accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 0% 100%, rgba(109, 212, 0, 0.1), transparent 50%)' }} />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[#2ECC71] font-black uppercase tracking-[4px] text-xs md:text-sm mb-6"
                >
                    Exclusive Hiring Portal
                </motion.div>

                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-8 max-w-4xl mx-auto">
                    Looking to Host a <span className="text-gradient">Campus Drive?</span>
                </h2>

                <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
                    Partner with Orena Solution to bring the nation's top engineering talent directly to your organization. Accelerate your hiring cycles with pre-vetted professionals.
                </p>

                <div className="flex justify-center flex-wrap gap-6">
                    <motion.div
                        onClick={() => setModalOpen(true)}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] h-20 px-16 rounded-2xl font-black text-xl flex items-center justify-center mx-auto uppercase tracking-wider cursor-pointer border-none select-none w-fit relative z-20"
                    >
                        Apply for Drive
                    </motion.div>
                </div>
            </motion.div>

            <LeadFormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                courseName="Corporate Partner"
                type="Campus Drive Enquiry"
            />
        </section>
    );
}

import React from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';

export default function LegalPage({ title, content }) {
    return (
        <div style={{ background: '#0a0e0b', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Background Decorative Glow */}
            <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.15) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader title={<span className="text-gradient">{title}</span>} breadcrumb={`Home / ${title}`} />

            <section className="py-20 md:py-32 px-4 md:px-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto bg-white/5 backdrop-blur-2xl rounded-[40px] p-8 md:p-16 lg:p-24 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                >
                    <div className="legal-content" dangerouslySetInnerHTML={{ __html: content }} />
                </motion.div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                .legal-content h2 { font-size: 2.5rem; font-weight: 900; color: #fff; margin: 48px 0 24px; letter-spacing: -2px; }
                @media (max-width: 768px) { .legal-content h2 { font-size: 2rem; } }
                .legal-content h3 { font-size: 1.5rem; font-weight: 800; color: #2ECC71; margin: 32px 0 16px; text-transform: uppercase; letter-spacing: 2px; }
                @media (max-width: 768px) { .legal-content h3 { font-size: 1.2rem; } }
                .legal-content p { font-size: 1.1rem; color: rgba(255,255,255,0.4); line-height: 1.8; margin-bottom: 24px; font-weight: bold; }
                @media (max-width: 768px) { .legal-content p { font-size: 1rem; } }
                .legal-content ul { padding-left: 24px; margin-bottom: 24px; }
                .legal-content li { font-size: 1.1rem; color: rgba(255,255,255,0.4); line-height: 1.8; margin-bottom: 12px; font-weight: bold; }
                @media (max-width: 768px) { .legal-content li { font-size: 1rem; } }
                .legal-content a { color: #2ECC71; text-decoration: none; font-weight: 800; transition: all 0.3s; }
                .legal-content a:hover { text-shadow: 0 0 10px rgba(46, 204, 113, 0.5); text-decoration: underline; }
            ` }} />
        </div>
    );
}

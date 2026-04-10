import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import AnimatedWave from '../components/AnimatedWave';
import { motion } from 'framer-motion';

const servicesData = {
    'campus-recruitment': {
        title: 'Campus Recruitment training',
        subtitle: 'Bridging the definitive gap between academic theory and industrial application through high-performance engineering training cycles.',
        section1Title: 'A Proven Pathway to Engineering Excellence',
        section1Type: 'left-icon',
        section1Cards: [
            { icon: '👩‍🏫', title: 'Strategic Skill Vetting', desc: 'Accelerated assessment cycles to identify core technical competency and project readiness.' },
            { icon: '🏢', title: 'Corporate Alignment', desc: 'Syncing student skills with the exact technology stacks used by our global industrial partners.' },
            { icon: '🤝', title: 'Operational Integration', desc: 'Seamless transition for candidates from training labs directly into enterprise recruitment pipelines.' }
        ],
        section2Title: 'Global Recruitment Training Focus',
        section2Type: 'center-icon',
        section2Cards: [
            { icon: '🧠', title: 'Cognitive & Aptitude', desc: 'Developing the logical foundation required for complex system architecture and troubleshooting.' },
            { icon: '💻', title: 'Technical Stack Mastery', desc: 'Deep-dive sessions into full-stack engineering, AI integration, and cloud-native development.' },
            { icon: '🗣️', title: 'Executive Communication', desc: 'Refining the soft-skills and presentation styles expected in high-level corporate environments.' }
        ],
        ctaTitle: 'Forge Your Professional Future with OreNa.',
        ctaSubtitle: 'Join 15,000+ top-tier placements today.'
    },
    'talent-acquisition': {
        title: 'Talent Acquisition',
        subtitle: 'Leveraging algorithmic matching and deep industry networks to source the world\'s most resilient engineering talent.',
        stats: [
            { num: '500+', title: 'Successful Placements', desc: 'Tier-1 engineering roles filled across the ICT sector.' },
            { num: '200+', title: 'Corporate Nodes', desc: 'Integrated with top fortune 500 tech organizations.' },
            { num: '10+', title: 'Years of Expertise', desc: 'A decade of precision-hiring in the engineering domain.' },
            { num: '25,000+', title: 'Talent Pool', desc: 'A vast, pre-vetted database of industry-ready professionals.' }
        ],
        section1Title: 'Why Partners Choose OreNa Solution',
        section1Type: 'image-card',
        section1Cards: [
            { 
                image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', 
                title: 'Top Industry Leaders', 
                desc: 'Access a board of seasoned fractional CTOs and senior architects for strategic talent guidance.' 
            },
            { 
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', 
                title: 'Advanced ICT Skills', 
                desc: 'Pre-vetted candidates specializing in AI, Cyber Security, and Cloud Architecture.' 
            }
        ],
        ctaTitle: 'Integrated Talent Pipelines with OreNa.'
    },
    'corporate-workshop': {
        title: 'Corporate Workshops',
        subtitle: 'Targeted upskilling programs designed to synchronize your workforce with the latest technical breakthroughs.',
        section1Title: 'Enterprise Upskilling Solutions',
        section1Type: 'left-icon',
        section1Cards: [
            { icon: '👨‍💼', title: 'Senior Mentorship', desc: 'Workshops led by industrial veterans with decades of field-tested engineering experience.' },
            { icon: '📝', title: 'Agile Implementation', desc: 'Practical, project-based training that translates immediately to operational environments.' },
            { icon: '🎓', title: 'Continuous Certification', desc: 'Ensuring your workforce stays at the equilibrium point of modern ICT standards.' }
        ],
        section2Title: 'Strategic Technical Vertical',
        section2Type: 'left-icon',
        section2Cards: [
            { icon: '👥', title: 'Soft Skills Mastery', desc: 'Developing the interpersonal communication layers vital for successful project management.' },
            { icon: '⚙️', title: 'ICT Specialization', desc: 'Deep-dives into specific tech verticals including Blockchain, AI, and IoT.' },
            { icon: '🔗', title: 'Legacy Modernization', desc: 'Training strategies focused on bridging legacy systems with modern cloud-native architectures.' }
        ],
        ctaTitle: 'Elevate Your Workforce with OreNa!'
    },
    'expert-exchange': {
        title: 'Expert Exchange',
        subtitle: 'Connect with industry veterans and technical gurus for consulting, mentoring, and project guidance.',
        section1Title: 'Why Choose Our Expert Exchange?',
        section1Type: 'left-icon',
        section1Cards: [
            { icon: '🧠', title: 'Domain Experts', desc: 'Access fractional CTOs and senior architects for strategic guidance.' },
            { icon: '🤝', title: 'Mentorship', desc: '1-on-1 and team mentoring sessions to accelerate learning curves.' },
            { icon: '⚙️', title: 'Project Consulting', desc: 'Unblock your technical challenges with seasoned veterans.' }
        ],
        section2Title: 'Areas of Expertise',
        section2Type: 'center-icon',
        section2Cards: [
            { icon: '☁️', title: 'Cloud Integration', desc: 'AWS, Azure, and GCP hybrid migrations.' },
            { icon: '🔒', title: 'Security Audits', desc: 'Compliance and penetration testing guidance.' },
            { icon: '📊', title: 'Data Architecture', desc: 'Big data pipelines and scalable warehousing.' }
        ],
        ctaTitle: 'Accelerate Your Projects with Orena Experts!'
    },
    'ip-patent': {
        title: 'IP Patent & Development',
        subtitle: 'Transforming ideas into protected assets. Comprehensive support for research and patent filing.',
        section1Title: 'The Patent Lifecycle',
        section1Type: 'left-icon',
        section1Cards: [
            { icon: '🔍', title: 'Prior Art Search', desc: 'Extensive global database checking to validate invention novelty.' },
            { icon: '📝', title: 'Patent Drafting', desc: 'Technical and legal drafting to ensure maximum claim protection.' },
            { icon: '⚖️', title: 'Filing & Prosecution', desc: 'Handling all IP office communications and examiner responses.' }
        ],
        section2Title: 'Our Capabilities',
        section2Type: 'center-icon',
        section2Cards: [
            { icon: '💡', title: 'Utility Patents', desc: 'Protecting functionality and processes.' },
            { icon: '🎨', title: 'Design Patents', desc: 'Securing the visual characteristics of your products.' },
            { icon: '🏷️', title: 'Trademarks', desc: 'Brand identity protection across global jurisdictions.' }
        ],
        ctaTitle: 'Protect Your IP Portfolio with Orena.'
    },
    'designing-labs': {
        title: 'Setting Up Designing Labs',
        subtitle: 'State-of-the-art infrastructure setup for educational institutions and corporate R&D centers.',
        stats: [
            { num: '50+', title: 'Labs Setup', desc: 'Across schools and engineering units.' },
            { num: '10+', title: 'Universities', desc: 'Partnered with top educational hubs.' },
            { num: '5+', title: 'Corporate R&D', desc: 'Advanced prototyping labs installed.' },
            { num: '100%', title: 'Turnkey', desc: 'End to end guaranteed readiness.' }
        ],
        section1Title: 'Our Setup Methodology',
        section1Type: 'left-icon',
        section1Cards: [
            { icon: '📐', title: 'Layout Planning', desc: 'Ergonomic and safety-first laboratory architectural designs.' },
            { icon: '💻', title: 'Hardware Procurement', desc: 'Sourcing tier-1 equipment and establishing vendor networks.' },
            { icon: '📚', title: 'Curriculum Integration', desc: 'Mapping the lab facilities directly to learning outcomes.' }
        ],
        ctaTitle: 'Build the Lab of the Future with Orena!'
    },
    'industry-projects': {
        title: 'Industry Projects',
        subtitle: 'Real-world project experiences for students and agile project execution for businesses.',
        section1Title: 'Benefits of Live Projects',
        section1Type: 'center-icon',
        section1Cards: [
            { icon: '📈', title: 'Real-World Experience', desc: 'Students work on actual corporate technical problems.' },
            { icon: '🤝', title: 'Agile Mentorship', desc: 'Guided by industry scrum masters and tech leads.' },
            { icon: '🏆', title: 'Portfolio Building', desc: 'Tangible deliverables that showcase production competence.' }
        ],
        section2Title: 'Execution Models',
        section2Type: 'left-icon',
        section2Cards: [
            { icon: '👥', title: 'Dedicated Pods', desc: 'Full autonomous teams assigned to your business problems.' },
            { icon: '🧩', title: 'Staff Augmentation', desc: 'Supplementing your existing teams with our trained residents.' },
            { icon: '💰', title: 'Fixed Bid', desc: 'End-to-end outcome-based project execution.' }
        ],
        ctaTitle: 'Execute Faster with Orena Project Pods.'
    },
    'research-development': {
        title: 'Research Product Development',
        subtitle: 'End-to-end product engineering from conceptualization to prototyping and market launch.',
        section1Title: 'Our R&D Pipeline',
        section1Type: 'left-icon',
        section1Cards: [
            { icon: '🧪', title: 'Proof of Concept (PoC)', desc: 'Rapid technical validation of core hypotheses.' },
            { icon: '🛠️', title: 'MVP Engineering', desc: 'Building the minimum viable product with scalable bones.' },
            { icon: '🚀', title: 'Market Scale', desc: 'Refining the architecture for high-volume enterprise production.' }
        ],
        section2Title: 'Core Engineering Zones',
        section2Type: 'center-icon',
        section2Cards: [
            { icon: '🤖', title: 'Hardware & IoT', desc: 'Custom PCB design, firmware, and embedded systems.' },
            { icon: '🧠', title: 'AI & Machine Learning', desc: 'LLM fine-tuning, computer vision, and predictive analytics.' },
            { icon: '☁️', title: 'Cloud Infrastructure', desc: 'Multi-cloud deployments with high availability.' }
        ],
        ctaTitle: 'Build Your Next Breakthrough with Orena.'
    }
};

const CardLearnMore = () => (
    <Link to="/contact#form-section" className="no-underline">
        <motion.div 
            whileHover={{ x: 5 }}
            className="card-learn-more" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s' }}
        >
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(46, 204, 113, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#2ECC71', fontSize: '0.8rem', fontWeight: 900 }}>✓</span>
            </div>
            <span style={{ color: '#2ECC71', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.2px' }}>Request Info</span>
        </motion.div>
    </Link>
);

const CardLeftIcon = ({ icon, title, desc, delay }) => (
    <div className="rv service-feature-card" style={{
        background: '#fff', borderRadius: '28px', padding: '36px', border: '1px solid rgba(76, 175, 80, 0.08)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.02)', transitionDelay: delay,
        display: 'flex', flexDirection: 'column', gap: '20px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative', overflow: 'hidden'
    }} >
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{
                fontSize: '2rem', width: '64px', height: '64px', flexShrink: 0,
                background: '#f8fbf9', color: '#1a5c32',
                display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '18px',
                boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.04)'
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111c14', lineHeight: 1.2 }}>{title}</h3>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#5a7562', lineHeight: 1.7, flexGrow: 1 }}>{desc}</p>

        <div style={{ marginTop: '12px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
            <CardLearnMore />
        </div>
    </div>
);

const CardCenterIcon = ({ icon, title, desc, delay }) => (
    <div className="rv service-feature-card-center" style={{
        background: '#fff', borderRadius: '28px', padding: '48px 32px', border: '1px solid rgba(76, 175, 80, 0.08)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.02)', transitionDelay: delay,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
        <div style={{
            fontSize: '2.5rem', width: '80px', height: '80px', marginBottom: '28px',
            background: 'linear-gradient(135deg, #1a5c32, #4caf50)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px',
            boxShadow: '0 12px 25px rgba(26,92,50,0.2)'
        }}>
            {icon}
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111c14', marginBottom: '16px', lineHeight: 1.2 }}>{title}</h3>
        <p style={{ fontSize: '0.95rem', color: '#5a7562', lineHeight: 1.7, flexGrow: 1, marginBottom: '32px' }}>{desc}</p>

        <div style={{ width: '100%', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '24px', display: 'flex', justifyContent: 'center' }}>
            <CardLearnMore />
        </div>
    </div>
);

const CardImage = ({ image, color, title, desc, delay }) => (
    <div className="rv service-feature-card-img" style={{
        background: '#fff', borderRadius: '32px', border: '1px solid rgba(76, 175, 80, 0.08)',
        boxShadow: '0 15px 45px rgba(0,0,0,0.04)', overflow: 'hidden', transitionDelay: delay,
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
        <div style={{ background: color || '#f8fbf9', height: '240px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {image ? (
                <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
                <>
                    <div className="img-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <span style={{ fontSize: '2rem', opacity: 0.5, color: '#fff', fontWeight: 900 }}>O+</span>
                    </div>
                </>
            )}
        </div>

        <div style={{ padding: '40px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111c14', marginBottom: '16px' }}>{title}</h3>
            <p style={{ fontSize: '0.95rem', color: '#5a7562', lineHeight: 1.7, flexGrow: 1, marginBottom: '32px' }}>{desc}</p>

            <div style={{ display: 'flex', gap: '16px' }}>
                <Link to="/contact#form-section" className="no-underline flex-1">
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-14 bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] border-none rounded-xl font-black text-xs uppercase tracking-widest cursor-pointer shadow-lg flex items-center justify-center"
                    >
                        Get Started
                    </motion.button>
                </Link>
                <Link to="/services" className="no-underline flex-1">
                    <motion.button 
                        whileHover={{ background: 'rgba(255,255,255,0.08)' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-14 bg-transparent text-white border border-white/20 rounded-xl font-black text-xs uppercase tracking-widest cursor-pointer flex items-center justify-center"
                    >
                        Learn More
                    </motion.button>
                </Link>
            </div>
        </div>
    </div>
);

const renderCards = (type, cards) => {
    if (!cards) return null;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {cards.map((c, i) => {
                if (type === 'left-icon') return <CardLeftIcon key={i} {...c} delay={`${i * 0.1}s`} />;
                if (type === 'center-icon') return <CardCenterIcon key={i} {...c} delay={`${i * 0.1}s`} />;
                if (type === 'image-card') return <CardImage key={i} {...c} delay={`${i * 0.1}s`} />;
                return null;
            })}
        </div>
    );
};

export default function ServiceDetailPage() {
    const { id } = useParams();
    const service = servicesData[id];
    const sectionRef = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        const container = sectionRef.current;
        if (container) {
            const reveals = container.querySelectorAll('.rv, .rv-fade');
            reveals.forEach(el => obs.observe(el));
        }
        return () => obs.disconnect();
    }, [id]);

    if (!service) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2>Service Not Found</h2>
                <Link to="/services">Back to Services</Link>
            </div>
        );
    }

    const MockupIllustration = (
        <div className="relative w-full max-w-[450px] lg:max-w-[600px] mx-auto lg:ml-auto lg:-mr-10">
            <motion.img 
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                src="/hero-details-latest.png" 
                alt="IT Services" 
                className="w-full h-auto block object-contain opacity-90 brightness-110 contrast-110"
                style={{ 
                    imageRendering: 'high-quality', 
                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)', 
                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 80%)' 
                }} 
            />
        </div>
    );

    const dualButtons = (
        <div className="flex flex-wrap gap-4">
            <Link to="/experts">
                <button className="bg-gradient-to-r from-[#1a5c32] to-[#4caf50] text-white py-3 px-8 rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center justify-center">
                    Hire an Engineer
                </button>
            </Link>
            <Link to="/contact#form-section">
                <button className="bg-white text-[#111c14] border border-[#cdd5cf] py-3 px-8 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors flex items-center justify-center">
                    Learn More
                </button>
            </Link>
        </div>
    );

    return (
        <div style={{ background: '#0a0e0b', minHeight: '100vh', position: 'relative', overflow: 'hidden' }} ref={sectionRef}>
            {/* Background Decorative Glow */}
            <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(80px)' }} />

            <PageHeader
                title={service.title}
                subtitle={service.subtitle}
                breadcrumb={`Orena / Services / Detail`}
                illustration={MockupIllustration}
                buttons={dualButtons}
            />

            {/* SECTIONS */}
            <div className="relative z-10">
                <div className="px-4 md:px-8 pb-32 max-w-7xl mx-auto">
                    {/* Stats Block - if available */}
                    {service.stats && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-y-0 mb-24 md:mb-32 border-y border-white/5 py-24 md:py-32 bg-[#2ECC71]/[0.01]"
                        >
                            {service.stats.map((st, i) => (
                                <div key={i} className={`px-8 md:px-12 ${i !== 0 ? 'lg:border-l lg:border-white/10' : ''} flex flex-col items-start min-w-0`}>
                                    <div className="text-5xl md:text-6xl font-black text-[#2ECC71] mb-6 leading-none whitespace-nowrap overflow-visible">
                                        {st.num}
                                    </div>
                                    <div className="text-lg md:text-xl font-black text-white mb-4 uppercase tracking-[2px] leading-tight">
                                        {st.title}
                                    </div>
                                    <div className="text-sm md:text-base text-white/40 leading-relaxed font-bold max-w-[240px]">
                                        {st.desc}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Section 1 */}
                    {service.section1Title && (
                        <div className="mb-24 md:mb-32">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-16 md:mb-24"
                            >
                                <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Strategic Alignment</p>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">{service.section1Title}</h2>
                            </motion.div>
                            {renderCards(service.section1Type, service.section1Cards)}
                        </div>
                    )}

                    {/* Section 2 */}
                    {service.section2Title && (
                        <div className="mb-24 md:mb-32">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-16 md:mb-24"
                            >
                                <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2ECC71', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Technical Focus</p>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">{service.section2Title}</h2>
                            </motion.div>
                            {renderCards(service.section2Type, service.section2Cards)}
                        </div>
                    )}
                </div>
            </div>

            {/* CTA Final */}
            <div className="py-24 md:py-32 lg:py-48 px-4 md:px-8 bg-[#0a0e0b] text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%) z-0 blur-[80px]" />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-10 tracking-tight leading-tight">{service.ctaTitle}</h2>
                    <Link to="/contact#form-section" className="no-underline">
                        <motion.button 
                            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(46, 204, 113, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] h-20 px-16 rounded-2xl font-black text-xl uppercase flex items-center justify-center mx-auto leading-none border-none cursor-pointer"
                        >
                            Initiate Core Engagement
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .service-feature-card, .service-feature-card-center, .service-feature-card-img {
                    background: rgba(255, 255, 255, 0.03) !important;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.08) !important;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.5) !important;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                .service-feature-card:hover, .service-feature-card-center:hover, .service-feature-card-img:hover {
                    transform: translateY(-15px) !important;
                    border-color: rgba(46, 204, 113, 0.4) !important;
                    background: rgba(46, 204, 113, 0.03) !important;
                }
                .card-learn-more span { color: #2ECC71 !important; }
                .card-learn-more div { background: rgba(46, 204, 113, 0.1) !important; }
                .card-learn-more div span { color: #2ECC71 !important; }
                h3 { color: #fff !important; }
                p { color: rgba(255,255,255,0.5) !important; }
            `}} />
        </div>
    );
}

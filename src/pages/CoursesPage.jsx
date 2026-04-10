import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import LeadFormModal from '../components/LeadFormModal';
import CoursePreviewModal from '../components/CoursePreviewModal';
import { motion } from 'framer-motion';
import { fetchMoodleCourses } from '../services/moodleService';
import coursesHeroImg from '../assets/hero-courses.png';

const FALLBACK_COURSES = [
    {
        id: 'f1', title: 'MERN Stack Pro', categoryName: 'Fullstack Web', level: 'Intermediate',
        summary: 'Build production-ready full-stack web apps with MongoDB, Express, React, and Node.js.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
        longDesc: 'Master the complete MERN lifecycle. We move beyond basic CRUD to focus on advanced patterns like microservices, server-side rendering with Next.js, and high-performance scaling in cloud environments.',
        outcomes: ['Architect Scalable Architectures', 'Master React Hooks & Context API', 'Deploy with Docker & Kubernetes', 'Build Secure JWT Authentication'],
        curriculum: [
            { module: 'Module 01: Core Architecture', duration: '2 Weeks' },
            { module: 'Module 02: Advanced React Patterns', duration: '4 Weeks' },
            { module: 'Module 03: Node.js & Microservices', duration: '3 Weeks' },
            { module: 'Module 04: Deployment & CI/CD', duration: '3 Weeks' }
        ],
        url: 'https://orena.solutions/moodle/login/index.php',
        enrollUrl: 'https://orena.solutions/moodle/login/index.php',
    },
    {
        id: 'f2', title: 'AWS Cloud Architect', categoryName: 'Cloud & DevOps', level: 'Advanced',
        summary: 'Master cloud infrastructure design patterns, deployment pipelines, and cost optimisation.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
        longDesc: 'Become a certified AWS Architect. This program focuses on design principles for performance, resiliency, and security across global cloud regions.',
        outcomes: ['Design Fault-Tolerant Systems', 'Implement Serverless (Lambda/API GW)', 'Infrastructure as Code (Terraform)', 'Manage VPCs and Hybrid Clouds'],
        curriculum: [
            { module: 'Module 01: AWS Global Infrastructure', duration: '3 Weeks' },
            { module: 'Module 02: IAM & Security Systems', duration: '3 Weeks' },
            { module: 'Module 03: Networking & VPC Design', duration: '5 Weeks' },
            { module: 'Module 04: Serverless Computing', duration: '5 Weeks' }
        ],
        url: 'https://orena.solutions/moodle/login/index.php',
        enrollUrl: 'https://orena.solutions/moodle/login/index.php',
    },
    {
        id: 'f3', title: 'GenAI Foundations', categoryName: 'Data & AI', level: 'Beginner',
        summary: 'Understand large language models, prompt engineering, and building AI-powered applications.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        longDesc: 'Unlock the potential of Generative AI. Explore the underlying transformer architectures and learn to build apps using LLM APIs like GPT-4 and Llama-3.',
        outcomes: ['Advanced Prompt Engineering', 'Integrate Vector Databases (Pinecone)', 'Build RAG (Retrieval-Augmented Gen) Apps', 'Ethical AI Deployment'],
        curriculum: [
            { module: 'Module 01: LLM Core Principles', duration: '3 Weeks' },
            { module: 'Module 02: API Integration & LangChain', duration: '3 Weeks' },
            { module: 'Module 03: Building RAG Systems', duration: '4 Weeks' },
            { module: 'Module 04: AI Ethics & Fine-Tuning', duration: '4 Weeks' }
        ],
        url: 'https://orena.solutions/moodle/login/index.php',
        enrollUrl: 'https://orena.solutions/moodle/login/index.php',
    },
    {
        id: 'f4', title: 'Cybersecurity & Ethical Hacking', categoryName: 'Cybersecurity', level: 'Intermediate',
        summary: 'Learn penetration testing, vulnerability assessment, and security best practices.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        longDesc: 'Defend digital frontiers. This hands-on program trains you in the offensive mindset of a hacker to build the world\'s most resilient security architectures.',
        outcomes: ['Advanced Penetration Testing', 'Network Security & Firewalls', 'Metasploit & Burp Suite Mastery', 'Incident Response & Auditing'],
        curriculum: [
            { module: 'Module 01: Networking & Reconnaissance', duration: '3 Weeks' },
            { module: 'Module 02: Web Application Pentesting', duration: '3 Weeks' },
            { module: 'Module 03: Post Exploitation & Privilege', duration: '3 Weeks' },
            { module: 'Module 04: Reporting & Compliance', duration: '3 Weeks' }
        ],
        url: 'https://orena.solutions/moodle/login/index.php',
        enrollUrl: 'https://orena.solutions/moodle/login/index.php',
    },
];

const LEVEL_COLORS = {
    Beginner: { bg: 'rgba(46, 204, 113, 0.1)', text: '#2ECC71', border: 'rgba(46, 204, 113, 0.2)' },
    Intermediate: { bg: 'rgba(241, 196, 15, 0.1)', text: '#f1c40f', border: 'rgba(241, 196, 15, 0.2)' },
    Advanced: { bg: 'rgba(231, 76, 60, 0.1)', text: '#e74c3c', border: 'rgba(231, 76, 60, 0.2)' },
};

function levelStyle(level) {
    return LEVEL_COLORS[level] || { bg: 'rgba(255,255,255,0.05)', text: '#fff', border: 'rgba(255,255,255,0.1)' };
}

function SkeletonCard() {
    return (
        <div className="bg-white/5 rounded-[40px] overflow-hidden border border-white/10">
            <div className="h-60 bg-white/5 animate-pulse" />
            <div className="p-10 space-y-4">
                <div className="h-6 w-3/4 bg-white/5 rounded-xl animate-pulse" />
                <div className="h-4 w-9/10 bg-white/5 rounded-xl animate-pulse" />
                <div className="h-4 w-1/2 bg-white/5 rounded-xl animate-pulse" />
            </div>
        </div>
    );
}

function CourseCard({ course, index, onAction }) {
    const ls = levelStyle(course.level);
    const [imgError, setImgError] = useState(false);
    const fallbackImg = `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
            whileHover={{ y: -15 }}
            className="bg-white/5 backdrop-blur-2xl rounded-[40px] overflow-hidden border border-white/10 flex flex-col transition-all duration-500 shadow-2xl"
        >
            <div className="h-60 relative overflow-hidden">
                <img
                    src={!imgError && course.image ? course.image : fallbackImg}
                    alt={course.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e0b] to-transparent" />
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-[#2ECC71]/10 backdrop-blur-md text-[10px] font-black text-[#2ECC71] border border-[#2ECC71]/20 uppercase tracking-widest">
                    {course.categoryName || 'Tech'}
                </div>
                <div
                    className="absolute bottom-6 right-6 px-4 py-2 rounded-full text-[10px] font-black border uppercase tracking-widest"
                    style={{ background: ls.bg, color: ls.text, borderColor: ls.border }}
                >
                    {course.level}
                </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 leading-tight tracking-tight">{course.title}</h3>
                <p className="text-sm md:text-base text-white/50 leading-relaxed mb-8 flex-1 font-medium">{course.summary}</p>
                <div className="flex gap-4">
                    <button onClick={() => onAction(course, 'Enrollment')} className="flex-1 bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] py-4 rounded-2xl font-black text-sm text-center no-underline transition-all hover:shadow-[0_0_20px_rgba(46,204,113,0.4)] cursor-pointer border-none">
                        Enroll Now
                    </button>
                    <button onClick={() => onAction(course, 'Preview')} className="py-4 px-6 rounded-2xl border border-white/10 text-white bg-white/5 font-black text-sm no-underline transition-all hover:bg-white/10 cursor-pointer">
                        Preview
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function TokenNoticeBanner() {
    return (
        <div className="bg-[#f1c40f]/5 border border-[#f1c40f]/20 rounded-3xl p-8 md:p-10 flex flex-col sm:flex-row items-start gap-6 md:gap-8 mb-16 md:mb-20">
            <span className="text-4xl md:text-5xl">🛡️</span>
            <div>
                <p className="font-black text-[#f1c40f] mb-3 text-lg md:text-xl uppercase tracking-[2px]">Demo Sandbox Mode</p>
                <p className="text-white/40 text-sm md:text-base leading-relaxed font-bold">Experience our pre-configured curriculum. For enterprise deployment, connect your Moodle via environment variables.</p>
            </div>
        </div>
    );
}

export default function CoursesPage() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#courses-grid') {
            const el = document.getElementById('courses-grid');
            if (el) {
                setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
            }
        }
    }, [location.hash]);

    const [courses, setCourses] = useState([]);
    const [selectedCat, setSelectedCat] = useState('All');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [usingFallback, setUsingFallback] = useState(false);

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ courseName: '', type: 'Enrollment' });
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCourseAction = (course, type) => {
        if (type === 'Preview') {
            setSelectedCourse(course);
            setPreviewOpen(true);
        } else {
            setModalConfig({ courseName: course.title, type });
            setModalOpen(true);
        }
    };

    const loadCourses = useCallback(async () => {
        setLoading(true);
        try {
            const moodleCourses = await fetchMoodleCourses();
            if (moodleCourses.length === 0) {
                setCourses(FALLBACK_COURSES);
                setUsingFallback(true);
            } else {
                setCourses(moodleCourses);
                setUsingFallback(false);
            }
        } catch (err) {
            setCourses(FALLBACK_COURSES);
            setUsingFallback(true);
        } finally {
            setLoading(true);
            setTimeout(() => setLoading(false), 800);
        }
    }, []);

    useEffect(() => { loadCourses(); }, [loadCourses]);

    const catNames = ['All', ...new Set(courses.map(c => c.categoryName).filter(Boolean))];
    const filtered = courses.filter(c => {
        const matchesCat = selectedCat === 'All' || c.categoryName === selectedCat;
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    const CoursesIllustration = (
        <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            src={coursesHeroImg}
            alt="Orena Courses"
            className="w-full h-auto block object-contain"
            style={{
                WebkitMaskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 80%)',
                maskImage: 'radial-gradient(ellipse 85% 90% at 50% 50%, black 30%, transparent 80%)',
            }}
        />
    );

    return (
        <div style={{ background: '#0a0e0b', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(15, 61, 46, 0.2) 0%, transparent 70%)', zIndex: 0, filter: 'blur(100px)' }} />

            <PageHeader
                title={<>Accelerate Your <span className="text-gradient">Career Path</span></>}
                subtitle="Industry-verified ICT certification programs engineered for the modern technical landscape."
                breadcrumb="Home / Courses"
                illustration={CoursesIllustration}
            />

            <section className="py-12 md:py-20 lg:py-32 px-6 md:px-12 relative z-10 scroll-mt-12 md:scroll-mt-20" id="courses-grid">
                <div className="max-w-7xl mx-auto">
                    {usingFallback && <TokenNoticeBanner />}

                    <div className="flex flex-col md:flex-row flex-wrap gap-8 items-center mb-16 md:mb-24">
                        <div className="relative w-full md:flex-1">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#2ECC71] text-xl z-10 transition-transform hover:scale-125">🔍</span>
                            <input
                                type="text"
                                placeholder="Search our technical curriculum…"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full py-5 md:py-6 pl-16 pr-8 rounded-2xl border border-white/10 bg-white/5 text-base md:text-lg text-white outline-none focus:border-[#2ECC71] focus:ring-4 focus:ring-[#2ECC71]/10 transition-all font-bold placeholder:text-white/20"
                            />
                        </div>
                        <div className="flex gap-4 flex-wrap justify-center md:justify-end w-full md:w-auto">
                            {catNames.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCat(cat)}
                                    className={`px-8 py-4 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[2px] transition-all duration-300 border ${selectedCat === cat
                                        ? 'bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] border-[#2ECC71] shadow-lg shadow-[#2ECC71]/20'
                                        : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20 hover:bg-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            <SkeletonCard />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filtered.map((c, i) => <CourseCard key={c.id} course={c} index={i} onAction={handleCourseAction} />)}
                        </div>
                    )}
                </div>
            </section>

            <div className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-[#0f3d2e]/30 to-[#0a0e0b] text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Don't Just Learn. <span className="text-gradient">Innovate.</span></h2>
                <div className="flex gap-6 flex-wrap justify-center">
                    <a href="https://orena.solutions/moodle/login/index.php" className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0f3d2e] py-4 px-12 rounded-2xl font-black no-underline hover:scale-105 transition-transform cursor-pointer">Access Moodle</a>
                    <Link to="/admission#form-section" className="border border-white/20 text-white py-4 px-12 rounded-2xl font-black no-underline hover:bg-white/5 transition-all">Admissions</Link>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer { 0% { background-position: -400% 0; } 100% { background-position: 400% 0; } }
            ` }} />

            <LeadFormModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                courseName={modalConfig.courseName}
                type={modalConfig.type}
            />

            <CoursePreviewModal 
                isOpen={previewOpen}
                onClose={() => setPreviewOpen(false)}
                course={selectedCourse}
                onEnroll={(course) => handleCourseAction(course, 'Enrollment')}
            />
        </div>
    );
}

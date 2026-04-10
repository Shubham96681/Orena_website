import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.svg';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        {
            name: 'Services',
            path: '/services',
            dropdown: [
                { name: 'Campus Recruitment Training', path: '/services/campus-recruitment' },
                { name: 'Talent Acquisition', path: '/services/talent-acquisition' },
                { name: 'Expert Exchange', path: '/services/expert-exchange' },
                { name: 'Corporate Workshop', path: '/services/corporate-workshop' },
                { name: 'IP Patent And Development', path: '/services/ip-patent' },
                { name: 'See More...', path: '/services' }
            ]
        },
        { name: 'Experts', path: '/experts' },
        { name: 'Courses', path: '/courses' },
        { name: 'Campus Drive', path: '/campus-drive' },
        { name: 'Careers', path: '/careers' },
        { name: 'About', path: '/about' }
    ];

    const isHome = location.pathname === '/';

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 overflow-visible ${scrolled ? 'bg-[#0a0e0b]/90 backdrop-blur-2xl py-4 px-6 md:px-12 shadow-2xl border-b border-white/5' : 'bg-transparent py-6 md:py-8 px-6 md:px-12 border-b border-transparent'
                }`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between relative z-[1002]">
                    {/* Logo Section */}
                    <Link to="/" className="inline-flex items-center no-underline group outline-none">
                        <img src={logo} alt="OreNa Logo" className="h-12 md:h-16 w-auto transition-transform duration-500 group-hover:scale-110" />
                    </Link>

                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative py-4 group flex items-center h-full"
                                onMouseEnter={() => setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    to={link.path}
                                    className={`text-sm font-black uppercase tracking-[2px] transition-all duration-300 no-underline flex items-center gap-2 hover:text-[#2ECC71] hover:drop-shadow-[0_0_10px_rgba(46,204,113,0.4)] ${location.pathname === link.path ? 'text-[#2ECC71]' : 'text-white/70'
                                        }`}
                                >
                                    {link.name}
                                    {link.dropdown && <span className={`text-[10px] transform transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-[#2ECC71]' : 'opacity-50'}`}>▼</span>}
                                </Link>

                                {/* Dropdown Menu */}
                                {link.dropdown && (
                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                                className="absolute top-full -left-4 min-w-[280px] bg-[#0a0e0b]/95 backdrop-blur-3xl p-6 rounded-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col gap-3 mt-2 overflow-visible"
                                            >
                                                {/* Specialized Pointer - Fixed left alignment to match word start */}
                                                <div 
                                                    className="absolute -top-[6px] left-10 w-3 h-3 bg-[#0a0e0b] border-t border-l border-white/10 rotate-45 pointer-events-none" 
                                                />
                                                
                                                {link.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        to={sub.path}
                                                        className="no-underline text-white/50 hover:text-[#2ECC71] text-[10px] font-black uppercase tracking-[2px] p-4 rounded-xl transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-[#2ECC71]/20 flex items-center"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}

                        <div className="flex items-center gap-6 ml-4">
                            <Link to="/admission#form-section" className="no-underline">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0_0_30px_rgba(46,204,113,0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl transition-all duration-300"
                                >
                                    Admission
                                </motion.button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle Navigation"
                        className="lg:hidden flex flex-col gap-2 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all group min-h-[48px] min-w-[48px] items-center justify-center cursor-pointer"
                    >
                        <span className={`w-6 h-0.5 bg-[#2ECC71] transition-all rounded-full ${mobileOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                        <span className={`w-6 h-0.5 bg-[#2ECC71] transition-all rounded-full ${mobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-0.5 bg-[#2ECC71] transition-all rounded-full ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                    </button>
                </div>
            </nav>
            {/* Mobile Menu Overlay Moved Outside Nav to Prevent Stacking Context Clipping */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-[#0a0e0b]/80 backdrop-blur-xl z-[1100]"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0e0b] border-l border-white/10 p-8 md:p-12 pt-32 shadow-[-40px_0_100px_rgba(0,0,0,0.8)] z-[1200] overflow-y-auto flex flex-col"
                        >
                            {/* Decorative Labels */}
                            <div className="absolute top-10 left-10 flex flex-col gap-1 text-white/10 text-[10px] font-black uppercase tracking-[4px] pointer-events-none">
                                <span>OreNa</span>
                                <span>Portal_V2</span>
                            </div>

                            <button
                                onClick={() => setMobileOpen(false)}
                                className="absolute top-10 right-10 text-white/40 hover:text-[#2ECC71] transition-colors"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            {/* Mobile Navigation Content */}
                            <div className="flex flex-col gap-12 mt-4">
                                {navLinks.map((link) => (
                                    <div key={link.name} className="flex flex-col gap-6">
                                        <Link
                                            to={link.path}
                                            onClick={() => setMobileOpen(false)}
                                            className={`text-4xl sm:text-5xl font-black no-underline tracking-tighter transition-all duration-300 ${location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                                                ? 'text-[#2ECC71]'
                                                : 'text-white'
                                                } hover:text-[#2ECC71]`}
                                        >
                                            {link.name}
                                        </Link>

                                        {link.dropdown && (
                                            <div className="flex flex-col gap-5 pl-6 border-l-2 border-[#2ECC71]/20">
                                                {link.dropdown.map(sub => (
                                                    <Link
                                                        key={sub.name}
                                                        to={sub.path}
                                                        onClick={() => setMobileOpen(false)}
                                                        className={`text-xs font-black no-underline transition-all duration-300 uppercase tracking-[2px] ${location.pathname === sub.path
                                                            ? 'text-[#2ECC71]'
                                                            : 'text-white/40'
                                                            } hover:text-[#2ECC71]`}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Menu Footer */}
                            <div className="mt-16 pt-10 border-t border-white/5 space-y-10">
                                <Link to="/admission#form-section" onClick={() => setMobileOpen(false)} className="no-underline">
                                    <button className="w-full bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] p-6 rounded-2xl text-base font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95 border-none cursor-pointer">
                                        Admission
                                    </button>
                                </Link>
                                <div className="text-[10px] font-black text-white/20 uppercase tracking-[4px] leading-relaxed">
                                    Crafting Preferred Engineers <br /> for the Global Stage.
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

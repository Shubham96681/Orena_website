import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const footerLinks = [
    { title: 'Learn More', items: ['Home', 'Services', 'Experts', 'Courses', 'Careers', 'About'] },
    { title: 'Legal', items: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Admin'] },
    { title: 'Resources', items: ['Case Studies', 'Blog', 'Support Center', 'FAQ'] }
];

export default function Footer() {
    return (
        <footer className="pt-24 md:pt-32 pb-12 md:pb-20 px-6 md:px-12 bg-[#0a0e0b] text-white/50 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 md:mb-24">

                    {/* Brand Section */}
                    <div>
                        <Link to="/" className="inline-flex items-center mb-8 no-underline">
                            <img src={logo} alt="OreNa Logo" className="h-16 w-auto" />
                        </Link>
                        <p className="text-base leading-relaxed mb-10 text-white/40 font-medium">
                            Crafting preferred engineers for the global stage. Leading the wave in digital transformation and ICT excellence.
                        </p>
                        <div className="flex gap-4">
                            {['facebook', 'twitter', 'linkedin', 'github'].map((s) => (
                                <a
                                    key={s}
                                    href={`#${s}`}
                                    className="w-10 h-10 rounded-xl bg-[#2ECC71]/10 border border-[#2ECC71]/20 flex items-center justify-center text-[#2ECC71] transition-all duration-300 hover:bg-[#2ECC71] hover:text-[#0a0e0b] no-underline"
                                >
                                    <span className="text-xl">🌐</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white text-lg font-black mb-8 tracking-tight uppercase text-xs tracking-[2px]">{section.title}</h4>
                            <div className="flex flex-col gap-4">
                                {section.items.map((item) => {
                                    let path = `/${item.toLowerCase().replace(/ /g, '-')}`;
                                    if (item === 'Privacy Policy') path = '/privacy';
                                    if (item === 'Terms of Service') path = '/terms';
                                    if (item === 'Cookie Policy') path = '/privacy'; // Fallback to privacy
                                    if (item === 'Admin') path = '/admin';
                                    
                                    const finalPath = item === 'Courses' ? `${path}#courses-grid` : path;
                                    return (
                                        <Link
                                            key={item}
                                            to={finalPath}
                                            className="text-white/40 no-underline text-base font-bold transition-all duration-300 hover:text-[#2ECC71] hover:translate-x-2"
                                        >
                                            {item}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-16">
                    <div className="text-xs md:text-sm font-black text-white/20 order-2 md:order-1 text-center md:text-left">
                        © {new Date().getFullYear()} ORENA SOLUTION. ALL RIGHTS RESERVED. OPERATIONAL EXCELLENCE GUARANTEED.
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-xs md:text-sm font-black order-1 md:order-2 items-center">
                        <Link to="/contact#form-section" className="text-[#2ECC71] no-underline uppercase tracking-[2px] hover:brightness-110 transition-all shadow-[#2ECC71]/20">contactus@orena.solutions</Link>
                        <span className="text-white/30 tracking-[3px] font-bold">+91 98243 47721</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

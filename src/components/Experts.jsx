import React, { useEffect, useRef } from 'react';

const Avatar = ({ color, jacket, skin, hair }) => (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
        <circle cx="30" cy="30" r="30" fill={color} />
        <ellipse cx="30" cy="40" rx="17" ry="14" fill={jacket} />
        <circle cx="30" cy="22" r="13" fill={skin} />
        <path d="M17 18 Q30 10 43 18 Q40 9 30 8 Q20 9 17 18Z" fill={hair} />
        <circle cx="25" cy="23" r="2.8" fill="#1c1208" />
        <circle cx="35" cy="23" r="2.8" fill="#1c1208" />
        <path d="M25 30 Q30 35 35 30" stroke="#c07858" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
);

export default function Experts() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        const container = sectionRef.current;
        if (container) {
            const reveals = container.querySelectorAll('.rv, .rv-fade');
            reveals.forEach(el => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    const experts = [
        {
            name: "AI Engineer",
            meta: "Cloud & Strategy — 1+ years",
            sal: "₹5K–6L / mo",
            tags: ["PyTorch", "LangChain", "Potential"],
            avatar: { color: "#ccebd4", jacket: "#66bb6a", skin: "#f8d0b0", hair: "#1c1208" }
        },
        {
            name: "Cloud Architect",
            meta: "Cloud & Infra — 5+ years",
            sal: "₹8K–12L / mo",
            tags: ["AWS", "Kubernetes", "Terraform"],
            avatar: { color: "#b3d9be", jacket: "#388e3c", skin: "#f5c5a3", hair: "#0d0a04" }
        },
        {
            name: "Data Scientist",
            meta: "Analytics — 1+ years",
            sal: "₹6K–9L / mo",
            tags: ["Data Commons", "Airflow", "Spark"],
            avatar: { color: "#a5d6b0", jacket: "#2e7d52", skin: "#f0b898", hair: "#1c1208" }
        }
    ];

    return (
        <section ref={sectionRef} className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden text-center bg-gradient-to-br from-[#0b2918] via-[#0e3220] to-[#153c24]">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2ECC71_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* SOLID BUBBLES */}
            <div className="absolute w-3 h-3 top-[15%] left-[8%] bg-[#2ECC71] rounded-full animate-pulse shadow-[0_0_20px_#2ECC71]" />
            <div className="absolute w-2 h-2 bottom-[25%] right-[12%] bg-[#2ECC71] rounded-full animate-pulse delay-700 shadow-[0_0_20px_#2ECC71]" />

            <div className="absolute bottom-[-120px] right-[-100px] w-96 h-96 bg-[#2ECC71]/15 rounded-full blur-[100px]" />

            <h2 className="rv-fade text-3xl md:text-5xl lg:text-6xl font-black text-white mb-16 tracking-tighter leading-tight relative z-10">
                Find Pre-Vetted Engineers
                <span className="text-[#2ECC71] block mt-2">Ready to Deploy in Your Organization</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative z-10 max-w-7xl mx-auto px-4">
                {experts.map((e, i) => (
                    <div key={i} className="rv bg-white/95 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-6 sm:p-8 md:p-10 text-left shadow-2xl border border-white/50 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_45px_100px_rgba(0,0,0,0.8)] group overflow-hidden flex flex-col h-full w-full">
                        <div className="flex items-center gap-5 md:gap-6 mb-8">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-4 border-white shadow-xl overflow-hidden shrink-0 group-hover:scale-110 transition-transform duration-500">
                                <Avatar {...e.avatar} />
                            </div>
                            <div className="flex-grow">
                                <div className="text-lg md:text-xl font-black text-[#0a0e0b] tracking-tight">{e.name}</div>
                                <div className="text-[10px] font-bold text-[#2ECC71]/60 uppercase tracking-widest mt-1">{e.meta}</div>
                                <div className="text-xs font-black text-[#2ECC71] mt-2 bg-[#2ECC71]/5 inline-block py-1 px-3 rounded-lg border border-[#2ECC71]/10">{e.sal}</div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-10">
                            {e.tags.map((t, ti) => (
                                <span key={ti} className="bg-[#0a0e0b]/5 text-[#0a0e0b]/60 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-black/5 group-hover:bg-[#2ECC71] group-hover:text-white group-hover:border-[#2ECC71] transition-all duration-300">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="mt-auto">
                            <Link to="/experts" className="no-underline">
                                <motion.button 
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-gradient-to-r from-[#2ECC71] to-[#6DD400] text-[#0a0e0b] py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#2ECC71]/20 group-hover:shadow-[0_0_30px_#2ECC71]"
                                >
                                    Talent Profile &rarr;
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .home-expert-card:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 40px 80px -15px rgba(0,0,0,0.4); border-color: rgba(76, 175, 80, 0.4); }
        .home-expert-btn:hover { background: #fff !important; color: #1a5c32 !important; box-shadow: 0 8px 20px rgba(0,0,0,0.1); transform: scale(1.03); }
      `}} />
        </section>
    );
}

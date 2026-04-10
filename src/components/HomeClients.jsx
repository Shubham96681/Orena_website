import React from 'react';

const clients = [
    { name: 'Reliance', logo: '⚡' },
    { name: 'Adani', logo: '🌐' },
    { name: 'Evosys', logo: '☁️' },
    { name: 'Cognixia', logo: '🧠' },
    { name: 'Tata Motors', logo: '🚘' },
    { name: 'L&T', logo: '🏗️' },
    { name: 'TCS', logo: '💻' },
    { name: 'Infosys', logo: '🛡️' },
    { name: 'Tech Mahindra', logo: '🔗' },
];

export default function HomeClients() {
    // We clone the list for seamless marquee scroll
    const scrollList = [...clients, ...clients, ...clients];

    return (
        <section className="py-16 md:py-24" style={{ 
            background: '#0a0e0b', 
            position: 'relative', 
            overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="text-center mb-12 relative z-10 px-4">
                <p className="text-[10px] md:text-xs font-black text-white/30 uppercase tracking-[4px]">
                    Trusted By Industry Leaders
                </p>
            </div>

            <div className="relative overflow-hidden whitespace-nowrap">
                {/* Gradient fades on edges */}
                <div className="absolute top-0 left-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-[#0a0e0b] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-[#0a0e0b] to-transparent z-10 pointer-events-none" />

                {/* Marquee track */}
                <div className="client-track inline-flex gap-8 md:gap-12 py-6">
                    {scrollList.map((c, i) => (
                        <div key={i} className="flex items-center gap-4 bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-4 md:px-10 md:py-6 border border-white/10 shadow-xl hover:border-[#2ECC71]/30 transition-all duration-300">
                            <span className="text-2xl md:text-3xl opacity-80">{c.logo}</span>
                            <span className="text-sm md:text-xl font-black text-white/70 tracking-tight">{c.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); } 
                }
                .client-track { animation: scroll 40s linear infinite; }
                .client-track:hover { animation-play-state: paused; }
            ` }} />
        </section>
    );
}


import React from 'react'

export default function Domains() {

    const domains = [
        {
            title: "ICT Consulting",
            desc: "Strategic infrastructure planning and digital transformation roadmaps for scale."
        },
        {
            title: "DevOps Enclaved",
            desc: "Architecting secure automated CI/CD pipelines with multi-cloud redundancy."
        },
        {
            title: "Cloud Native",
            desc: "Building serverless systems optimized for sub-second global performance."
        },
        {
            title: "Applied AI",
            desc: "Integrating Generative AI and LLMs into legacy enterprise workflows."
        }
    ]

    return (

        <section className="bg-[#020617] text-white py-32 relative">

            <div className="absolute inset-0 grid-bg opacity-30"></div>

            <div className="max-w-7xl mx-auto px-6">

                <p className="text-emerald-400 text-center tracking-widest mb-4">
                    ELITE CAPABILITIES
                </p>

                <h2 className="text-4xl font-bold text-center mb-16">
                    Our Core Domains
                </h2>


                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {domains.map((d, i) => (
                        <div
                            key={i}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/40 transition">

                            <h3 className="text-xl font-semibold mb-4">
                                {d.title}
                            </h3>

                            <p className="text-gray-400">
                                {d.desc}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </section>

    )

}

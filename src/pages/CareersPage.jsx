import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CareersPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/jobs')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-[#0a0e0b] min-h-screen text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#128a44]">Opportunity</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Explore global career paths with OreNa and our top corporate partners. Find the role that matches your expertise.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center text-[#2ECC71] my-20">Loading available positions...</div>
                ) : jobs.length === 0 ? (
                    <div className="text-center bg-gray-900 border border-gray-800 p-12 rounded-2xl">
                        <h2 className="text-2xl font-bold text-gray-300 mb-4">No open positions right now</h2>
                        <p className="text-gray-500 mb-6">We're always looking for talent. Feel free to submit an open application.</p>
                        <Link to="/careers/general/apply" className="inline-block bg-[#2ECC71] text-[#0a0e0b] px-6 py-3 rounded-full font-bold hover:bg-[#27ae60] transition-colors">
                            Submit General Application
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {jobs.map((job, idx) => (
                            <motion.div 
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-[#2ECC71] transition-colors group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-auto">
                                        <h2 className="text-2xl font-bold text-white mb-1">{job.title}</h2>
                                        <p className="text-[#2ECC71] text-xs font-black uppercase tracking-[2px] mb-4">{job.company_name}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {job.location && <span className="px-3 py-1 bg-gray-800 text-xs text-gray-300 rounded-full">{job.location}</span>}
                                            {job.type && <span className="px-3 py-1 bg-gray-800 text-xs text-gray-300 rounded-full">{job.type}</span>}
                                            {job.experience_required && <span className="px-3 py-1 bg-[#2ECC71]/20 text-[#2ECC71] text-xs font-medium rounded-full">{job.experience_required}</span>}
                                        </div>
                                        <p className="text-gray-400 text-sm whitespace-pre-wrap">{job.description}</p>
                                    </div>
                                    <div className="mt-8 pt-4 border-t border-gray-800 flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Posted: {new Date(job.created_at).toLocaleDateString()}</span>
                                        <Link to={`/careers/${job.id}/apply`} className="text-[#2ECC71] font-bold group-hover:underline">
                                            Apply Now &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

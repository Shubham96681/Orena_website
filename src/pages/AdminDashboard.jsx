import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    
    const [tab, setTab] = useState('leads'); // leads, contacts, jobs, applications
    const [leads, setLeads] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    const [appFilters, setAppFilters] = useState({
        searchTerm: '', position: '', experience: '', notice_period: ''
    });

    const [newJob, setNewJob] = useState({
        title: '', company_name: '', description: '', location: '', type: 'Full-Time', department: '', experience_required: ''
    });

    const API_BASE = '/api';

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsAuthenticated(true);
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const headers = { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` };
            const [resLeads, resContacts, resJobs, resApps] = await Promise.all([
                fetch(`${API_BASE}/leads`, { headers }),
                fetch(`${API_BASE}/contacts`, { headers }),
                fetch(`${API_BASE}/jobs`), // Public but fetching for admin view
                fetch(`${API_BASE}/applications`, { headers })
            ]);

            setLeads(await resLeads.json());
            setContacts(await resContacts.json());
            setJobs(await resJobs.json());
            setApplications(await resApps.json());
        } catch (error) {
            toast.error('Failed to fetch data');
            console.error(error);
        }
        setLoading(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                setIsAuthenticated(true);
                toast.success('Logged in successfully');
                fetchData();
            } else {
                toast.error(data.details || data.error || 'Invalid credentials');
            }
        } catch (err) {
            toast.error('Login error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        toast.success('Logged out');
    };

    const handleCreateJob = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/jobs`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(newJob)
            });
            if (res.ok) {
                toast.success('Job posted successfully');
                setNewJob({ title: '', company_name: '', description: '', location: '', type: 'Full-Time', department: '', experience_required: '' });
                fetchData();
            } else {
                toast.error('Failed to post job');
            }
        } catch (err) {
            toast.error('Error posting job');
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm('Delete this job?')) return;
        try {
            const res = await fetch(`${API_BASE}/jobs/${id}`, { 
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
            });
            if (res.ok) {
                toast.success('Job deleted');
                fetchData();
            }
        } catch (err) {
            toast.error('Error deleting job');
        }
    };

    const filteredApplications = applications.filter(a => {
        const matchSearch = !appFilters.searchTerm || 
            a.name.toLowerCase().includes(appFilters.searchTerm.toLowerCase()) || 
            a.email.toLowerCase().includes(appFilters.searchTerm.toLowerCase()) ||
            a.phone.includes(appFilters.searchTerm);
        const matchPosition = !appFilters.position || a.applied_position === appFilters.position;
        const matchExp = !appFilters.experience || a.experience === appFilters.experience;
        const matchNotice = !appFilters.notice_period || a.notice_period === appFilters.notice_period;

        return matchSearch && matchPosition && matchExp && matchNotice;
    });

    const uniquePositions = [...new Set(applications.map(a => a.applied_position))].filter(Boolean);
    const uniqueExp = [...new Set(applications.map(a => a.experience))].filter(Boolean);
    const uniqueNotice = [...new Set(applications.map(a => a.notice_period))].filter(Boolean);

    const downloadCSV = (data, filename) => {
        if (!data || !data.length) {
            toast.error('No data to download');
            return;
        }
        const keys = Object.keys(data[0]);
        const csvContent = [
            keys.join(','),
            ...data.map(row => keys.map(k => {
                const cell = row[k] === null || row[k] === undefined ? '' : String(row[k]);
                return `"${cell.replace(/"/g, '""')}"`;
            }).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0a0e0b] flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
                    <form onSubmit={handleLogin} className="bg-gray-900/50 backdrop-blur-3xl p-10 rounded-[40px] border border-white/5 shadow-2xl">
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#2ECC71] to-[#36D1DC] rounded-3xl flex items-center justify-center text-4xl shadow-[0_20px_50px_rgba(46,204,113,0.3)]">
                                🔐
                            </div>
                        </div>
                        <h2 className="text-3xl font-black mb-2 text-white text-center tracking-tighter uppercase">Admin Link</h2>
                        <p className="text-gray-500 text-center text-xs font-bold uppercase tracking-[4px] mb-10">Secure Intelligence Portal</p>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-[3px] pl-1 mb-2 block">Operator ID</label>
                                <input type="text" required value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})} className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-[#2ECC71] transition-all" placeholder="Enter Username..." />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-[3px] pl-1 mb-2 block">Access Code</label>
                                <input type="password" required value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-[#2ECC71] transition-all" placeholder="••••••••" />
                            </div>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-to-r from-[#2ECC71] to-[#36D1DC] text-black font-black uppercase tracking-[3px] py-5 rounded-2xl mt-4 shadow-xl flex items-center justify-center leading-none text-xs cursor-pointer border-none">
                                Synchronize Portal
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0e0b] text-white pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2ECC71]/5 blur-[120px] rounded-full -mr-96 -mt-96 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -ml-48 -mb-48 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <span className="w-8 h-[2px] bg-[#2ECC71]"></span>
                            <span className="text-[10px] text-[#2ECC71] font-black uppercase tracking-[5px]">Core Intelligence</span>
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">Admin Portal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#36D1DC]">V2.0</span></h1>
                        <p className="text-gray-500 font-bold uppercase tracking-[2px] mt-2 text-xs">Managing OreNa Educational Services & Operations</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout} className="bg-red-500/5 border border-red-500/20 text-red-500 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[3px] hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                        Protocol Logout
                    </motion.button>
                </div>
                
                <div className="flex space-x-2 border-b border-white/5 mb-12 overflow-x-auto pb-1 scrollbar-hide">
                    {['leads', 'contacts', 'jobs', 'applications'].map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`relative py-5 px-10 text-[10px] font-black uppercase tracking-[3px] transition-all whitespace-nowrap cursor-pointer border-none bg-transparent ${tab === t ? 'text-[#2ECC71]' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            {t}
                            {tab === t && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#2ECC71] shadow-[0_0_20px_rgba(46,204,113,0.6)]"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            key="loadingState"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-40"
                        >
                            <div className="relative w-20 h-20">
                                <div className="absolute inset-0 border-4 border-[#2ECC71]/10 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-[#2ECC71] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <span className="text-[#2ECC71] font-black uppercase tracking-[5px] text-[10px] mt-12 animate-pulse">Syncing Cloud Matrix...</span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        >
                            {tab === 'leads' && (
                                <div className="space-y-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <h2 className="text-3xl font-black uppercase tracking-tighter">Leads Repository <span className="text-[#2ECC71]/40 ml-4 font-medium">[{leads.length}]</span></h2>
                                        <button onClick={() => downloadCSV(leads, 'leads.csv')} className="bg-white/5 border border-white/10 px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[3px] flex items-center gap-3 hover:bg-[#2ECC71] hover:text-black transition-all cursor-pointer">
                                            📥 Download Stream
                                        </button>
                                    </div>
                                    <div className="overflow-hidden bg-white/[0.02] border border-white/5 rounded-[40px] shadow-2xl backdrop-blur-3xl">
                                        <table className="w-full text-left text-sm">
                                            <thead><tr className="border-b border-white/5 bg-white/5"><th className="p-8 font-black uppercase tracking-[3px] text-[10px] text-gray-500">Subject Identity</th><th className="p-8 font-black uppercase tracking-[3px] text-[10px] text-gray-500">Contact Vector</th><th className="p-8 font-black uppercase tracking-[3px] text-[10px] text-gray-500">Operation Mode</th><th className="p-8 font-black uppercase tracking-[3px] text-[10px] text-gray-500">Timestamp</th></tr></thead>
                                            <tbody className="divide-y divide-white/5">
                                                {leads.map((l, i) => (
                                                    <motion.tr 
                                                        key={l.id} 
                                                        initial={{ opacity: 0, x: -10 }} 
                                                        animate={{ opacity: 1, x: 0 }} 
                                                        transition={{ delay: i * 0.02 }}
                                                        className="hover:bg-white/5 transition-colors group"
                                                    >
                                                        <td className="p-8">
                                                            <div className="font-black text-gray-200 group-hover:text-[#2ECC71] transition-colors">{l.name}</div>
                                                            <div className="text-[10px] text-gray-600 font-bold uppercase tracking-[2px] mt-1">ID: {l.id}</div>
                                                        </td>
                                                        <td className="p-8 text-gray-500 font-medium">
                                                            <div>{l.email}</div>
                                                            <div className="text-[10px] text-gray-600 mt-1 uppercase tracking-tighter">{l.phone}</div>
                                                        </td>
                                                        <td className="p-8"><span className="px-4 py-2 bg-[#2ECC71]/10 text-[#2ECC71] text-[9px] font-black rounded-full uppercase tracking-widest border border-[#2ECC71]/20">{l.interest || 'General Observation'}</span></td>
                                                        <td className="p-8 text-gray-600 text-[10px] font-black uppercase tracking-widest">{new Date(l.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {tab === 'contacts' && (
                                <div className="space-y-10">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <h2 className="text-3xl font-black uppercase tracking-tighter">Communications Hub <span className="text-[#2ECC71]/40 ml-4 font-medium">[{contacts.length}]</span></h2>
                                        <button onClick={() => downloadCSV(contacts, 'contacts.csv')} className="bg-white/5 border border-white/10 px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[3px] flex items-center gap-3 hover:bg-[#2ECC71] hover:text-black transition-all cursor-pointer">
                                            📥 Export Log
                                        </button>
                                    </div>
                                    <div className="grid gap-8">
                                        {contacts.map((c, i) => (
                                            <motion.div 
                                                key={c.id} 
                                                initial={{ opacity: 0, scale: 0.98 }} 
                                                animate={{ opacity: 1, scale: 1 }} 
                                                transition={{ delay: i * 0.05 }}
                                                className="bg-white/[0.02] border border-white/5 p-10 rounded-[48px] group hover:border-[#2ECC71]/20 transition-all shadow-xl relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 w-2 h-full bg-[#2ECC71]/10"></div>
                                                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                                                    <div>
                                                        <h3 className="text-2xl font-black tracking-tighter uppercase group-hover:text-[#2ECC71] transition-colors">{c.name}</h3>
                                                        <div className="flex flex-wrap gap-4 mt-2">
                                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-[2px]">{c.email}</span>
                                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-[2px]">|</span>
                                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-[2px]">{c.phone}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[4px] bg-white/5 px-5 py-2 rounded-full border border-white/5">{new Date(c.created_at).toLocaleString()}</span>
                                                </div>
                                                <div className="bg-black/40 p-8 rounded-3xl border border-white/[0.03] shadow-inner">
                                                    <p className="text-[10px] font-black text-[#2ECC71] uppercase tracking-[4px] mb-4 opacity-70">Subject Analysis: {c.subject || 'Standard Transmission'}</p>
                                                    <p className="text-gray-400 leading-relaxed text-sm font-medium italic">"{c.message}"</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {tab === 'jobs' && (
                                <div className="grid lg:grid-cols-12 gap-16">
                                    <div className="lg:col-span-4 lg:sticky lg:top-36 h-fit">
                                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-10">Initial Deployment</h2>
                                        <form onSubmit={handleCreateJob} className="bg-white/[0.02] p-10 rounded-[48px] border border-white/5 space-y-8 shadow-3xl backdrop-blur-3xl">
                                            <div className="space-y-6">
                                                <div><label className="text-[10px] font-black uppercase text-gray-600 tracking-[3px] mb-3 block ml-1">Job Specification</label><input type="text" required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} placeholder="e.g. Lead Core Engineer" className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-white text-sm outline-none focus:border-[#2ECC71] transition-all placeholder:text-gray-800" /></div>
                                                <div><label className="text-[10px] font-black uppercase text-gray-600 tracking-[3px] mb-3 block ml-1">Operating Client</label><input type="text" required value={newJob.company_name} onChange={e => setNewJob({...newJob, company_name: e.target.value})} placeholder="OreNa Int" className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-white text-sm outline-none focus:border-[#2ECC71] transition-all placeholder:text-gray-800" /></div>
                                            </div>
                                            <div><label className="text-[10px] font-black uppercase text-gray-600 tracking-[3px] mb-3 block ml-1">Operational Requirements</label><textarea required value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} placeholder="Define core parameters..." className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-white text-sm outline-none focus:border-[#2ECC71] transition-all placeholder:text-gray-800 resize-none h-40" rows="4"></textarea></div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div><label className="text-[10px] font-black uppercase text-gray-600 tracking-[3px] mb-3 block ml-1">Grid Sector</label><input type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} placeholder="Remote" className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-white text-sm outline-none focus:border-[#2ECC71] transition-all placeholder:text-gray-800" /></div>
                                                <div><label className="text-[10px] font-black uppercase text-gray-600 tracking-[3px] mb-3 block ml-1">Division</label><input type="text" value={newJob.department} onChange={e => setNewJob({...newJob, department: e.target.value})} placeholder="HQ" className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-white text-sm outline-none focus:border-[#2ECC71] transition-all placeholder:text-gray-800" /></div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-gray-600 tracking-[3px] mb-3 block ml-1">Protocol Type</label>
                                                <select value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})} className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-white text-sm outline-none focus:border-[#2ECC71] appearance-none cursor-pointer uppercase font-black tracking-widest text-[10px]">
                                                    <option>Full-Time</option><option>Part-Time</option><option>Internship</option>
                                                </select>
                                            </div>
                                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-to-r from-[#2ECC71] to-[#36D1DC] text-black font-black uppercase tracking-[4px] py-6 rounded-2xl mt-6 shadow-[0_20px_60px_rgba(46,204,113,0.3)] cursor-pointer border-none text-[10px]">
                                                Deploy Specification
                                            </motion.button>
                                        </form>
                                    </div>

                                    <div className="lg:col-span-8">
                                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-10">Active Grid <span className="text-[#2ECC71]/40 ml-4 font-medium">[{jobs.length}]</span></h2>
                                        <div className="grid gap-10">
                                            {jobs.map((j, i) => (
                                                <motion.div 
                                                    key={j.id} 
                                                    initial={{ opacity: 0, x: 20 }} 
                                                    animate={{ opacity: 1, x: 0 }} 
                                                    transition={{ delay: i * 0.1 }}
                                                    className="bg-white/[0.02] border border-white/5 p-12 rounded-[56px] group hover:border-[#2ECC71]/30 transition-all shadow-2xl relative overflow-hidden"
                                                >
                                                    <div className="absolute top-0 right-0 p-10">
                                                        <button onClick={() => handleDeleteJob(j.id)} className="text-[9px] font-black uppercase tracking-[3px] text-red-500/20 hover:text-red-500 transition-all border border-red-500/10 hover:border-red-500/50 bg-red-500/5 px-6 py-3 rounded-full cursor-pointer">Terminate Link</button>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
                                                        <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#2ECC71]/20 to-transparent border border-white/5 flex items-center justify-center text-4xl shadow-inner">
                                                            ⚡
                                                        </div>
                                                        <div>
                                                            <p className="text-[11px] text-[#2ECC71] font-black uppercase tracking-[6px] mb-2">{j.company_name}</p>
                                                            <h3 className="text-3xl font-black tracking-tighter group-hover:text-white transition-colors uppercase leading-none">{j.title}</h3>
                                                            <div className="flex flex-wrap gap-4 mt-6">
                                                                <span className="text-[10px] text-gray-600 uppercase font-black tracking-[3px] bg-white/5 px-5 py-2 rounded-full border border-white/5">{j.location}</span>
                                                                <span className="text-[10px] text-[#2ECC71] uppercase font-black tracking-[3px] bg-[#2ECC71]/5 px-5 py-2 rounded-full border border-[#2ECC71]/10">{j.type}</span>
                                                                <span className="text-[10px] text-blue-500 uppercase font-black tracking-[3px] bg-blue-500/5 px-5 py-2 rounded-full border border-blue-500/10">{j.department || 'GEN_OPS'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-12 pt-10 border-t border-white/5 flex justify-between items-center -mx-12 -mb-12 px-12 py-6 bg-white/[0.01]">
                                                        <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Initialization DT: {new Date(j.created_at).toLocaleDateString()}</span>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse"></div>
                                                            <span className="text-[10px] text-[#2ECC71] font-black uppercase tracking-[3px]">Link Status: Secure</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {tab === 'applications' && (
                                <div className="space-y-12">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <h2 className="text-3xl font-black uppercase tracking-tighter">Candidate Matrix <span className="text-[#2ECC71]/40 ml-4 font-medium">[{filteredApplications.length}]</span></h2>
                                        <button onClick={() => downloadCSV(filteredApplications, 'applications.csv')} className="bg-white/5 border border-white/10 px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[3px] flex items-center gap-3 hover:bg-[#2ECC71] hover:text-black transition-all cursor-pointer">
                                            📥 Download Data Matrix
                                        </button>
                                    </div>

                                    {/* Advanced Search Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-12 bg-white/[0.02] border border-white/5 rounded-[56px] shadow-3xl backdrop-blur-3xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ECC71]/5 blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-gray-600 tracking-[3px] ml-1">Identity Filter</label>
                                            <input type="text" placeholder="Scanning name/address..." value={appFilters.searchTerm} onChange={e => setAppFilters({...appFilters, searchTerm: e.target.value})} className="w-full bg-black/50 border border-white/5 p-5 rounded-2xl text-[11px] text-white outline-none focus:border-[#2ECC71] transition-all placeholder:text-gray-800" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-gray-600 tracking-[3px] ml-1">Target Vector</label>
                                            <select value={appFilters.position} onChange={e => setAppFilters({...appFilters, position: e.target.value})} className="w-full bg-black/50 border border-white/5 p-5 rounded-2xl text-[11px] text-white outline-none focus:border-[#2ECC71] appearance-none cursor-pointer uppercase font-bold tracking-widest">
                                                <option value="">All Vectors</option>
                                                {uniquePositions.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-gray-600 tracking-[3px] ml-1">Experience Tier</label>
                                            <select value={appFilters.experience} onChange={e => setAppFilters({...appFilters, experience: e.target.value})} className="w-full bg-black/50 border border-white/5 p-5 rounded-2xl text-[11px] text-white outline-none focus:border-[#2ECC71] appearance-none cursor-pointer uppercase font-bold tracking-widest">
                                                <option value="">All Tiers</option>
                                                {uniqueExp.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-gray-600 tracking-[3px] ml-1">Interval Factor</label>
                                            <select value={appFilters.notice_period} onChange={e => setAppFilters({...appFilters, notice_period: e.target.value})} className="w-full bg-black/50 border border-white/5 p-5 rounded-2xl text-[11px] text-white outline-none focus:border-[#2ECC71] appearance-none cursor-pointer uppercase font-bold tracking-widest">
                                                <option value="">All Intervals</option>
                                                {uniqueNotice.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="overflow-hidden bg-white/[0.02] border border-white/5 rounded-[64px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
                                        <table className="w-full text-left text-sm whitespace-nowrap">
                                            <thead><tr className="border-b border-white/5 bg-white/5"><th className="p-10 font-black uppercase tracking-[4px] text-[10px] text-gray-500">Target Identity</th><th className="p-10 font-black uppercase tracking-[4px] text-[10px] text-gray-500">Contact Stream</th><th className="p-10 font-black uppercase tracking-[4px] text-[10px] text-gray-500">Education Matrix</th><th className="p-10 font-black uppercase tracking-[4px] text-[10px] text-gray-500">Applied Vector</th><th className="p-10 font-black uppercase tracking-[4px] text-[10px] text-gray-500">Binary Assets</th><th className="p-10 font-black uppercase tracking-[4px] text-[10px] text-gray-500">Analysis</th></tr></thead>
                                            <tbody className="divide-y divide-white/5">
                                                {filteredApplications.map((a, i) => (
                                                    <motion.tr key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/5 transition-colors group">
                                                        <td className="p-10">
                                                            <div className="font-black text-gray-200 group-hover:text-[#2ECC71] transition-colors uppercase text-lg leading-none mb-2">{a.name}</div>
                                                            <div className="text-[9px] text-gray-600 font-black uppercase tracking-[3px]">BIO_DT: {a.dob}</div>
                                                        </td>
                                                        <td className="p-10">
                                                            <div className="text-xs text-gray-400 font-bold">{a.email}</div>
                                                            <div className="text-[10px] text-gray-600 mt-2 uppercase tracking-[2px] font-black">{a.phone}</div>
                                                        </td>
                                                        <td className="p-10">
                                                            <div className="font-black text-xs truncate max-w-[200px] text-gray-300 uppercase tracking-tight">{a.college_name}</div>
                                                            <div className="text-[10px] text-blue-500 font-black uppercase tracking-[3px] mt-2 bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10 w-fit">{a.degree_percentage}% SCORE</div>
                                                        </td>
                                                        <td className="p-10">
                                                            <div className="font-black text-[#2ECC71] uppercase tracking-[3px] text-xs">{a.applied_position}</div>
                                                            <div className="text-[9px] text-gray-600 font-bold uppercase tracking-[2px] mt-2 italic">Notice Level: {a.notice_period}</div>
                                                        </td>
                                                        <td className="p-10">
                                                            <div className="flex gap-4">
                                                                {a.resume_path && <a href={`/uploads/${a.resume_path}`} target="_blank" rel="noreferrer" title="Binary Resume" className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all text-xl">📄</a>}
                                                                {a.certificate_path && <a href={`/uploads/${a.certificate_path}`} target="_blank" rel="noreferrer" title="Verify Credentials" className="w-12 h-12 rounded-2xl bg-[#2ECC71]/10 flex items-center justify-center text-[#2ECC71] border border-[#2ECC71]/20 hover:bg-[#2ECC71] hover:text-black transition-all text-xl">🏅</a>}
                                                            </div>
                                                        </td>
                                                        <td className="p-10">
                                                            <button onClick={() => setSelectedApp(a)} className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[3px] hover:bg-[#2ECC71] hover:text-black transition-all cursor-pointer">Protocol Review</button>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Enhanced Application Modal */}
            <AnimatePresence>
                {selectedApp && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] flex items-center justify-center p-8 overflow-hidden">
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedApp(null)}></div>
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 50 }} 
                            animate={{ scale: 1, opacity: 1, y: 0 }} 
                            exit={{ scale: 0.95, opacity: 0, y: 50 }} 
                            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                            className="bg-[#050505] border border-white/10 w-full max-w-6xl h-full max-h-[92vh] overflow-y-auto rounded-[64px] relative z-10 shadow-[0_0_120px_rgba(46,204,113,0.1)] custom-scrollbar"
                        >
                            <div className="sticky top-0 bg-[#050505]/90 backdrop-blur-3xl border-b border-white/5 p-12 flex justify-between items-center z-20">
                                <div>
                                    <h3 className="text-5xl font-black text-[#2ECC71] leading-none mb-3 uppercase tracking-tighter">{selectedApp.name}</h3>
                                    <div className="flex items-center gap-6">
                                        <span className="text-[11px] text-gray-500 font-black uppercase tracking-[6px]">Deep Profile Analysis Mode</span>
                                        <div className="flex gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse"></span>
                                            <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse delay-75"></span>
                                            <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse delay-150"></span>
                                        </div>
                                    </div>
                                </div>
                                <motion.button whileHover={{ rotate: 90 }} onClick={() => setSelectedApp(null)} className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-xl cursor-pointer">✕</motion.button>
                            </div>
                            
                            <div className="p-16 grid lg:grid-cols-2 gap-20">
                                <div className="space-y-16">
                                    <section>
                                        <h4 className="text-[11px] font-black text-white/20 uppercase tracking-[8px] mb-10 flex items-center gap-6"><span className="w-12 h-[1px] bg-white/10"></span> Identity Protocol</h4>
                                        <div className="bg-white/[0.02] p-10 rounded-[48px] border border-white/5 grid grid-cols-2 gap-10 shadow-inner">
                                            <div><p className="text-[10px] text-gray-600 uppercase font-black tracking-[4px] mb-3">Email Grid</p><p className="text-sm font-bold text-gray-200">{selectedApp.email}</p></div>
                                            <div><p className="text-[10px] text-gray-600 uppercase font-black tracking-[4px] mb-3">Phone Stream</p><p className="text-sm font-bold text-gray-200">{selectedApp.phone}</p></div>
                                            <div><p className="text-[10px] text-gray-600 uppercase font-black tracking-[4px] mb-3">Origin DT</p><p className="text-sm font-bold text-gray-200">{selectedApp.dob}</p></div>
                                            <div><p className="text-[10px] text-gray-600 uppercase font-black tracking-[4px] mb-3">Exp Hierarchy</p><p className="text-[11px] font-black text-[#2ECC71] bg-[#2ECC71]/10 px-5 py-2 rounded-full w-fit uppercase border border-[#2ECC71]/20 tracking-[2px]">{selectedApp.experience}</p></div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-[11px] font-black text-white/20 uppercase tracking-[8px] mb-10 flex items-center gap-6"><span className="w-12 h-[1px] bg-white/10"></span> Academic Matrix</h4>
                                        <div className="space-y-6">
                                            <div className="bg-white/[0.02] p-10 rounded-[48px] border border-white/5 group hover:border-[#2ECC71]/30 transition-all relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ECC71]/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#2ECC71]/10 transition-all"></div>
                                                <div className="flex justify-between items-start mb-6">
                                                    <p className="text-[10px] text-[#2ECC71] uppercase font-black tracking-[5px]">Core Foundation</p>
                                                    <span className="text-[10px] font-black bg-white/5 px-4 py-2 rounded-full uppercase tracking-widest">{selectedApp.bachelor_degree} GEN</span>
                                                </div>
                                                <p className="text-2xl font-black mb-2 group-hover:text-white transition-colors uppercase tracking-tighter">{selectedApp.engineering_discipline}</p>
                                                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-6">{selectedApp.college_name}</p>
                                                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-4 shadow-inner">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${selectedApp.degree_percentage}%` }} transition={{ duration: 1.5, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-[#2ECC71] to-[#36D1DC] shadow-[0_0_20px_rgba(46,204,113,0.5)]"></motion.div>
                                                </div>
                                                <p className="text-[10px] font-black text-white/40 uppercase tracking-[5px]">Efficiency: {selectedApp.degree_percentage}.00%</p>
                                            </div>
                                            {(selectedApp.master_degree || selectedApp.collage_name2) && (
                                                <div className="bg-white/[0.02] p-10 rounded-[48px] border border-white/5 group hover:border-blue-500/30 transition-all relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all"></div>
                                                    <div className="flex justify-between items-start mb-6">
                                                        <p className="text-[10px] text-blue-400 uppercase font-black tracking-[5px]">PG Specialization</p>
                                                        <span className="text-[10px] font-black bg-white/5 px-4 py-2 rounded-full uppercase tracking-widest">{selectedApp.master_degree} GEN</span>
                                                    </div>
                                                    <p className="text-2xl font-black mb-2 group-hover:text-white transition-colors uppercase tracking-tighter">{selectedApp.master_discipline || 'ADV_STUDIES'}</p>
                                                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mb-6">{selectedApp.collage_name2}</p>
                                                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-4 shadow-inner">
                                                        <motion.div initial={{ width: 0 }} animate={{ width: `${selectedApp.pg_percentage}%` }} transition={{ duration: 1.5, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></motion.div>
                                                    </div>
                                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[5px]">Efficiency: {selectedApp.pg_percentage}.00%</p>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-16">
                                    <section>
                                        <h4 className="text-[11px] font-black text-white/20 uppercase tracking-[8px] mb-10 flex items-center gap-6"><span className="w-12 h-[1px] bg-white/10"></span> Mission Metrics</h4>
                                        <div className="bg-gradient-to-br from-[#2ECC71]/15 to-transparent p-12 rounded-[56px] border border-[#2ECC71]/20 space-y-10 shadow-3xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2ECC71]/10 blur-[80px] -mr-24 -mt-24 group-hover:bg-[#2ECC71]/30 transition-all duration-700"></div>
                                            <div>
                                                <p className="text-[11px] text-gray-500 uppercase font-black tracking-[5px] mb-4">Target Deployment Vector</p>
                                                <p className="text-5xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#2ECC71] transition-colors">{selectedApp.applied_position}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-12">
                                                <div><p className="text-[11px] text-gray-600 uppercase font-black tracking-[4px] mb-3">Availability</p><p className="text-sm font-black text-gray-200 uppercase tracking-widest">{selectedApp.notice_period}</p></div>
                                                <div><p className="text-[11px] text-gray-600 uppercase font-black tracking-[4px] mb-3">Hub Location</p><p className="text-sm font-black text-gray-200 uppercase tracking-widest">{selectedApp.current_location}</p></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-12 pt-10 border-t border-white/10">
                                                <div><p className="text-[10px] text-gray-600 uppercase font-black tracking-[4px] mb-3">Current CTC Profile</p><p className="text-sm font-black text-gray-500 font-mono italic tracking-tighter">{selectedApp.ctc || 'PROTECTED_SEGMENT'}</p></div>
                                                <div><p className="text-[10px] text-[#2ECC71] uppercase font-black tracking-[4px] mb-3">Expected Efficiency Vector</p><p className="text-2xl font-black text-[#2ECC71] font-mono tracking-tighter shadow-green-500/10 drop-shadow-lg">{selectedApp.ectc}</p></div>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-[11px] font-black text-white/20 uppercase tracking-[8px] mb-10 flex items-center gap-6"><span className="w-12 h-[1px] bg-white/10"></span> Skill Manifold</h4>
                                        <div className="bg-white/[0.02] p-10 rounded-[48px] border border-white/5 space-y-8 shadow-inner">
                                            <div>
                                                <p className="text-[10px] text-gray-600 uppercase font-black tracking-[4px] mb-6">Technical Competency Stack</p>
                                                <div className="flex flex-wrap gap-3">
                                                    {(selectedApp.skills || '').split(',').map((s, idx) => (
                                                        <span key={idx} className="px-5 py-3 bg-white/5 rounded-2xl text-[10px] font-black text-gray-400 border border-white/10 hover:border-[#2ECC71]/40 hover:text-[#2ECC71] hover:scale-105 transition-all uppercase tracking-[2px]">{s.trim()}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="pt-8 border-t border-white/5">
                                                <p className="text-[10px] text-gray-600 uppercase font-black tracking-[4px] mb-3">Certification Protocol</p>
                                                <p className="text-lg font-black text-blue-400 uppercase tracking-tight">{selectedApp.certification_course || 'NONE_SPECIFIED'}</p>
                                                <p className="text-[11px] text-gray-600 font-black mt-1 tracking-[3px] uppercase">Verified Training Entity: {selectedApp.training_institute || 'SELF_TAUGHT'}</p>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="flex flex-col sm:flex-row gap-8 pt-4">
                                        {selectedApp.resume_path && (
                                            <motion.a whileHover={{ y: -6, boxShadow: '0_20px_40px_rgba(59,130,246,0.2)' }} href={`/uploads/${selectedApp.resume_path}`} target="_blank" rel="noreferrer" className="flex-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 py-8 rounded-[40px] text-[11px] font-black uppercase tracking-[5px] text-center hover:bg-blue-400 hover:text-white transition-all shadow-2xl no-underline">
                                                <span className="inline-block mr-3">📄</span> Download Resume
                                            </motion.a>
                                        )}
                                        {selectedApp.certificate_path && (
                                            <motion.a whileHover={{ y: -6, boxShadow: '0_20px_40px_rgba(46,204,113,0.2)' }} href={`/uploads/${selectedApp.certificate_path}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#2ECC71]/10 border border-[#2ECC71]/20 text-[#2ECC71] py-8 rounded-[40px] text-[11px] font-black uppercase tracking-[5px] text-center hover:bg-[#2ECC71] hover:text-black transition-all shadow-2xl no-underline">
                                                <span className="inline-block mr-3">🏅</span> Analysis Credentials
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center bg-white/[0.01] gap-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                                    <span className="text-[11px] font-black text-gray-700 uppercase tracking-[5px]">Protocol ID: SYS_{selectedApp.id}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[11px] font-black text-gray-600 uppercase tracking-[5px]">Log Recorded:</span>
                                    <span className="text-[11px] font-black text-white uppercase tracking-[5px] bg-white/5 px-6 py-2 rounded-full">{new Date(selectedApp.created_at).toLocaleString()}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(46, 204, 113, 0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(46, 204, 113, 0.4); }
            `}} />
        </div>
    );
}

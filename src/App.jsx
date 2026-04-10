import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AutoLeadPopup from "./components/AutoLeadPopup"
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home"
import ServicesPage from "./pages/ServicesPage"
import ExpertsPage from "./pages/ExpertsPage"
import CoursesPage from "./pages/CoursesPage"
import BlogPage from "./pages/BlogPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ServiceDetailPage from "./pages/ServiceDetailPage"
import AdmissionPage from "./pages/AdmissionPage"
import LegalPage from "./pages/LegalPage"
import AdminDashboard from "./pages/AdminDashboard"
import CareersPage from "./pages/CareersPage"
import ApplyJobPage from "./pages/ApplyJobPage"

// Sub-pages for About section
import TeamPage from "./pages/TeamPage"
import EventsPage from "./pages/EventsPage"
import AboutDomainsPage from "./pages/AboutDomainsPage"
import AboutExperiencePage from "./pages/AboutExperiencePage"
import AboutClientsPage from "./pages/AboutClientsPage"
import CampusDrivePage from "./pages/CampusDrivePage"

// Scroll to top on route change component
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

// Dummy text for legal pages
const demoPrivacy = `<h2>Privacy Policy</h2><p>Your privacy is important to us. It is Orena Solution's policy to respect your privacy regarding any information we may collect from you across our website.</p>...`;
const demoTerms = `<h2>Terms & Conditions</h2><p>By accessing the website at Orena Solution, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>...`;
const demoDisclaimer = `<h2>Disclaimer</h2><p>The materials on Orena Solution's website are provided on an 'as is' basis. We make no warranties, expressed or implied...</p>...`;

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/services/:id" element={<ServiceDetailPage />} />
                        <Route path="/experts" element={<ExpertsPage />} />
                        <Route path="/courses" element={<CoursesPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/about" element={<AboutPage />} />

                        <Route path="/campus-drive" element={<CampusDrivePage />} />

                        {/* New Dedicated About Sub-category Pages */}
                        <Route path="/about/team" element={<TeamPage />} />
                        <Route path="/about/events" element={<EventsPage />} />
                        <Route path="/about/domains" element={<AboutDomainsPage />} />
                        <Route path="/about/experience" element={<AboutExperiencePage />} />
                        <Route path="/about/clients" element={<AboutClientsPage />} />

                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/admission" element={<AdmissionPage />} />
                        <Route path="/privacy" element={<LegalPage title="Privacy Policy" content={demoPrivacy} />} />
                        <Route path="/terms" element={<LegalPage title="Terms & Conditions" content={demoTerms} />} />
                        <Route path="/disclaimer" element={<LegalPage title="Disclaimer" content={demoDisclaimer} />} />
                        
                        {/* New functionalities routes */}
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/careers" element={<CareersPage />} />
                        <Route path="/careers/:id/apply" element={<ApplyJobPage />} />
                    </Routes>
                </main>
                <Footer />
                <AutoLeadPopup />
                <Toaster 
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: '#0F1410',
                            color: '#fff',
                            border: '1px solid rgba(46, 204, 113, 0.2)',
                            borderRadius: '16px',
                            padding: '16px 24px',
                            fontWeight: '700',
                            letterSpacing: '0.5px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(46, 204, 113, 0.05)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#2ECC71',
                                secondary: '#0a0e0b',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#EF4444',
                                secondary: '#0a0e0b',
                            },
                        }
                    }}
                />
            </div>
        </Router>
    )
}

export default App

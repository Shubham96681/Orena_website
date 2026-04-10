import React, { useState, useEffect } from 'react';
import LeadFormModal from './LeadFormModal';
import { useLocation } from 'react-router-dom';

export default function AutoLeadPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Only run after full initial mount
        const timer = setTimeout(() => {
            const lastShown = localStorage.getItem('orena_popup_last_shown');
            const now = new Date().getTime();

            // 24 hours = 86400000 ms
            const oneDay = 86400000;

            if (!lastShown || (now - parseInt(lastShown)) > oneDay) {
                setIsOpen(true);
            }
        }, 5000); // Wait 5 seconds before showing to not overwhelm the user

        return () => clearTimeout(timer);
    }, [location.pathname]); // Re-evaluate on page change (though timer logic prevents spamming)

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('orena_popup_last_shown', new Date().getTime().toString());
    };

    return (
        <LeadFormModal
            isOpen={isOpen}
            onClose={handleClose}
            courseName="General Admissions & Career Advisory"
            type="Priority Consultation"
        />
    );
}

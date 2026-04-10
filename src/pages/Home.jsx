import React from 'react'
import Hero from '../components/Hero'
import HomeClients from '../components/HomeClients'
import Services from '../components/Services'
import AboutOreNa from '../components/AboutOreNa'
import HomeCourses from '../components/HomeCourses'
import HomeExperts from '../components/HomeExperts'
import Stats from '../components/Stats'
import CampusDrive from '../components/CampusDrive'
import HomeDomains from '../components/HomeDomains'

export default function Home() {
    return (
        <>
            <Hero />
            <HomeClients />
            <Services />
            <AboutOreNa />
            <HomeCourses />
            <HomeExperts />
            <Stats />
            <HomeDomains />
            <CampusDrive />
        </>
    )
}

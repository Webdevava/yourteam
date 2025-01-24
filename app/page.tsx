'use client'

import React from 'react'
import Navbar from '@/components/landing/sections/navbar'
import Hero from "@/components/landing/sections/hero";
import Features from '@/components/landing/sections/features'
import Testimonials from "@/components/landing/sections/testimonials";
import Courses from '@/components/landing/sections/courses'
import CTA from "@/components/landing/sections/cta";
import Footer from "@/components/landing/sections/footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials/>
      <Courses />

      <CTA />
      <Footer/>
    </div>
  )
}

export default LandingPage

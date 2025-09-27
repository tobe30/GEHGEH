import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Testimonials from '../components/Testimonial'
import BookingCTA from '../components/Bookingcta'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <About/>
        <Services/>
        <Testimonials/>
        <BookingCTA/>
        <Footer/>
    </div>
  )
}

export default Home
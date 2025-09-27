import React from 'react'
import Booking from '../components/Booking'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Faq from '../components/Faq'

const BookingPage = () => {
  return (
    <div>
        <Navbar/>
        <Booking/>
        <Faq/>
        <Footer/>
    </div>
  )
}

export default BookingPage
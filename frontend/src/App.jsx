import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookingPage from './pages/BookingPage'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import AddAppointments from './pages/AddAppointments'
import Bookings from './pages/Bookings'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import useAuthUser from './hooks/useAuthUser'
import Loading from './components/Loading'
import  { Toaster } from 'react-hot-toast'
import PaymentSuccess from './components/PaymentSuccess'
import VideoCall from './components/VideoCall'
import ProtectedRoute from './pages/ProtectedRoute'
import BookingDetailsPage from './pages/BookingDetailsPage'
import MyBookings from './pages/MyBookings'

const App = () => {

  const {authUser, isLoading, isAdmin} = useAuthUser();


  return (
    <div>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/book" element={<BookingPage />} />
  <Route path="/payment-success" element={<PaymentSuccess />} />
  <Route path="/video-call/:bookingId" element={<VideoCall />} />
  <Route path="/booking-details/:bookingId" element={<BookingDetailsPage />} />
  <Route path="/my-booking" element={<MyBookings />} />

  {/* Auth routes */}
  <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
  <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/dashboard" replace />} />

  {/* Protected admin routes */}
  <Route element={<ProtectedRoute requireAdmin={true} />}>
    <Route path="/dashboard" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="add-appointments" element={<AddAppointments />} />
      <Route path="bookings" element={<Bookings />} />
    </Route>
  </Route>
</Routes>

      <Toaster/>
    </div>
  )
}

export default App




// my own admin will have to login and go to the dashboard user can't normally go to homepage

  //     <Routes>
  //         <Route path='/' element={<Home/>}/>
  //         <Route path='/book' element={<BookingPage/>}/>
  //         <Route path="/payment-success" element={<PaymentSuccess />} />
  //         <Route path="/video-call/:callId" element={<VideoCall />} />
  //         <Route path="/booking-details/:bookingId" element={<BookingDetails />} />
  //         <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/dashboar"/>}/>
  //         <Route path='/register' element={!authUser ? <Register/> : <Navigate to="/dashboard"/>}/>
  //         <Route path='/dashboard' element={    isLoading ? (
  //     <div className="flex h-screen items-center justify-center">
  //       <Loading/>
  //     </div>
  //   ) : isAdmin ? (
  //     <Layout />
  //   ) : (
  //     <Navigate to="/login" />
  //   )}>
  //           <Route path='' element={<Dashboard />} />
  // <Route path='add-appointments' element={<AddAppointments />} />
  // <Route path='bookings' element={<Bookings />} />


          
  //         </Route>
  //     </Routes>
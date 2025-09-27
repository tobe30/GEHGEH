import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getUserBookings } from '../lib/api';
import Loading from './Loading';
import { Link }  from "react-router-dom"

const UserBooking = () => {

      const { data: bookings, isLoading } = useQuery({
        queryKey: ["bookings"],
        queryFn: getUserBookings,
      });


       if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Bookings</h2>

      <div className="grid gap-6 w-full max-w-4xl">
        {bookings.map((b) => (
          <Link
            key={b._id}
            to={`/booking-details/${b._id}`}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Booking ID: <span className="text-blue-500">{b._id}</span>
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  b.paymentStatus === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {b.paymentStatus.toUpperCase()}
              </span>
            </div>

            <div className="mt-4 text-gray-600 space-y-1">
              <p>
                <strong>Slot:</strong>{' '}
                {b.slot}
              </p>
              <p>
                <strong>Created At:</strong>{' '}
                {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default UserBooking
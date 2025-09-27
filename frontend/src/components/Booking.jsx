import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuthUser from "../hooks/useAuthUser";
import { getAppointments, bookAppointment } from "../lib/api"; // make sure you have this API call
import { toast } from "react-hot-toast";

const Booking = () => {
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const { data: availableSlots } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const slotsByDate = (availableSlots || []).reduce((acc, slot) => {
    const dateKey = slot.date.split("T")[0]; // Keep only YYYY-MM-DD
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push({ time: slot.time, _id: slot._id });
    return acc;
  }, {});

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isDateAvailable = (date) =>
    Object.keys(slotsByDate).some(
      (d) => new Date(d).toDateString() === date.toDateString()
    );

  const { mutate:bookingMutation, isPending} = useMutation({
    mutationFn: bookAppointment,
    onSuccess: (data) => {
      // Redirect to Paystack payment page
      window.location.href = data.paymentUrl;
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Booking failed");
    },
  });

  const handleBooking = () => {
    if (!authUser) {
      toast.error("You must be logged in to book");
      return;
    }
    if (!selectedDate || !selectedTime || !selectedSlotId) {
      toast.error("Please select a date and time slot");
      return;
    }

    // Call backend to create booking & initialize payment
    bookingMutation({ slotId: selectedSlotId });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Booking Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Book Your Appointment
          </h1>

          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setSelectedTime("");
              setSelectedSlotId(null);
            }}
            filterDate={isDateAvailable}
            placeholderText="📅 Select a date"
            className="border rounded-lg p-2 w-full mb-4"
          />

          {selectedDate && (
            <div className="flex flex-wrap gap-3 justify-center">
              {slotsByDate[formatDate(selectedDate)]?.map((slot) => (
                <button
                  key={slot._id}
                  onClick={() => {
                    setSelectedTime(slot.time);
                    setSelectedSlotId(slot._id);
                  }}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedTime === slot.time
                      ? "bg-primary text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {slot.time}
                </button>
              )) || <p className="text-red-500">No slots available this day</p>}
            </div>
          )}

          <button
            onClick={handleBooking}
            className="mt-6 w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:scale-105 transition"
          >
           
            {isPending ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Processing...
            </>
          ) : (
            " Proceed to Payment"
          )}
          </button>

          {/* How It Works */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3 text-center">How it works</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Pick a date</li>
              <li>✅ Select a time slot</li>
              <li>✅ Pay ₦200k to confirm your consultation</li>
            </ul>
          </div>
        </div>

        {/* GehGeh Image */}
        <div className="hidden md:block">
          <img
            src="gehgeh.jpeg"
            alt="GehGeh Consulting"
            className="rounded-2xl shadow-lg object-cover w-full h-[450px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "./Loading";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { data: booking, isLoading, error } = useQuery({
  queryKey: ["booking", bookingId],
  queryFn: async () => {
     try {
        const res = await axiosInstance.get(`/booking/join/${bookingId}`);
        return res.data;
      } catch (err) {
        // Handle 404 or 403 explicitly
         if (err.response?.data?.message) {
        return { error: err.response.data.message };
      }
        throw err;
      }
  },
});


  if (isLoading) return <Loading/>;
  if (error) return <p className="text-red-600">Error loading booking</p>

  if (error || booking?.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <p className="text-red-500 text-lg">
            {booking?.error || "Error loading booking"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  
const canJoin = booking?.success;

  const handleJoinCall = async () => {
    try {
      const { data } = await axiosInstance.get(`/booking/join/${bookingId}`);
      if (data.success) {
        navigate(`/video-call/${data.callId}`, {
          state: { token: data.token, userId: data.userId },
        });
      } else {
        toast.error(data.message || "Cannot join call yet");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error joining call");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          {new Date(booking.slot.date).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })}{" "} at {booking.slot.time}
        </h1>
        <p className="mb-6 text-gray-600">
          Payment status: {booking.paymentStatus.toUpperCase()}
        </p>
        {canJoin ? (
          <button
            onClick={handleJoinCall}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-900 transition"
          >
            Join Call
          </button>
        ) : (
          <p className="text-gray-500">
            You can join this call only when the appointment time has started.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;

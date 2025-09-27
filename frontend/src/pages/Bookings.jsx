import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { XCircle, Video } from "lucide-react";
import { getBooking, deleteBooking } from "../lib/api";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // fetch bookings
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBooking,
  });

  // delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      toast.success("Booking deleted successfully");
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to delete booking"),
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleJoinCall = async (bookingId) => {
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
      toast.error(err.response?.data?.message || "Error joining call");
    }
  };

  if (isLoading) return <p className="p-6 text-center">Loading bookings...</p>;

  return (
    <div className="h-full p-6">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Appointment Date</th>
              <th className="p-3">Appointment Time</th>
              <th className="p-3">Payment Ref</th>
              <th className="p-3">Client</th>
              <th className="p-3">Payment Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b border-gray-500/20">
                {/* Appointment Date */}
                <td className="p-3">
                  {booking.slot?.date
                    ? new Date(booking.slot.date).toLocaleDateString()
                    : "N/A"}
                </td>

                {/* Appointment Time */}
                <td className="p-3">{booking.slot?.time || "N/A"}</td>

                {/* Payment Reference */}
                <td className="p-3">{booking.paymentReference}</td>

                {/* Client */}
                <td className="p-3">{booking.user?.username || "Unknown"}</td>

                {/* Payment Status */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.paymentStatus === "paid"
                        ? "bg-indigo-100 text-indigo-700"
                        : booking.paymentStatus === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 flex gap-2">
                  {booking.paymentStatus === "paid" ? (
                    <>
                      <button
                        onClick={() => handleJoinCall(booking._id)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-primary text-white rounded hover:bg-blue-700"
                      >
                        <Video className="w-8" /> Join Call
                      </button>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <XCircle className="w-4" /> Delete
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm italic">
                      No actions
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;

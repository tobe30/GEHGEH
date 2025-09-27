import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addAppointment, deleteAppointments, getAppointments } from "../lib/api"; // add getAppointments API
import { toast } from "react-hot-toast";

const AddAppointments = () => {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  // convert 24h time to 12h format with AM/PM
  const convertToAMPM = (time24) => {
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // convert 0 -> 12
    return `${hour}:${minute} ${ampm}`;
  };

  const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


  // fetch existing slots from backend
  const { data: slots, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  // mutation to add a new slot
  const { mutate: addApp, isPending } = useMutation({
    mutationFn: addAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setSelectedDate(null);
      setSelectedTime("");
      toast.success("Appointment slot added successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to add slot");
    },
  });

  const handleAddAppointment = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select date and time");
      return;
    }

    const timeAMPM = convertToAMPM(selectedTime);
    const dateStr = formatDate(selectedDate);

    // check for duplicates locally before sending
    if (slots.some((slot) => slot.date === dateStr && slot.time === timeAMPM)) {
    toast.error("Slot already exists");
    return;
  }

    // call backend with AM/PM time
    addApp({
      date: dateStr,  // "YYYY-MM-DD"
      time: timeAMPM, // "HH:MM AM/PM"
    });
  };

  //delete appointment
const deleteMutation = useMutation({
  mutationFn: deleteAppointments,
  onSuccess: (_, id) => {
    queryClient.setQueryData(["appointments"], (old) =>
      old.filter((slot) => slot._id !== id)
    );
    toast.success("Slot deleted successfully");
  },
  onError: (err) => toast.error(err.response?.data?.message || "Failed to delete slot"),
});

const handleRemoveSlot = (id) => {
  if (!id) return toast.error("Invalid appointment ID");
  deleteMutation.mutate(id);
};

// Format ISO date + AM/PM time
const formatSlotDisplay = (isoDate, time) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day} ${time}`; // "YYYY-MM-DD 12:30 PM"
};


  return (
    <div className="h-full p-6 flex flex-col items-center justify-start">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Appointment Slot</h1>

        {/* Date Picker */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedTime("");
          }}
          placeholderText="📅 Select a date"
          className="border rounded-lg p-3 w-full mb-4"
        />

        {/* Time Input */}
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="border rounded-lg p-3 w-full mb-4"
        />

        {/* Save Button */}
        <button
          onClick={handleAddAppointment}
          className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:scale-105 transition"
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Saving...
            </>
          ) : (
            "Save Slot"
          )}
        </button>

        {/* Slots List */}
        {isLoading ? (
          <p className="mt-6 text-center">Loading slots...</p>
        ) : slots.length > 0 ? (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Created Slots</h2>
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => (
                <div
                  key={slot._id}
                  className="flex items-center gap-2 bg-indigo-100 text-primary px-3 py-1 rounded-full"
                >
                  <span>{formatSlotDisplay(slot.date, slot.time)}</span>
                  <button
                    onClick={() => handleRemoveSlot(slot._id)}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddAppointments;

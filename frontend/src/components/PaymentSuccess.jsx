import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");
  const navigate = useNavigate(); // <-- needed for navigation

  useEffect(() => {
    const reference = searchParams.get("reference");
    if (!reference) {
      setStatus("No payment reference found");
      return;
    }

    const verifyPayment = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/booking/verify?reference=${reference}`
        );

        if (data.success) {
          setStatus("✅ Payment successful! Booking confirmed.");
          toast.success("Payment successful!");
        } else {
          setStatus("❌ Payment failed. Please try again.");
          toast.error("Payment failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("Error verifying payment.");
        toast.error("Error verifying payment");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (  // <-- added return here
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">{status}</h1>
        <p className="mb-6 text-gray-600">
          {status.includes("successful")
            ? "Thank you for your payment! You can now access your booking details."
            : "You can try again or go back to your dashboard."}
        </p>
        <button
          onClick={() => navigate("/dashboard")} // change to "/" for home
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

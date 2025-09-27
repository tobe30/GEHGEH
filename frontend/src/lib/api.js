import { axiosInstance } from "./axios";


export const signup = async (registerData)=> {
    const response = await axiosInstance.post("/auth/register", registerData);
    return response.data;
};

export const login = async (loginData)=> {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
};

export const logout = async ()=> {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
};

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
    } catch (error) {
        console.log("Error in getAuthUser", error);
        return null
    }
};

export const addAppointment = async ({ date, time})=> {
    const response = await axiosInstance.post("/appointment/create-appointment", {date, time})
    return response.data;
}

export async function getAppointments() {
  const response = await axiosInstance.get("/appointment/");
  return response.data;
}

export const deleteAppointments = async (id) => {
  const response = await axiosInstance.delete(`/appointment/${id}`);
  return response.data;
}

export async function getBooking() {
  const response = await axiosInstance.get("/booking/");
  return response.data;
}


export const deleteBooking = async (id) => {
  const res = await axiosInstance.delete(`/booking/${id}`);
  return res.data;
};

export async function bookAppointment({slotId}) {
  const response = await axiosInstance.post("/booking/create-booking", {slotId});
  return response.data;
}

// src/api/index.js (where your other APIs are)

export const joinCall = async (bookingId) => {
  const res = await axiosInstance.get(`/booking/join/${bookingId}`);
  return res.data;
};

export const getUserBookings = async () => {
  const res = await axiosInstance.get("/booking/user-bookings");
  return res.data;
}

export const getDashboardStats = async () => {
  const res = await axiosInstance.get("/booking/dashboard-stats");
  return res.data;
}
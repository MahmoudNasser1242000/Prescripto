import React from "react";
import AppointmnetCard from "../../Components/AppointmentCard/AppointmnetCard";

const MyAppointments = () => {
  return <div className="max-w-[1280px] mx-auto px-8 sm:px-12">
    <h2 className="mt-12 mb-8 text-2xl text-center sm:text-start font-bold">My Appointments</h2>
    <AppointmnetCard/>
    <AppointmnetCard/>
    <AppointmnetCard/>
  </div>;
};

export default MyAppointments;

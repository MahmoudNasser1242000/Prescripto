import React from "react";
import Header from "../../Components/Header/Header";
import DoctorsSection from "../../Components/DoctorsSection/DoctorsSection";
import SpecialitySection from "../../Components/SpecialitySection/SpecialitySection";
import AppointmentSection from "../../Components/AppointmentSection/AppointmentSection";

const Home = () => {
  return <>
    <Header/>
    <SpecialitySection/>
    <DoctorsSection/>
    <AppointmentSection/>
  </>;
};

export default Home;

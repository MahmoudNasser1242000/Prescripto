import React from "react";
import Header from "../../Components/Header/Header";
import DoctorsSection from "../../Components/DoctorsSection/DoctorsSection";
import SpecialitySection from "../../Components/SpecialitySection/SpecialitySection";
import AppointmentSection from "../../Components/AppointmentSection/AppointmentSection";

const Home = () => {
  return <>
    <div className="max-w-[1280px] mx-auto px-8 sm:px-12">
      <Header/>
      <SpecialitySection/>
      <DoctorsSection/>
      <AppointmentSection/>
    </div>
  </>;
};

export default Home;

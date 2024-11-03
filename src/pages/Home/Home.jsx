import React from "react";
import Header from "../../Components/Header/Header";
import DoctorsSection from "../../Components/DoctorsSection/DoctorsSection";
import SpecialitySection from "../../Components/SpecialitySection/SpecialitySection";

const Home = () => {
  return <>
    <Header/>
    <SpecialitySection/>
    <DoctorsSection/>
  </>;
};

export default Home;

import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { specialityData } from "../../assets/assets_frontend/assets";
import SpecialityCrad from "../SpecialityCrad/SpecialityCrad";

const SpecialitySection = () => {
    return <div className="mt-28">
        <SectionTitle title={"Find By Speciality"} description={"Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free"} />
        <div className="flex justify-evenly items-center flex-wrap mt-8 sm:w-[70%] mx-auto">
            {
                specialityData.map((spec, index) => <SpecialityCrad key={index} spec={spec} />)
            }
        </div>
    </div>;
};

export default SpecialitySection;

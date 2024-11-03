import React from "react";
import SpecialityMenu from "../../Components/SpecialityMenu/SpecialityMenu";
import { doctors } from "../../assets/assets_frontend/assets";
import DoctorCard from "../../Components/DoctorCard/DoctorCard";
import { useParams } from "react-router-dom";

const Doctors = () => {
  const {speciality} = useParams();
  return <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-x-0 sm:gap-x-4 gap-y-5 sm:gap-y-0 max-w-[1280px] mx-auto px-2 xl:px-0">
    <SpecialityMenu param={speciality}/>
    <div className="flex flex-wrap justify-evenly lg:justify-start gap-x-[3px] gap-y-4 md:col-span-3 mt-8 md:mt-0">
      {!speciality && doctors?.map((doc) => <div className="mx-1 w-full sm:w-auto"><DoctorCard key={doc._id} doctor={doc} /></div>)}
      {speciality && doctors?.filter((doc) => doc.speciality === speciality).map((doc) => <div className="mx-1 w-full sm:w-auto"><DoctorCard key={doc._id} doctor={doc} /></div>)}
    </div>
  </div>;
};

export default Doctors;

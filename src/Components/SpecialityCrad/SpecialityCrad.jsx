import React from "react";
import { Link } from "react-router-dom";

const SpecialityCrad = ({ spec }) => {
    return <div className="w-fit hover:translate-y-[-5px] duration-[0.5s] my-2">
        <Link to={`/doctors/${spec.speciality}`}>
            <img src={spec.image} className="rounded-full w-24 h-24 mx-auto" alt={`${spec.speciality} Image`} />
            <p className="text-[16px] text-gray-700">{spec.speciality}</p>
        </Link>
    </div>;
};

export default SpecialityCrad;

import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
    return <>
        <article className="overflow-hidden w-full sm:w-auto rounded-lg border-2 border-gray-100 bg-white hover:translate-y-[-5px] hover:shadow-lg duration-[0.5s]">
            <img
                alt={`doctor ${doctor.name}`}
                src={doctor.image}
                className="h-56 w-full object-contain sm:object-cover bg-blue-50"
            />

            <div className="p-4 sm:p-6">
                <p className="line-clamp-3 text-sm/relaxed text-green-600 flex items-center">
                    <span className="inline-block bg-green-600 w-[6px] h-[6px] rounded-full mx-1"></span>
                    <span>Available</span>
                </p>

                <Link to={`/doctors/${doctor._id}`} className="mt-2">
                    <h3 className="text-start text-lg font-medium text-gray-900">
                        {doctor.name}
                    </h3>
                </Link>

                <p className="text-start mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {doctor.speciality}
                </p>

                <Link to={`/doctors/${doctor._id}`} className="group mt-4 w-full inline-flex items-center justify-start gap-1 text-sm font-medium text-blue-600">
                    Find out more

                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                        &rarr;
                    </span>
                </Link>
            </div>
        </article>
    </>;
};

export default DoctorCard;

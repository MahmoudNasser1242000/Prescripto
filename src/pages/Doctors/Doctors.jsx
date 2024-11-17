import React, { useEffect } from "react";
import SpecialityMenu from "../../Components/SpecialityMenu/SpecialityMenu";
import DoctorCard from "../../Components/DoctorCard/DoctorCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../Redux/reducers/doctors.reducer";
import toast from "react-hot-toast";
import DoctorCardSkeleton from "../../Components/DoctorCardSkeleton/DoctorCardSkeleton";

const Doctors = () => {
  const { speciality } = useParams();
  const { success, error, loading, doctors } = useSelector(
    (state) => state.doctor
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDoctors(token));
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error, { duration: Infinity });
    }
  }, [error]);
  return (
    <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-x-0 sm:gap-x-4 gap-y-5 sm:gap-y-0 max-w-[1280px] mx-auto px-2 xl:px-0">
      <SpecialityMenu speciality={speciality} doctors={doctors} />
      <div className="flex flex-wrap justify-evenly lg:justify-start gap-y-4 md:col-span-3 mt-8 md:mt-0">
        {loading ? (
          Array.from({ length: 8 }, (_, index) => (
            <DoctorCardSkeleton key={index} />
          ))
        ) : !success ? (
          <h1 className="text-3xl text-center w-full">
            No Doctors Wright Now!
          </h1>
        ) : (
          !speciality &&
          doctors?.map((doc) => (
            <div className="mx-1 w-full sm:w-auto">
              <DoctorCard key={doc._id} doctor={doc} />
            </div>
          ))
        )}

        {loading ? (
          Array.from({ length: 8 }, (_, index) => (
            <DoctorCardSkeleton key={index} />
          ))
        ) : !success ? (
          <h1 className="text-3xl text-center w-full">
            No Doctors Wright Now!
          </h1>
        ) : (
          speciality &&
          doctors
            ?.filter((doc) => doc.speciality === speciality)
            .map((doc) => (
              <div className="mx-1 w-full sm:w-auto">
                <DoctorCard key={doc._id} doctor={doc} />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Doctors;

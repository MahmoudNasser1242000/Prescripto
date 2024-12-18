import React, { useEffect, useState } from "react";
import SpecialityMenu from "../../Components/SpecialityMenu/SpecialityMenu";
import DoctorCard from "../../Components/DoctorCard/DoctorCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../Redux/reducers/doctors.reducer";
import DoctorCardSkeleton from "../../Components/DoctorCardSkeleton/DoctorCardSkeleton";
import { Pagination, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const Doctors = () => {
  const [page, setPage] = useState("");
  const [keyword, setKeyword] = useState("");
  
  const { speciality } = useParams();
  const { loading, doctors, metaData } = useSelector(
    (state) => state.doctor
  );
  const { token } = useSelector((state) => state.auth);
  const { role } = jwtDecode(token);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDoctors({ token, keyword, page }));    
  }, [dispatch, page, keyword]);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error, { duration: Infinity });
  //   }
  // }, [error]);
  
  const changePage = (e, value) => {    
    setPage(value)
    scrollTo(0, 0)
  }
  return (
    <>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-x-0 sm:gap-x-4 gap-y-5 sm:gap-y-0 max-w-[1280px] mx-auto px-2 xl:px-0">
        <SpecialityMenu speciality={speciality} doctors={doctors} />
        <div className="md:col-span-3 mt-8 md:mt-0">
          <div className="mb-12 flex justify-end">
            <TextField label="Search" className="w-[40%]" variant="filled" onChange={(e) => setKeyword(e.target.value)} />
          </div>
          <div className="flex flex-wrap justify-evenly lg:justify-start gap-y-4">
            {loading ? (
              Array.from({ length: 8 }, (_, index) => (
                <DoctorCardSkeleton key={index} />
              ))
            ) : !doctors.length ? (
              <h1 className="text-3xl text-center w-full">
                No Doctors Wright Now!
              </h1>
            ) : (
              !speciality &&
              doctors?.map((doc) => (
                <div className="mx-1 w-full sm:w-auto" key={doc._id}>
                  <DoctorCard key={doc._id} doctor={doc} role={role} />
                </div>
              ))
            )}
            
            {loading ? (
              Array.from({ length: 8 }, (_, index) => (
                <DoctorCardSkeleton key={index} />
              ))
            ) : !doctors.length ? (
              <h1 className="text-3xl text-center w-full">
                No Doctors Wright Now!
              </h1>
            ) : (
              speciality &&
              doctors
                ?.filter((doc) => doc.speciality === speciality)
                .map((doc) => (
                  <div className="mx-1 w-full sm:w-auto" key={doc._id}>
                    <DoctorCard key={doc._id} doctor={doc} role={role} />
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-20 flex justify-center w-full">
        <Pagination page={page} count={metaData?.totalPages} onChange={changePage} color="primary" />
      </div>
    </>
  );
};

export default Doctors;

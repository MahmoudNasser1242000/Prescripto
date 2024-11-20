import React, { useEffect, useState } from "react";
import DoctorInfo from "../../Components/DoctorInfo/DoctorInfo";
import AppointmentsDates from "../../Components/AppointmentsDates/AppointmentsDates";
import RelatedDoctorsSection from "../../Components/RelatedDoctorsSection/RelatedDoctorsSection";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneDoctor } from "../../Redux/reducers/doctors.reducer";
import toast from "react-hot-toast";
import DoctorInfoSkeleton from "../../Components/DoctorInfoSkeleton/DoctorInfoSkeleton";
import AppoinmentsTime from "../../Components/AppoinmentsTime/AppoinmentsTime";
import { addAppointment, updateAppointment } from "../../Redux/reducers/appointments.reducer";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "flowbite-react";

const Appointment = () => {
  const { docId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();  

  const [getDate, setGetDate] = useState("");
  const [getTime, setGetTime] = useState("");

  const getDateFunc = (date) => {
    setGetDate(date);
  };
  const getTimeFunc = (time) => {
    setGetTime(time);
  };

  // ==================get days==================
  const getWeekdaysFromToday = () => {
    const weekdays = [];
    const today = new Date();
    let currentDay = new Date(today);

    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    while (weekdays.length < 7) {
      const dayOfWeek = currentDay.getDay();

      if (dayOfWeek >= 0 && dayOfWeek <= 7) {
        const dayName = weekdayNames[dayOfWeek];
        const dayNumber = currentDay.getDate();

        weekdays.push({ dayName, dayNumber, fullDate: new Date(currentDay) });
      }

      currentDay.setDate(currentDay.getDate() + 1);
    }

    return weekdays;
  };
  const weekdaysFromToday = getWeekdaysFromToday();

  // ==================get hours==================
  //   const addThirtyMinutesSevenTimes = (startHour)=> {
  //     const intervals = [];
  //     const startTime = new Date();
  //     startTime.setHours(startHour, 0, 0, 0);

  //     for (let i = 0; i < 7; i++) {
  //         const hours = startTime.getHours().toString().padStart(2, '0');
  //         const minutes = startTime.getMinutes().toString().padStart(2, '0');
  //         intervals.push(`${hours}:${minutes}`);

  //         startTime.setMinutes(startTime.getMinutes() + 30);
  //     }

  //     return intervals;
  // }
  // const timeIntervals = addThirtyMinutesSevenTimes(2);

  const { success, error, loading, doctor } = useSelector(
    (state) => state.doctor
  );

  const {
    loading: appointmentLoading,
    success: appointmentSuccess
  } = useSelector((state) => state.appointment);

  const { token } = useSelector((state) => state.auth);
  const logged = jwtDecode(token);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneDoctor({ token, docId }));
  }, [dispatch, docId]);
  useEffect(() => {
    if (error) {
      toast.error(error, { duration: Infinity });
    }
  }, []);

  function convertTo24HourFormat(timeString) {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return [hours, minutes, 0, 0];
  }

  const getFulllDateWithTime = () => {
    const [hours, minutes] = convertTo24HourFormat(getTime);
    const specialDate = new Date(getDate);
    specialDate.setHours(hours, minutes, 0, 0);

    return specialDate;
  };

  const addUserAppointment = () => {
    if (!getDate || !getTime) return toast.error("You must enter a valid Date");
    const fullDate = getFulllDateWithTime();

    dispatch(addAppointment({ token, appointment: { date: fullDate, user: logged.userId, doctor: docId } }))
  }

  const updateUserAppointment = (id) => {
    if (!getDate || !getTime) return toast.error("You must enter a valid Date");
    const fullDate = getFulllDateWithTime();

    dispatch(updateAppointment({token, appointment: { date: fullDate }, id: searchParams.get("updateAppointment")}));
    if (appointmentSuccess) {
      navigate("/my-appointments")
    }
  }
  return (
    <div className="max-w-[1280px] mx-auto px-8 sm:px-12">
      {loading ? (
        <DoctorInfoSkeleton />
      ) : !success ? (
        <h1 className="text-3xl text-center w-full">No Doctors Wright Now!</h1>
      ) : (
        <DoctorInfo doctor={doctor} />
      )}

      <div className="flex justify-end">
        <div className="flex flex-col items-start mt-12 w-full lg:w-[66%]">
          <h3 className="text-[23px] text-center w-full lg:text-start pl-0 lg:pl-2">
            Booking slote
          </h3>

          <div className="flex flex-col justify-center items-center lg:items-start gap-y-5 flex-wrap mt-6 w-full">
            <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
              {weekdaysFromToday.map((day, index) => (
                <AppointmentsDates
                  key={day.dayNumber}
                  dayName={day.dayName}
                  dayNumber={day.dayNumber}
                  fullDate={day.fullDate}
                  index={index}
                  chooseDay={index === 0 ? "chooseDay" : ""}
                  getDateFunc={getDateFunc}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
              {loading
                ? Array.from({ length: 5 }, (_, index) => (
                  <p
                    key={index}
                    className="cursor-pointer whitespace-nowrap px-2 mt-3 rounded-full border border-gray-300 bg-gray-200 animate-pulse py-0.5 w-20 h-6"
                  ></p>
                ))
                : doctor?.examination_dates.map((date) => (
                  <AppoinmentsTime
                    key={date.time}
                    date={date}
                    getTimeFunc={getTimeFunc}
                  />
                ))}
            </div>
            {
              searchParams.get("updateAppointment") ? (
                <button
                  className={`inline-block disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:hover:text-white mt-8 rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600`}
                  disabled={loading || error ? true : false}
                  onClick={() => {updateUserAppointment()}}
                >
                  {appointmentLoading ? <Spinner color="info" aria-label="Default status example" /> : "Update Appointment"}
                </button>
              ) :
                (
                  <button
                    className={`inline-block disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary disabled:hover:text-white mt-8 rounded border border-primary bg-primary px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-primary`}
                    disabled={loading || error ? true : false}
                    onClick={() => addUserAppointment()}
                  >
                    {appointmentLoading ? <Spinner color="info" aria-label="Default status example" /> : "Book Here"}
                  </button>
                )
            }
          </div>
        </div>
      </div>

      <RelatedDoctorsSection
        doctor={doctor}
        doctorLoading={loading}
        doctorSuccess={success}
      />
    </div>
  );
};

export default Appointment;

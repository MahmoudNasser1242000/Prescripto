import React from "react";
import DoctorInfo from "../../Components/DoctorInfo/DoctorInfo";
import AppointmentsDates from "../../Components/AppointmentsDates/AppointmentsDates";
import RelatedDoctorsSection from "../../Components/RelatedDoctorsSection/RelatedDoctorsSection";
import { useParams } from "react-router-dom";

const Appointment = () => {
  const {docId} = useParams()
  // ==================get days==================
  const getWeekdaysFromToday = () => {
    const weekdays = [];
    const today = new Date();
    let currentDay = new Date(today);

    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
  }
  const weekdaysFromToday = getWeekdaysFromToday();
  console.log(weekdaysFromToday);
  

  // ==================get hours==================
  const addThirtyMinutesSevenTimes = (startHour)=> {
    const intervals = [];
    const startTime = new Date();
    startTime.setHours(startHour, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
        const hours = startTime.getHours().toString().padStart(2, '0');
        const minutes = startTime.getMinutes().toString().padStart(2, '0');
        intervals.push(`${hours}:${minutes}`);

        startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return intervals;
}
const timeIntervals = addThirtyMinutesSevenTimes(2);

  return <div className="max-w-[1280px] mx-auto px-8 sm:px-12">
    <DoctorInfo />
    <div className="flex justify-end">
      <div className="flex flex-col items-end mt-12 w-full lg:w-[66%]">
      <h3 className="text-[23px] text-center w-full lg:text-start pl-0 lg:pl-2">Booking slote</h3>
      <div className="flex items-center justify-center lg:justify-start gap-y-5 flex-wrap mt-6 w-full">
        {weekdaysFromToday.map((day, index) => <AppointmentsDates key={index} dayName={day.dayName} dayNumber={day.dayNumber} fullDate={day.fullDate} timeIntervals={timeIntervals} index={index} chooseDay={index === 0? "chooseDay": ""}/>)}
      </div>
      </div>
    </div>
    <RelatedDoctorsSection docId={docId}/>
  </div>;
};

export default Appointment;

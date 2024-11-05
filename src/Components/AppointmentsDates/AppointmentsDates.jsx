import React, { useRef } from "react";

const AppointmentsDates = ({dayName, dayNumber, index, timeIntervals, chooseDay}) => {
  const parentRef = useRef("");
  const chooseDayFunc = () => {
    Array.from(parentRef.current.parentNode.children).forEach((child) => { 
      if (child.children[0].classList.contains("chooseDay")) {
        child.children[0].classList.remove("chooseDay")
      }
    })
    parentRef.current.children[0].classList.add("chooseDay")
  }

  const chooseTimeFunc = () => {
    Array.from(parentRef.current.parentNode.children).forEach((child) => { 
      if (child.children[1].classList.contains("chooseTime")) {
        child.children[1].classList.remove("chooseTime")
      }
    })
    parentRef.current.children[1].classList.add("chooseTime")
  }
  return <>
      <div className="mx-5 md:mx-0 md:me-5" ref={parentRef}>
        <div onClick={() => chooseDayFunc()} className={`${chooseDay} w-16 h-[100px] border border-gray-500 rounded-t-full rounded-b-full text-xl flex flex-col justify-center items-center`}>
          <spanl className="block">{dayName.slice(0, 3)}</spanl>
          <spanl className="block">{dayNumber}</spanl>
        </div>
        <p onClick={() => chooseTimeFunc()} className={`whitespace-nowrap mt-3 rounded-full border border-gray-500 text-md text-gray-500 py-0.5`}>
          {timeIntervals[index]}
        </p>
    </div>
  </>;
};

export default AppointmentsDates;

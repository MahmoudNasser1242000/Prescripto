import React, { useEffect, useRef } from "react";

const AppointmentsDates = ({ dayName, dayNumber, fullDate, chooseDay, getDateFunc, index }) => {
  const parentRef = useRef("");
  const chooseDayFunc = () => {
    Array.from(parentRef.current.parentNode.children).forEach((child) => {      
      if (child.children[0].classList.contains("chooseDay")) {
        child.children[0].classList.remove("chooseDay")
      }
    })
    parentRef.current.children[0].classList.add("chooseDay");
    getDateFunc(parentRef.current.getAttribute("fulldate"))
  }

  useEffect(() => {
    if (index === 0) {
      getDateFunc(parentRef.current.getAttribute("fulldate"))
    }
  }, []);
  
  return <>
    <div ref={parentRef} fulldate={fullDate}>
      <div onClick={() => chooseDayFunc()} className={`${chooseDay} cursor-pointer w-16 h-[100px] border border-gray-500 rounded-t-full rounded-b-full text-xl flex flex-col justify-center items-center`}>
        <span className="block">{dayName.slice(0, 3)}</span>
        <span className="block">{dayNumber < 10 ? `0${dayNumber}` : dayNumber}</span>
      </div>
    </div>
  </>;
};

export default AppointmentsDates;

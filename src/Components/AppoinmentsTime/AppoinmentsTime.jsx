import React, { useRef } from "react";

const AppoinmentsTime = ({date, getTimeFunc}) => {
    const parentTimeRef = useRef("");
    const chooseTimeFunc = () => {
        Array.from(parentTimeRef.current.parentNode.children)?.forEach((child) => {
            if (child.children[0].classList.contains("chooseTime")) {
                child.children[0].classList.remove("chooseTime");
            }
        });
        parentTimeRef.current.children[0].classList.add("chooseTime");
        getTimeFunc(parentTimeRef.current.children[0].innerText)
    };
    return <>
        <div ref={parentTimeRef}>
            <p
                onClick={() => chooseTimeFunc()}
                className={`cursor-pointer whitespace-nowrap px-2 mt-3 rounded-full border border-gray-500 text-md text-gray-500 py-0.5`}
            >
                {date.time} {date.modifier}
            </p>
        </div>
    </>;
};

export default AppoinmentsTime;

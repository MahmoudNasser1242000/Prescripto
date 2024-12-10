import React, { useEffect, useRef, useState } from "react";
import AppointmentsModal from "../AppointmentsModal/AppointmentsModal";
import { useSelector } from "react-redux";

const AppoinmentsTime = ({ date, getTimeFunc, role, docId, token }) => {
    const [appointmentModal, setAppointmentModal] = useState(false);

    const parentTimeRef = useRef("");
    const chooseTimeFunc = () => {
        Array.from(parentTimeRef.current.parentNode.children)?.forEach((child) => {
            if (child.children[0].classList.contains("chooseTime")) {
                child.children[0].classList.remove("chooseTime");
            }
        });
        parentTimeRef.current.children[0].classList.add("chooseTime");
        if (role === "manager" || role === "super-manager") {
            setAppointmentModal(true)
        } else if (role === "user") {
            getTimeFunc(parentTimeRef.current.children[0].innerText)
        } else {
            return;
        }
    };

    const {success} = useSelector((state) => state.examination_date)
    useEffect(() => {
        if (success === "Date removed successfully") {
            setAppointmentModal(false)
        }
    }, [success]);
    return <>
        <div ref={parentTimeRef}>
            <p
                onClick={() => chooseTimeFunc()}
                className={`cursor-pointer whitespace-nowrap px-2 mt-3 rounded-full border border-gray-500 text-md text-gray-500 py-0.5`}
            >
                {date.time} {date.modifier}
            </p>
        </div>
        {
            ((role === "manager" || role === "super-manager") && appointmentModal) && (
                <AppointmentsModal openModal={appointmentModal} setOpenModal={setAppointmentModal} docId={docId} date={date} token={token} />
            )
        }
    </>;
};

export default AppoinmentsTime;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer.jsx";
import doctoeReducer from "./reducers/doctors.reducer.jsx";
import appointmentReducer from "./reducers/appointments.reducer.jsx";
import myProfileReducer from "./reducers/myProfile.reducer.jsx";

const store = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctoeReducer,
        appointment: appointmentReducer,
        myProfile: myProfileReducer,
    }
})

export default store
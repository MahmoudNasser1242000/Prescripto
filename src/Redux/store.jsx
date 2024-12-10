import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer.jsx";
import doctoeReducer from "./reducers/doctors.reducer.jsx";
import appointmentReducer from "./reducers/appointments.reducer.jsx";
import myProfileReducer from "./reducers/myProfile.reducer.jsx";
import userReducer from "./reducers/users.reducer.jsx";
import examination_dateReducer from "./reducers/examination_dates.reducer.jsx";

const store = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctoeReducer,
        appointment: appointmentReducer,
        myProfile: myProfileReducer,
        user: userReducer,
        examination_date: examination_dateReducer
    }
})

export default store
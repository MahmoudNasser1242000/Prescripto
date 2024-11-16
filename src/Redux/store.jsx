import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer.jsx";
import doctoeReducer from "./reducers/doctors.reducer.jsx";

const store = configureStore({
    reducer: {
        auth: authReducer,
        doctor: doctoeReducer
    }
})

export default store
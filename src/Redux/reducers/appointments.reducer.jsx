import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    error: null,
    loading: false,
    success: null,
    appointment: null
}

export const addAppointment = createAsyncThunk("appointment/addAppointment", async ({token, appointment}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.post(`appointments`, appointment, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    extraReducers: (builder) => {
        //add appointments
        builder.addCase(addAppointment.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(addAppointment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.appointment = action.payload.appointment
            toast.success(`${state.success} with date => ${state.appointment.date}`);
        })
        builder.addCase(addAppointment.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            state.appointment = null
            toast.error(`${state.error}`);
        })
    }
});

export default appointmentSlice.reducer;

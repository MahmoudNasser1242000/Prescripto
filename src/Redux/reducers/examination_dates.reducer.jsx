import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { editDoctor } from "./doctors.reducer";
import { useDispatch } from "react-redux";

const initialState = {
    error: null,
    loading: false,
    success: null,
}

export const deleteExamination_date = createAsyncThunk("examination_date/deleteExamination_date", async ({token, docId, timeId}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.delete(`examinationDates/${docId}/${timeId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        
        thunkAPI.dispatch(editDoctor(data.doctor))
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

const appointmentSlice = createSlice({
    name: "examination_date",
    initialState,
    extraReducers: (builder) => {
        //add appointments
        builder.addCase(deleteExamination_date.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(deleteExamination_date.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            toast.success(`${state.success}`);
        })
        builder.addCase(deleteExamination_date.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })
    }
});

export default appointmentSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
    error: null,
    loading: false,
    success: null,
    doctors: []
}

export const getAllDoctors = createAsyncThunk("doctors", async (token, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.get(`doctors`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    extraReducers: (builder) => { 
        //get all doctors
        builder.addCase(getAllDoctors.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(getAllDoctors.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.doctors = action.payload.doctors
        })
        builder.addCase(getAllDoctors.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            state.doctors = []
        })
    }
});

export default doctorSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
    error: null,
    loading: false,
    success: null,
    doctors: [],
    doctor: null
}

export const getAllDoctors = createAsyncThunk("doctor/getAllDoctors", async ({token, name=''}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.get(`doctors?name=${name}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const getOneDoctor = createAsyncThunk("doctor/getOneDoctor", async ({token, docId}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.get(`doctors/${docId}`, {
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

        //get all doctors
        builder.addCase(getOneDoctor.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(getOneDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.doctor = action.payload.doctor
        })
        builder.addCase(getOneDoctor.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            state.doctor = null
        })
    }
});

export default doctorSlice.reducer;

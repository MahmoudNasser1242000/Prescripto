import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

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

export const addDoctor = createAsyncThunk("doctor/addDoctor", async ({token, doctor}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.post(`doctors`, doctor, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const deleteDoctor = createAsyncThunk("doctor/deleteDoctor", async ({token, docId}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.delete(`doctors/${docId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const updateteDoctor = createAsyncThunk("doctor/updateteDoctor", async ({token, docId, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.patch(`doctors/${docId}`, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const updatetDoctorDates = createAsyncThunk("doctor/updatetDoctorDates", async ({token, docId, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.patch(`doctors/updateDates/${docId}`, body, {
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
    reducers: {
        editDoctor: (state, action) => {
            state.doctor = action.payload
        }
    },
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

        //get one doctors
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

        //add doctors
        builder.addCase(addDoctor.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(addDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.doctors = state.doctors.push(action.payload.doctor)
            toast.success(state.success)
        })
        builder.addCase(addDoctor.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(state.error)
        })

        //delete doctors
        builder.addCase(deleteDoctor.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(deleteDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            toast.success(state.success)
        })
        builder.addCase(deleteDoctor.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(state.error)
        })

        //update doctor
        builder.addCase(updateteDoctor.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(updateteDoctor.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.doctor = action.payload.doctor
            toast.success(state.success)
        })
        builder.addCase(updateteDoctor.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(state.error)
        })

        //update doctor dates
        builder.addCase(updatetDoctorDates .pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(updatetDoctorDates .fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.doctor = action.payload.doctor
            toast.success(state.success)
        })
        builder.addCase(updatetDoctorDates .rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(state.error)
        })
    }
});

export default doctorSlice.reducer;
export const { editDoctor } = doctorSlice.actions;

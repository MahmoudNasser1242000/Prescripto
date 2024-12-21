import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    error: null,
    loading: false,
    success: null,
    appointment: null,
    appointments: [],
    metaData: {}
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

export const getAppointments = createAsyncThunk("appointment/getAppointments", async ({token, keyword, page}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    let query;
    if (keyword) {
        query = `?keyword=${keyword}`
    } else if (page) {
        query = `?page=${page}`
    } else {
        query = ""
    }
    try {
        const {data} = await axiosInstance.get(`appointments${query}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })    
        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const deleteAppointment = createAsyncThunk("appointment/deleteAppointment", async ({token, id}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.delete(`appointments/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }) 
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const updateAppointment = createAsyncThunk("appointment/updateAppointment", async ({token, appointment, id}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.patch(`appointments/${id}`, appointment, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }) 
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const getDoctorAppointments = createAsyncThunk("appointment/getDoctorAppointments", async ({token, docId, keyword, page}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    let query;
    if (keyword) {
        query = `?keyword=${keyword}`
    } else if (page) {
        query = `?page=${page}`
    } else {
        query = ""
    }
    try {
        const {data} = await axiosInstance.get(`doctors/${docId}/appointments${query}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }) 
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const getUserAppointments = createAsyncThunk("appointment/getUserAppointments", async ({token, userId, keyword, page}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI

    let query;
    if (keyword) {
        query = `?keyword=${keyword}`
    } else if (page) {
        query = `?page=${page}`
    } else {
        query = ""
    }
    try {
        const {data} = await axiosInstance.get(`users/${userId}/appointments${query}`, {
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

        //get appointments
        builder.addCase(getAppointments.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(getAppointments.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.appointments = [...action.payload.appointments]
            state.metaData = {...action.payload.metadata}        
        })
        builder.addCase(getAppointments.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            state.appointments = []
            toast.error(`${state.error}`, {duration: Infinity});
        })

        //delete appointments
        builder.addCase(deleteAppointment.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(deleteAppointment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.appointments = state.appointments.filter((app) => app._id !== action.payload.appointment._id)
            toast.success(`${state.success}`);
        })
        builder.addCase(deleteAppointment.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })

        //update appointments
        builder.addCase(updateAppointment.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(updateAppointment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.appointments = state.appointments.map((app) => app._id == action.payload.appointment._id? action.payload.appointment : app)
            toast.success(`${state.success}`);
        })
        builder.addCase(updateAppointment.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })

        //get doctor appointments
        builder.addCase(getDoctorAppointments.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(getDoctorAppointments.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.appointments = [...action.payload.appointments]
            state.metaData = {...action.payload.metadata}
        })
        builder.addCase(getDoctorAppointments.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })

        //get user appointments
        builder.addCase(getUserAppointments.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(getUserAppointments.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.appointments = [...action.payload.appointments]
            state.metaData = {...action.payload.metadata}
        })
        builder.addCase(getUserAppointments.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })
    }
});

export default appointmentSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    error: null,
    loading: false,
    success: null,
    myProfile: null
}

export const getMyProfile = createAsyncThunk("myProfile/getMyProfile", async (token, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.get(`myProfile`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const updateUserProfile = createAsyncThunk("myProfile/updateUserProfile", async ({token, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.patch(`myProfile/updateUserProfile`, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})
export const updateDoctorProfile = createAsyncThunk("myProfile/updateDoctorProfile", async ({token, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.patch(`myProfile/updateDoctorProfile`, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})
export const updateManagerProfile = createAsyncThunk("myProfile/updateManagerProfile", async ({token, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.patch(`myProfile/updateManagerProfile`, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const deleteProfile = createAsyncThunk("myProfile/deleteProfile", async (token, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.delete(`myProfile`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const changeUserPassword = createAsyncThunk("myProfile/changeUserPassword", async ({token, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.patch(`myProfile/changeUserPassword`, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})
export const changeDoctorPassword = createAsyncThunk("myProfile/changeDoctorPassword", async ({token, body}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.patch(`myProfile/changeDoctorPassword`, body, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

const myProfileSlice = createSlice({
    name: "myProfile",
    initialState,
    extraReducers: (builder) => {
        //get my profile
        builder.addCase(getMyProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(getMyProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.myProfile = action.payload.profile
        })
        builder.addCase(getMyProfile.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            state.myProfile = null
            toast.error(`${state.error}`, { duration: Infinity });
        })

        //update user profile
        builder.addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.myProfile = action.payload.user;
            toast.success(`${state.success}`);
        })
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })
        //update doctor profile
        builder.addCase(updateDoctorProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(updateDoctorProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.myProfile = action.payload.doctor;
            toast.success(`${state.success}`);
        })
        builder.addCase(updateDoctorProfile.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })
        //update manager profile
        builder.addCase(updateManagerProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(updateManagerProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.myProfile = action.payload.manager;
            toast.success(`${state.success}`);
        })
        builder.addCase(updateManagerProfile.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })

        //delete user profile
        builder.addCase(deleteProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(deleteProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            toast.success(`${state.success}`);
        })
        builder.addCase(deleteProfile.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })

        //change user password
        builder.addCase(changeUserPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(changeUserPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.myProfile = action.payload.user;
            toast.success(`${state.success}`);
        })
        builder.addCase(changeUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })
        //change doctor password
        builder.addCase(changeDoctorPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(changeDoctorPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload.message;
            state.myProfile = action.payload.doctor;
            toast.success(`${state.success}`);
        })
        builder.addCase(changeDoctorPassword.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })
    }
});

export default myProfileSlice.reducer;

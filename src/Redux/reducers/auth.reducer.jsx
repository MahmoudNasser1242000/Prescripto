import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
    error: null,
    loading: false,
    success: null,
    token: localStorage.getItem("Token") || ""
}

export const signup = createAsyncThunk("auth/signup", async (user, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.post(`auth/signup`, user, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const signin = createAsyncThunk("auth/signin", async (user, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.post(`auth/signin`, user)        
        return data
    } catch (error) {        
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => { 
        //signup
        builder.addCase(signup.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload;
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload;
        })

        //signin
        builder.addCase(signin.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
            state.token = "";
        })
        builder.addCase(signin.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = action.payload;
            state.token = action.payload.token;

            localStorage.setItem("Token", state.token)
        })
        builder.addCase(signin.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload;
            state.token = "";
        })
    }
});

export default authSlice.reducer;

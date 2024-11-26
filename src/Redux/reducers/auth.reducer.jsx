import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

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
    reducers: {
        logout: (state) => {
            state.loading = false
            state.success = null
            state.error = false
            state.token = ""
            localStorage.removeItem("Token")
        }
    },
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
            toast.success(state.success.message);
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload;
            toast.error(state.error.message);
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
            state.success = action.payload.message;
            state.token = action.payload.token;
            toast.success(state.success);

            localStorage.setItem("Token", state.token)
        })
        builder.addCase(signin.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.error;
            state.token = "";
            toast.error(state.error);
        })
    }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;

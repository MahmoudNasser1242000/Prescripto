import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    error: null,
    loading: false,
    success: null,
    token: ""
}

export const signup = createAsyncThunk("auth/signup", async (user, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axios.post(`http://localhost:3000/api/v1/auth/signup`, user, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        console.log(data);
        
        return data
    } catch (error) {
        console.log(error);
        
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
    }
});

export default authSlice.reducer;

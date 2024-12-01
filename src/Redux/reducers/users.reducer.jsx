import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    error: null,
    loading: false,
    success: null,
    users: [],
    user: null
}

export const getOneUser = createAsyncThunk("user/getOneUser", async ({token, userId}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {
        const {data} = await axiosInstance.get(`users/${userId}`, {
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
    name: "user",
    initialState,
    extraReducers: (builder) => {
        //get one user
        builder.addCase(getOneUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        })
        builder.addCase(getOneUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.user = action.payload.user
        })
        builder.addCase(getOneUser.rejected, (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload.message;
            toast.error(`${state.error}`);
        })
    }
});

export default myProfileSlice.reducer;

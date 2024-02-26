import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("getUser", async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    try{
        const result = await response.json();
        console.log(result)
        return result
    } catch (error) {
        console.log("error", error)
        return error
    }
});

 
 const userDetail = createSlice({
    name: 'userDetail',
    initialState: {
        users : [],
        loading: false,
        error: null
    },
    
    reducers: {},
    extraReducers (builder) {
         builder
        .addCase(getUser.pending, (state) => {
            console.log({state})
            state.loading = true;
            state.error = null;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            console.log({data:action.payload});
            state.loading = false;
            state.users = action.payload;
            return state
        })
        .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default userDetail.reducer
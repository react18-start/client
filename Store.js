import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userDetail  from "../features/UserDataSlice";

export const store = configureStore({
    reducer: combineReducers({
        app: userDetail
    })
})
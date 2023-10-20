import { configureStore, createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({ 
    name: "user", 
    initialState: { user: null, preferances: [] }, 
    reducers: { setUser: (state, action) => ({...state,user:action.payload}) } 
});
export const store = configureStore({
    reducer: {
   user: userSlice.reducer,
    }
})

export interface UserSliceState{
    user: string;
}
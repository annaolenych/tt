import { createSelector } from "@reduxjs/toolkit";
import { UserSliceState, userSlice } from "./store";

export const selectUser = createSelector((state)=> state.user, (state: UserSliceState)=> state.user)
import { createSlice } from "@reduxjs/toolkit";
import { user } from "../assets/data";
import Cookies from "js-cookie";

const initialState = {
    user: JSON.parse(window?.localStorage.getItem("user")) ?? user,
    edit: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state) {
            state.user = null;
            // Cookies.remove("token", { path: "/", domain: "https://link-leap.vercel.app" });
            Cookies.remove("token")
            localStorage.removeItem("user")
        },
        updateProfile(state, action) {
            state.edit = action.payload;
        },
    },
});
export default userSlice.reducer;

export function UserLogin(user) {
    return (dispatch) => {
        dispatch(userSlice.actions.login(user));
    };
}

export function Logout() {
    return (dispatch) => {
        dispatch(userSlice.actions.logout());
    };
}

export function UpdateProfile(val) {
    return (dispatch) => {
        dispatch(userSlice.actions.updateProfile(val));
    };
}

import {createSlice} from "@reduxjs/toolkit"; 

interface IAuth {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    profile_img: string | null;
    is_verified: string;
    token: string
}

const initialState: IAuth = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    profile_img: "",
    is_verified: "",
    token: ""
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setLogin: (state, action) => {
            console.log("action", action);
            return action.payload
        },
        setLogout: (state) => {
            return initialState
        }
    }
})

export const {setLogin, setLogout} = AuthSlice.actions
export default AuthSlice.reducer
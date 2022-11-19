// import { userReducer } from "react";
import { SET_USER } from "../action/userAction";

const initialState = {
    _id:"",
    username:"",
    password:"",
    first_name:"",
    last_name:"",
    email:"",
    tel_no1:"",
    tel_no2:"",
    address:"",
    sex:"",
    birthdate:"",
    age:"",
    room_number:"",
    role:""
    };

const userReducer = (state = initialState, action) => {
    switch (action.type) { 
        case SET_USER:
            Object.assign(initialState, action.user)
            return {
                initialState
            };
        default:
            return state;

    }
}
export default userReducer;
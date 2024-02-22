import { createSlice } from "@reduxjs/toolkit";
import { initialErrorsUser, initialUserForm } from "../../../utilities/initialObjects";

export const userSlice = createSlice({
    name: 'users',
    initialState:{
        users:[],
        userSelected:initialUserForm,
        visibleFormUser:false,
        errorsUser: initialErrorsUser,
    },
    reducers:{
        addUser: (state, action) =>{
            state.users= [
                ...state.users,
                {
                    ...action.payload,
                }
            ];
            state.userSelected = initialUserForm;
            state.visibleFormUser= false;
        },
        removeUser: (state, action) =>{
            state.users=state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) =>{
            state.users =state.users.map(u => {
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                        password: u.password
                    };
                }
                return u;
            });
            state.userSelected = initialUserForm;
            state.visibleFormUser= false;
        },
        loadingUsers: (state, action) =>{
            state.users=action.payload;
        },
        onUserSelectedForm: (state, action) =>{
            state.userSelected=action.payload;
            state.visibleFormUser=true;
        },
        onOpenFormUser:(state) =>{
            state.visibleFormUser=true;
        },
        onCloseFormUser:(state) =>{
            state.visibleFormUser=false;
            state.userSelected=initialUserForm;
        },
        loadingError:(state,{payload}) =>{ //ejemplo de desestructuración, tener en cuenta
            state.errorsUser=payload;
        },          
    }
});

export const{
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
    onUserSelectedForm,
    onOpenFormUser,
    onCloseFormUser,
    loadingError,
}= userSlice.actions;
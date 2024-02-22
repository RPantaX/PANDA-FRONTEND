import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";
import { trabajadorSlice } from "./slices/trabajador/trabajadorSlice";
import { conductorSlice } from "./slices/conductor/conductorSlice";
import { carretaSlice } from "./slices/carreta/carretaSlice";
import { camionSlice } from "./slices/camion/camionesSlice";

export const store = configureStore({
    reducer:{
        users: userSlice.reducer,
        auth: authSlice.reducer,
        trabajadores: trabajadorSlice.reducer,
        conductores: conductorSlice.reducer,
        carretas: carretaSlice.reducer,
        camiones: camionSlice.reducer
    }
})
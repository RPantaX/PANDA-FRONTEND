import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";
import { trabajadorSlice } from "./slices/trabajador/trabajadorSlice";
import { conductorSlice } from "./slices/conductor/conductorSlice";
import { carretaSlice } from "./slices/carreta/carretaSlice";
import { camionSlice } from "./slices/camion/camionesSlice";
import { guiaTransportistaSlice } from "./slices/guiaTransportista/guiaTransportistaSlice";
import { facturaSlice } from "./slices/facturas/facturaSlice";

export const store = configureStore({
    reducer:{
        users: userSlice.reducer,
        auth: authSlice.reducer,
        trabajadores: trabajadorSlice.reducer,
        conductores: conductorSlice.reducer,
        carretas: carretaSlice.reducer,
        camiones: camionSlice.reducer,
        guiaTransportista: guiaTransportistaSlice.reducer,
        facturas:facturaSlice.reducer,
    }
})
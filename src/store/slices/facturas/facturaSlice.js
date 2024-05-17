import { createSlice } from "@reduxjs/toolkit";
import { globalinitialObjects, initialErrorsFactura, initialGuiaTransportistaById, initialFacturaForm } from "../../../utilities/initialObjects";

export const facturaSlice = createSlice({
    name: 'facturas',
    initialState:{
        facturas:globalinitialObjects,
        facturaSelected: initialFacturaForm,
        errorsFactura:initialErrorsFactura,
        guiaByIdFirst:initialGuiaTransportistaById,
        isLoading: true,
    },
    reducers:{
        addFactura : (state, action)=>{
            state.facturas = {
                ...state.facturas,
                contenido: [...state.facturas.contenido, action.payload]
                },
                state.facturaSelected = initialFacturaForm
        },
        removeFactura: (state, action) =>{
            state.facturas={
                ...state.facturas,
                contenido: state.facturas.contenido.filter(g => g.id !== action.payload)
            }
        },
        loadingFactura: (state, action) =>{
            state.facturas=action.payload;
            state.isLoading = false;
        },
        onFacturaSelectedForm: (state, action) =>{
            state.facturaSelected=action.payload;
        },
        loadingError:(state,{payload}) =>{ //ejemplo de desestructuración, tener en cuenta
            state.errorsFactura=payload;
        },
    }
});
export const{
    addFactura,
    removeFactura,
    loadingFactura,
    onFacturaSelectedForm,
    loadingError,
}=facturaSlice.actions
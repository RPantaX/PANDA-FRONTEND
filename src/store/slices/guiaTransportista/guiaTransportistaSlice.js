import { createSlice } from "@reduxjs/toolkit";
import { globalinitialObjects, initialErrorsGuiaTransportista, initialGuiaTransportistaById, initialGuiaTransportistaForm } from "../../../utilities/initialObjects";

export const guiaTransportistaSlice = createSlice({
    name: 'guiaTransportista',
    initialState:{
        guiaTransportista:globalinitialObjects,
        guiaTransportistaSelected: initialGuiaTransportistaForm,
        errorsGuiaTransportista:initialErrorsGuiaTransportista,
        guiaByIdFirst:initialGuiaTransportistaById
    },
    reducers:{
        addGuia : (state, action)=>{
            state.guiaTransportista = {
                ...state.guiaTransportista,
                contenido: [...state.guiaTransportista.contenido, action.payload]
                },
                state.guiaTransportistaSelected = initialGuiaTransportistaForm
        },
        removeGuia: (state, action) =>{
            state.guiaTransportista={
                ...state.guiaTransportista,
                contenido: state.guiaTransportista.contenido.filter(g => g.id !== action.payload)
            }
        },
        updateGuia: (state, action) =>{
            state.guiaTransportista ={
                ...state.guiaTransportista}
            state.guiaTransportistaSelected = initialGuiaTransportistaForm;
        },
        loadingGuia: (state, action) =>{
            state.guiaTransportista=action.payload;
        },
        onGuiaSelectedForm: (state, action) =>{
            state.guiaTransportistaSelected=action.payload;
        },
        loadingError:(state,{payload}) =>{ //ejemplo de desestructuración, tener en cuenta
            state.errorsGuiaTransportista=payload;
        },
        guiaById:(state, {payload})=>{
            state.guiaByIdFirst=payload;
        }  
    }
});
export const{
    addGuia,
    removeGuia,
    updateGuia,
    loadingGuia,
    onGuiaSelectedForm,
    loadingError,
    guiaById
}=guiaTransportistaSlice.actions
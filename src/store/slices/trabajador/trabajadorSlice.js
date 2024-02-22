import { createSlice } from "@reduxjs/toolkit";
import { globalinitialObjects, initialErrorsTrabajador, initialTrabajadorForm } from "../../../utilities/initialObjects";

export const trabajadorSlice = createSlice({
    name: 'trabajadores',
    initialState:{
        trabajadores:globalinitialObjects,
        trabajadorSelected: initialTrabajadorForm,
        errorsTrabajador:initialErrorsTrabajador,
    },
    reducers:{
        addTrabajador : (state, action)=>{
            state.trabajadores = {
                ...state.trabajadores,
                contenido: [...state.trabajadores.contenido, action.payload]
                },
                state.trabajadorSelected = initialTrabajadorForm
        },
        removeTrabajador: (state, action) =>{
            state.trabajadores={
                ...state.trabajadores,
                contenido: state.trabajadores.contenido.filter(trabajador => trabajador.id !== action.payload)
            }
        },
        updateTrabajador: (state, action) =>{
            state.trabajadores ={
                ...state.trabajadores,
                contenido: state.trabajadores.contenido.map(u => {
                    if(u.id === action.payload.id){
                        return {
                            ...action.payload
                        };
                    }
                    return u;
                })
            };
            state.trabajadorSelected = initialTrabajadorForm;
        },
        loadingTrabajadores: (state, action) =>{
            state.trabajadores=action.payload;
        },
        onTrabajadorSelectedForm: (state, action) =>{
            state.trabajadorSelected=action.payload;
        },
        loadingError:(state,{payload}) =>{ //ejemplo de desestructuración, tener en cuenta
            state.errorsTrabajador=payload;
        },  
    }
});
export const{
    addTrabajador,
    removeTrabajador,
    updateTrabajador,
    loadingTrabajadores,
    onTrabajadorSelectedForm,
    loadingError,
}=trabajadorSlice.actions
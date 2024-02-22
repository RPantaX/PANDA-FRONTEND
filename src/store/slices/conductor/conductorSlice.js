import { createSlice } from "@reduxjs/toolkit";
import { globalinitialObjects, initialConductorForm, initialErrorsConductor } from "../../../utilities/initialObjects";

export const conductorSlice = createSlice({
    name:'conductores',
    initialState:{
        conductores:globalinitialObjects,
        conductorSelected: initialConductorForm,
        visibleForm:false,
        errorsConductor:initialErrorsConductor,
    },
    reducers:{
        addConductor : (state, action)=>{
            state.conductores = {
                ...state.conductores,
                contenido: [...state.conductores.contenido, action.payload]
                };
                state.conductorSelected = initialConductorForm;
                state.visibleForm=false;
        },
        removeConductor: (state, action) =>{
            state.conductores={
                ...state.conductores,
                contenido: state.conductores.contenido.filter(u => u.id !== action.payload)
            }
        },
        updateConductor: (state, action) =>{
            state.conductores ={
                ...state.conductores,
                contenido: state.conductores.contenido.map(u => {
                    if(u.id === action.payload.id){
                        return {
                            ...action.payload
                        };
                    }
                    return u;
                })
            };
            state.conductorSelected = initialConductorForm;
            state.visibleForm=false;
        },
        loadingConductor: (state, action) =>{
            state.conductores=action.payload;
            
        },
        onConductorSelectedForm: (state, action) =>{
            state.conductorSelected=action.payload;
            state.visibleForm=true;
        },
        onOpenForm:(state) =>{
            state.visibleForm=true;
        },
        onCloseForm:(state) =>{
            state.visibleForm=false;
            state.conductorSelected=initialConductorForm;
        },
        loadingError:(state,{payload}) =>{ //ejemplo de desestructuración, tener en cuenta
            state.errorsConductor=payload;
        },
    }
})

export const{
    addConductor,
    removeConductor,
    updateConductor,
    loadingConductor,
    onConductorSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
}=conductorSlice.actions
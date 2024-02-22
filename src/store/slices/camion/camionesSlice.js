import { createSlice } from "@reduxjs/toolkit";
import { globalinitialObjects, initialCamionForm, initialErrorsCamion } from "../../../utilities/initialObjects";

export const camionSlice = createSlice({
    name:'camiones',
    initialState:{
        camiones:globalinitialObjects,
        camionSelected: initialCamionForm,
        visibleForm:false,
        errorsCamion:initialErrorsCamion,
    },
    reducers:{
        addCamion : (state, action)=>{
            state.camiones = {
                ...state.camiones,
                contenido: [...state.camiones.contenido, action.payload]
                };
                state.camionSelected = initialCamionForm;
                state.visibleForm=false;
        },
        removeCamion: (state, action) =>{
            state.camiones={
                ...state.camiones,
                contenido: state.camiones.contenido.filter(u => u.id !== action.payload)
            }
        },
        updateCamion: (state, action) =>{
            state.camiones ={
                ...state.camiones,
                contenido: state.camiones.contenido.map(u => {
                    if(u.id === action.payload.id){
                        return {
                            ...action.payload
                        };
                    }
                    return u;
                })
            };
            state.camionSelected = initialCamionForm;
            state.visibleForm=false;
        },
        loadingCamion: (state, action) =>{
            state.camiones=action.payload;
            
        },
        onCamionSelectedForm: (state, action) =>{
            state.camionSelected=action.payload;
            state.visibleForm=true;
        },
        onOpenForm:(state) =>{
            state.visibleForm=true;
        },
        onCloseForm:(state) =>{
            state.visibleForm=false;
            state.camionSelected=initialCamionForm;
        },
        loadingError:(state,{payload}) =>{ //ejemplo de desestructuración, tener en cuenta
            state.errorsCamion=payload;
        },
    }
})

export const{
    addCamion,
    removeCamion,
    updateCamion,
    loadingCamion,
    onCamionSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
}=camionSlice.actions
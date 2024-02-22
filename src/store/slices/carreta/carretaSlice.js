import { createSlice } from "@reduxjs/toolkit";
import { globalinitialObjects, initialCarretaForm, initialErrorsCarreta } from "../../../utilities/initialObjects";

export const carretaSlice = createSlice({
    name: 'carretas',
    initialState:{
        carretas:globalinitialObjects,
        carretaSelected:initialCarretaForm,
        visibleForm:false,
        errorsCarreta: initialErrorsCarreta,
    },
    reducers:{
        addCarreta: (state, action) =>{
            state.carretas= {
                ...state.carretas,
                contenido: [...state.carretas.contenido, action.payload]
                };
            state.carretaSelected = initialCarretaForm;
            state.visibleForm= false;
        },
        removeCarreta: (state, action) =>{
            state.carretas={
                ...state.carretas,
                contenido: state.carretas.contenido.filter(u => u.id !== action.payload)
            }
        },
        updateCarreta: (state, action) =>{
            state.carretas ={
                ...state.carretas,
                contenido: state.carretas.contenido.map(u => {
                    if(u.id === action.payload.id){
                        return {
                            ...action.payload
                        };
                    }
                    return u;
                })
            };
            state.carretaSelected = initialCarretaForm;
            state.visibleForm= false;
        },
        loadingCarreta: (state, action) =>{
            state.carretas=action.payload;
        },
        onCarretaSelectedForm: (state, action) =>{
            state.carretaSelected=action.payload;
            state.visibleForm=true;
        },
        onOpenForm:(state) =>{
            state.visibleForm=true;
        },
        onCloseForm:(state) =>{
            state.visibleForm=false;
            state.carretaSelected=initialCarretaForm;
        },
        loadingError:(state,{payload}) =>{ //ejemplo de desestructuración, tener en cuenta
            state.errorsCarreta=payload;
        }, 
    }
});
export const{
    addCarreta,
    removeCarreta,
    updateCarreta,
    loadingCarreta,
    onCarretaSelectedForm,
    onOpenForm,
    onCloseForm,
    loadingError,
}=carretaSlice.actions
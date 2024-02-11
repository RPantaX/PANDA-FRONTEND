
export const trabajadoresReducers = (state={}, action) => {
    switch(action.type){
        case 'addTrabajador':
            return {
                ...state,
                contenido: [...state.contenido, action.payload]
            };
        case 'removeTrabajador':
            return {
                ...state,
                contenido: state.contenido.filter(trabajador => trabajador.id !== action.payload)
            };
        
        case 'updateTrabajador':
            return {
                ...state,
                contenido: state.contenido.map(u => {
                    if(u.id === action.payload.id){
                        return {
                            ...action.payload
                        };
                    }
                    return u;
                })
            };
        case 'loadingTrabajadores':
            return action.payload;
        default:
            return state;
    }
}

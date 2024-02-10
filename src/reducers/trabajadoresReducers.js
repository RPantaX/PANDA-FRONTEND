
export const trabajadoresReducers = (state=[], action) => {
    switch(action.type){
        case 'addTrabajador':
            return [
                ...state,
                {
                  ...action.payload
                }
              ];
        case 'removeTrabajador':
            return state.filter(trabajador=> trabajador.id !== action.payload);
        
        case 'updateTrabajador':
            return state.map(u=>{
                if(u.id === action.payload.id){
                    return {
                        ...action.payload
                    };
                }
                return u;
            });
        case 'loadingTrabajadores':
            return action.payload;
        default:
            state;
    }
}

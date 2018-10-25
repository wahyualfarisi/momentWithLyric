const authDefault = {
    user: {}
}

export default (state=authDefault, action ) => {
    switch(action.type){
        
        case 'LISTEN_USER':
        return{
            user: action.payload
        }


        default: 
        return state;
    }
}
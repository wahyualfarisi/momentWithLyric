const TimelineDefault = {
    timeline: [],
    momentuser: [],
    isloading: true,
    momentloading: true
}

export default (state=TimelineDefault, action) => {
    switch(action.type){
        case 'LOAD_TIMELINE':
        return{
            ...state,
            timeline: action.timeline
        }

        case 'LOAD_MOMENT':
        return{
            ...state,
            momentuser: action.momentuser,
            momentloading: false
        }

        case 'LOAD_SUCCESS':
        return{
            ...state,
            isloading: false
        }



        default: 
        return state;
    }
}
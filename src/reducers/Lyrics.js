const TracksDefault = {
    track_list: [],
    search_list:[],
    datalyric: {},
    loadingCollection: false,
    error: false,
    isLoadingSearch: true,
    isEmptyKeyword: false
}

export default (state= TracksDefault, action ) => {
    switch(action.type){

        case 'LOAD_LYRIC_COLLECTION':
        return{
            ...state,
            track_list: action.data,
            loadingCollection: true,
            error: false
        }

        case 'LOAD_ERROR':
        return{
            ...state,
            error: true,
            track_list: action.data
        }

        case 'SEARCH_LYRIC':
        return{
            ...state,
            search_list: action.data,
            isLoadingSearch: false
        }

        case 'HANDLE_SEARCH_PROBLEM':
        return{
            ...state,
            error: true
        }

        case 'HANDLE_KEYWORD_EMPTY':
        return{
            ...state,
            isEmptyKeyword: true
        }

        case 'LOAD_LYRIC':
        return{
            ...state,
            datalyric: action.data
        }

        case 'LOAD_ERROR_LYRIC':
        return {
            ...state,
            error: action.data
        }

        default: 
        return state;
    }
}
import Axios from 'axios';

export const loadLyricCollection = () => {
    return(dispatch) => {
        Axios.get(`http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=20&country=us&f_has_lyrics=1&apikey=6f68cda7d49f1abc475ce246ebfdfcfe`)
        .then( (response) => {
            
            if(response.status === 200){
                console.log(response.data.message.body.track_list)
                dispatch({
                    type: 'LOAD_LYRIC_COLLECTION',
                    data: response.data.message.body.track_list
                })
            }else if(response.status >= 400){
                dispatch({
                    type: 'LOAD_ERROR',
                    data: 'Sorry Im Busy'
                })
            }
        }).catch( (error) => {
            dispatch({
                type: 'LOAD_TOP_TRACKS',
                data: `you get some error`
            })
        })
    }
}

export const handleSearchLyric = (keyword) => {
    return(dispatch) => {
        Axios.get(`http://api.musixmatch.com/ws/1.1/track.search?q_track=${keyword}&page_size=45&page=1&s_track_rating=desc&apikey=6f68cda7d49f1abc475ce246ebfdfcfe`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_LYRIC',
                    data: res.data.message.body.track_list
                })
            })
            .catch(err => {
                dispatch({
                    type: 'HANDLE_SEARCH_PROBLEM',
                    data: 'Lyric not found'
                })
            })
      }
}

export const handleKeywordEmpty = () => {
    return{
        type: 'HANDLE_KEYWORD_EMPTY'
    }    
}

export const handleLoadLyric = (id) => {
    console.log(id)
    return (dispatch) => {
        Axios.get(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=6f68cda7d49f1abc475ce246ebfdfcfe`)
        .then(res => {
            dispatch({
                type: 'LOAD_LYRIC',
                data: res.data.message.body.lyrics
            })
        })
        .catch(error => {
            dispatch({
                type: 'LOAD_ERROR_LYRIC', 
                data: 'get error guys'
            })
        })
    }
}
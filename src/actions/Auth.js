export const listenuser = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'LISTEN_USER',
            payload: data
        })
    }
}
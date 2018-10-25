import database  from '../firebase/fire';

export const loadTimeline = () => {
    return (dispatch) => {
        database.ref('lyric_users_share').orderByChild('createAt').on('value', (snapshot) => {
            const timeline = []
            snapshot.forEach((childSnapshot) => {
                timeline.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch({
                type: 'LOAD_TIMELINE',
                timeline: timeline
            })
        })
    }
}

export const listenMomentUser = (emailToken) => {
    return (dispatch) => {
        database.ref('lyric_users_share').orderByChild('email').equalTo(emailToken).on('value', (snapshot) => {
            dispatch({
                type: 'LISTEN_MOMENT',
                momentuser: snapshot.val()
            })
            console.log('ini snapshot', snapshot.val())
        })
    }
}

export const loadingSuccess = () => {
    return{
        type: 'LOAD_SUCCESS'
    }
}
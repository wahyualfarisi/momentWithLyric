import { combineReducers } from 'redux';
import Auth from './Auth';
import Lyrics from './Lyrics';
import Timeline from './Timeline';

const rootReducers = combineReducers({
    auth: Auth,
    lyric: Lyrics,
    timeline: Timeline
})

export default rootReducers;
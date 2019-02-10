import { combineReducers } from 'redux';
import messages  from './message';
import users from './User';
// import { lensesReducer } from 'redux-lenses-streaming';
// import { sessionReducer } from './sessionReducer';

const chat = combineReducers({
    messages,
    users/* ,
    session: sessionReducer,
    lenses: lensesReducer */
})

export default chat;
import { combineReducers } from 'redux-immutable';
import { mainReducer, dictReducer, roleReducer } from './redux';

const rootReducer = combineReducers({ main: mainReducer, dict: dictReducer, role: roleReducer });

export default rootReducer;

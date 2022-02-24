import { combineReducers } from 'redux-immutable';
import { mainReducer, dictReducer, roleReducer, menuReducer } from './redux';

const rootReducer = combineReducers({ main: mainReducer, dict: dictReducer, role: roleReducer, menu: menuReducer });

export default rootReducer;

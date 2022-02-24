import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { menuListApi } from '../menu/api';

const defaultState = fromJS({
  menuList: {},
  fetch: false,
  msg: '',
  err: '',
});

const prefix = 'SYS';
const MENU_LIST = `${prefix}_MENU`;

const sysAction = {};

const sysReducer = createReducer({

}, defaultState);

const select = (state) => state.get('sys');
const sysSelect = {};

export { sysAction, sysReducer, sysSelect };

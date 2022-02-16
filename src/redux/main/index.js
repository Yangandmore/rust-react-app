import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

const defaultState = fromJS({
  pageHeight: 0,
});

const prefix = 'MAIN';
const PAGE_HEIGHT = `${prefix}_PAGE_HEIGHT`;

const mainAction = {};
mainAction.actionPageHeight = createAction(PAGE_HEIGHT, 'pageHeight');

const mainReducer = createReducer(
  {
    [PAGE_HEIGHT](state, action) {
      return state.merge(fromJS({
        pageHeight: action.pageHeight
      }));
    }
  },
  defaultState,
);

const select = (state) => state.get('main');
const mainSelect = {};
mainSelect.pageHeight = createSelector(select, (state) => state.get('pageHeight'));

export { mainAction, mainReducer, mainSelect };

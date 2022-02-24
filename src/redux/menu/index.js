import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { menuListApi, menuAddApi, menuUpdateApi, menuDeleteApi } from './api';

const defaultState = fromJS({
  menuList: {},
  fetch: false,
  msg: '',
  err: '',
});

const prefix = 'MENU';
const MENU_LIST = `${prefix}_LIST`;
const MENU_ADD = `${prefix}_ADD`;
const MENU_UPDATE = `${prefix}_UPDATE`;
const MENU_DELETE = `${prefix}_DELETE`;

const menuAction = {};
menuAction.actionList = createActionAsync(MENU_LIST, menuListApi);
menuAction.actionAdd = createActionAsync(MENU_ADD, menuAddApi);
menuAction.actionUpdate = createActionAsync(MENU_UPDATE, menuUpdateApi);
menuAction.actionDelete = createActionAsync(MENU_DELETE, menuDeleteApi);

const menuReducer = createReducer({
  [MENU_LIST](state, action) {
    return {
      REQUEST() {
        return state.merge(fromJS({
          menuList: {}
        }));
      },
      SUCCESS() {
        return state.merge(fromJS({
          menuList: action.res.body.data
        }));
      },
      FAILURE() {
        return state.merge(fromJS({
          menuList: {}
        }));
      }
    };
  },
  [MENU_ADD](state, action) {
    return {
      REQUEST() {
        return state.merge(fromJS({
          fetch: true,
          msg: '',
          err: '',
        }));
      },
      SUCCESS() {
        return state.merge(fromJS({
          fetch: false,
          msg: action.res.body.msg
        }));
      },
      FAILURE() {
        return state.merge(fromJS({
          fetch: false,
          err: action.err.body.msg
        }));
      }
    };
  },
  [MENU_UPDATE](state, action) {
    return {
      REQUEST() {
        return state.merge(fromJS({
          fetch: true,
          msg: '',
          err: '',
        }));
      },
      SUCCESS() {
        return state.merge(fromJS({
          fetch: false,
          msg: action.res.body.msg
        }));
      },
      FAILURE() {
        return state.merge(fromJS({
          fetch: false,
          err: action.err.body.msg
        }));
      }
    };
  },
  [MENU_DELETE](state, action) {
    return {
      REQUEST() {
        return state.merge(fromJS({
          fetch: true,
          msg: '',
          err: '',
        }));
      },
      SUCCESS() {
        return state.merge(fromJS({
          fetch: false,
          msg: action.res.body.msg
        }));
      },
      FAILURE() {
        return state.merge(fromJS({
          fetch: false,
          err: action.err.body.msg
        }));
      }
    };
  }
}, defaultState);

const select = (state) => state.get('menu');
const menuSelect = {};
menuSelect.listSelect = createSelector(select, (state) => state.get('menuList').toJS()
);
menuSelect.menuFetch = createSelector(select, (state) => state.get('fetch')
);
menuSelect.menuMsg = createSelector(select, (state) => state.get('msg')
);
menuSelect.menuErr = createSelector(select, (state) => state.get('err')
);

export { menuAction, menuReducer, menuSelect };

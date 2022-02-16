import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { roleListApi, roleAddApi, roleUpdateApi, roleDeleteApi } from './api';

const defaultState = fromJS({
  roleList: {},
  fetch: false,
  msg: '',
  err: '',
});

const prefix = 'ROLE';
const ROLE_LIST = `${prefix}_LIST`;
const ROLE_ADD = `${prefix}_ADD`;
const ROLE_UPDATE = `${prefix}_UPDATE`;
const ROLE_DELETE = `${prefix}_DELETE`;

const roleAction = {};
roleAction.actionList = createActionAsync(ROLE_LIST, roleListApi);
roleAction.actionAdd = createActionAsync(ROLE_ADD, roleAddApi);
roleAction.actionUpdate = createActionAsync(ROLE_UPDATE, roleUpdateApi);
roleAction.actionDelete = createActionAsync(ROLE_DELETE, roleDeleteApi);

const roleReducer = createReducer({
  [ROLE_LIST](state, action) {
    return {
      REQUEST() {
        return state.merge(fromJS({
          roleList: {}
        }));
      },
      SUCCESS() {
        return state.merge(fromJS({
          roleList: action.res.body.data
        }));
      },
      FAILURE() {
        return state.merge(fromJS({
          roleList: {}
        }));
      }
    };
  },
  [ROLE_ADD](state, action) {
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
  [ROLE_UPDATE](state, action) {
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
  [ROLE_DELETE](state, action) {
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

const select = (state) => state.get('role');
const roleSelect = {};
roleSelect.listSelect = createSelector(select, (state) => state.get('roleList').toJS()
);
roleSelect.roleFetch = createSelector(select, (state) => state.get('fetch')
);
roleSelect.roleMsg = createSelector(select, (state) => state.get('msg')
);
roleSelect.roleErr = createSelector(select, (state) => state.get('err')
);

export { roleAction, roleReducer, roleSelect };

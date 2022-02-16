import {
  createAction,
  createActionAsync,
  createReducer,
} from 'redux-act-reducer';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { dictListApi, dictAddApi, dictUpdateApi, dictDeleteApi } from './api';

const defaultState = fromJS({
  dictList: {},
  fetch: false,
  msg: '',
  err: '',
});

const prefix = 'DICT';
const DICT_LIST = `${prefix}_LIST`;
const DICT_ADD = `${prefix}_ADD`;
const DICT_UPDATE = `${prefix}_UPDATE`;
const DICT_DELETE = `${prefix}_DELETE`;

const dictAction = {};
dictAction.actionList = createActionAsync(DICT_LIST, dictListApi);
dictAction.actionAdd = createActionAsync(DICT_ADD, dictAddApi);
dictAction.actionUpdate = createActionAsync(DICT_UPDATE, dictUpdateApi);
dictAction.actionDelete = createActionAsync(DICT_DELETE, dictDeleteApi);

const dictReducer = createReducer({
  [DICT_LIST](state, action) {
    return {
      REQUEST() {
        return state.merge(fromJS({
          dictList: {}
        }));
      },
      SUCCESS() {
        return state.merge(fromJS({
          dictList: action.res.body.data
        }));
      },
      FAILURE() {
        return state.merge(fromJS({
          dictList: {}
        }));
      }
    };
  },
  [DICT_ADD](state, action) {
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
  [DICT_UPDATE](state, action) {
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
  [DICT_DELETE](state, action) {
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

const select = (state) => state.get('dict');
const dictSelect = {};
dictSelect.listSelect = createSelector(select, (state) => state.get('dictList').toJS()
);
dictSelect.dictFetch = createSelector(select, (state) => state.get('fetch')
);
dictSelect.dictMsg = createSelector(select, (state) => state.get('msg')
);
dictSelect.dictErr = createSelector(select, (state) => state.get('err')
);

export { dictAction, dictReducer, dictSelect };

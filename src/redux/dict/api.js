import { request } from '../../utils';

const dictListApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/dict/list',
        method: 'POST',
        type: 'json',
        body: param
      },
      dispatch,
      getState
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

const dictAddApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/dict/add',
        method: 'POST',
        type: 'json',
        body: param
      },
      dispatch,
      getState
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

const dictUpdateApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/dict/update',
        method: 'POST',
        type: 'json',
        body: param
      },
      dispatch,
      getState
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

const dictDeleteApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/dict/delete',
        method: 'POST',
        type: 'json',
        body: param
      },
      dispatch,
      getState
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { dictListApi, dictAddApi, dictUpdateApi, dictDeleteApi };

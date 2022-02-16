import { request } from '../../utils';

const roleListApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/role/list',
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

const roleAddApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/role/add',
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

const roleUpdateApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/role/update',
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

const roleDeleteApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/role/delete',
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
export { roleListApi, roleAddApi, roleUpdateApi, roleDeleteApi };

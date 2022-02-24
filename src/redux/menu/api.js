import { request } from '../../utils';

const menuListApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/menu/list',
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

const menuAddApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/menu/add',
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

const menuUpdateApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/menu/update',
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

const menuDeleteApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/menu/delete',
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
export { menuListApi, menuAddApi, menuUpdateApi, menuDeleteApi };

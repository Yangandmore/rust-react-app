import { request } from '../../utils';

const testApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          Host: '*'
        },
        endpoint: '/query?type=yuantong&postid=11111111111',
        method: 'GET',
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

const loginApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/login'
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { testApi };

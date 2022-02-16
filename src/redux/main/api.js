import { request } from '../../utils';

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

export { loginApi };

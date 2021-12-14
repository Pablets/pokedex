import React from 'react';

const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';

const reducer = (state, { type, payload }) => {
  if (type === 'loading') return { status: 'loading' };
  if (type === 'finished') return { status: 'finished', data: payload };
  if (type === 'error') return { status: 'error', error: payload };
  return state;
};

const initState = {
  status: 'idle',
};

const useAsyncHook = () => {
  const [state, dispatch] = React.useReducer(reducer, initState);

  const asyncDispatch = React.useCallback(
    async ({ type = 'all', url = pokeApiURL, limit = 5, offset = 0 } = {}) => {
      try {
        dispatch({ type: 'loading' });

        let response;
        switch (type) {
          case 'all':
            response = await fetch(`${url}?limit=${limit}&offset=${offset}`);
            break;
          default:
            response = await fetch(`${url}`);
            break;
        }

        let json = await response.json();
        dispatch({ type: 'finished', payload: json });
      } catch (error) {
        dispatch({ type: 'error', payload: '**** ERROR ****' });
      }
    },
    []
  );

  return { state, dispatch: asyncDispatch };
};

export default useAsyncHook;

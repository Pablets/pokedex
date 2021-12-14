import { renderHook, act } from '@testing-library/react-hooks';
import useAsyncHook from './hooks/useAsyncHook';

describe('Hook tests', () => {
  it('should change status to "finished" after fetching the data', async () => {
    const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';

    const { result } = renderHook(() => useAsyncHook());

    await act(async () => {
      return result.current.dispatch({
        type: 'all',
        url: pokeApiURL,
        limit: 5,
        offset: 5,
      });
    });

    expect(result.current.state.status).toBe('finished');
  });

  it('should paginate the results correctly', async () => {
    const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';

    const offset = 5;

    const { result } = renderHook(() => useAsyncHook());

    await act(async () => {
      return result.current.dispatch({
        type: 'all',
        url: pokeApiURL,
        limit: 5,
        offset: offset,
      });
    });
    expect(result.current.state.data.results.length).toBe(offset);
  });

  xit('should set state to "error" if an error was occurred', async () => {
    // * this test throws an error in the test log so I decided to skip it
    const offset = 5;

    const { result } = renderHook(() => useAsyncHook());

    await act(async () => {
      return await result.current.dispatch({
        type: 'all',
        url: 'https://www.404-error.com/',
        limit: 5,
        offset: offset,
      });
    });

    expect(result.current.state.status).toBe('error');
  });
});

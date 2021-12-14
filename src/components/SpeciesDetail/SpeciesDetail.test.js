import React from 'react';
import { cleanup, render } from '@testing-library/react';
import response from './response.json';
import SpeciesDetail from './SpeciesDetail';

describe('SpeciesDetail', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const successResult = response;
  const liftData = 'liftData executed';
  const getSuccess = jest.fn(() => Promise.resolve(successResult));
  const callLiftData = jest.fn(() => Promise.resolve(liftData));

  it('should display the string returned from the get function', async () => {
    const { queryByRole } = render(
      <SpeciesDetail ability={getSuccess} liftState={callLiftData} />
    );

    const imgBeforeFetch = queryByRole('img', {
      name: /pokemon img/i,
    });
    const headingBeforeFetch = queryByRole('heading', {
      name: /pokémon semilla/i,
    });

    expect(imgBeforeFetch).toBeNull();
    expect(headingBeforeFetch).toBeNull();

    const imgAfterFetch = queryByRole('img', {
      name: /pokemon img/i,
    });

    const headingAfterFetch = queryByRole('heading', {
      name: /pokémon semilla/i,
    });

    expect(imgAfterFetch).toBeDefined();
    expect(headingAfterFetch).toBeDefined();
  });
});

import React from 'react';
import { cleanup, render } from '@testing-library/react';
import AbilityDetail from './AbilityDetail';
import response from './response.json';
describe('AbilityDetail', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const successResult = response;
  const liftData = 'liftData executed';
  const getSuccess = jest.fn(() => Promise.resolve(successResult));
  const callLiftData = jest.fn(() => Promise.resolve(liftData));

  it('should display the string returned from the get function', async () => {
    const { queryByText } = render(
      <AbilityDetail ability={getSuccess} liftState={callLiftData} />
    );

    const abilityBeforeFetch = queryByText(
      /espesura: potencia los ataques de tipo planta en un apuro\./i
    );

    expect(abilityBeforeFetch).toBeNull();

    const abilityAfterFetch = queryByText(
      /espesura: potencia los ataques de tipo planta en un apuro\./i
    );
    expect(abilityAfterFetch).toBeDefined();
    expect(callLiftData).toHaveBeenCalled();
  });

  it('should have called lifData callback', () => {
    render(<AbilityDetail ability={getSuccess} liftState={callLiftData} />);

    expect(callLiftData).toHaveBeenCalled();
  });
});

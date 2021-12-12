import React from 'react';

const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';

const useAsyncHook = ({
  userInput = 'all',
  url = pokeApiURL,
  limit = 5,
  offset = 0,
} = {}) => {
  const [result, setResult] = React.useState([]);
  const [status, setStatus] = React.useState('idle');

  React.useEffect(() => {
    async function fetchData(input, dataUrl, fetchLimit, fetchOffset) {
      try {
        let json;
        setStatus('loading');
        let response;
        if (input === 'all') {
          response = await fetch(
            `${dataUrl}?limit=${fetchLimit}&offset=${fetchOffset}`
          );
          json = await response.json();
        } else if (input === 'card') {
          response = await fetch(`${dataUrl}`);
          json = await response.json();
        } else if (input === 'card-details') {
          response = await fetch(`${dataUrl}`);
          json = await response.json();
          // console.log('card-details', json);
        } else {
          response = await fetch(`${dataUrl}${input}`);
        }

        setResult(json);
        setStatus('loaded');
      } catch (error) {
        setStatus('error');
      }
    }

    if (userInput !== '') {
      fetchData(userInput, url, limit, offset);
    }
  }, [userInput, url, limit, offset]);

  return [result, status];
};

export default useAsyncHook;

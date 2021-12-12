import React from 'react';
import useAsyncHook from '../hooks/useAsyncHook';
import Button from './Button';
import Cards from './Cards';
import GridLoader from './GridLoader';

const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';

const Pokedex = () => {
  const [query, setQuery] = React.useState('');
  const [pagination, setPagination] = React.useState(0);
  const [result, status] = useAsyncHook(query);

  const handlePagination = (direction) => {
    if (direction === 'next') {
      setPagination((prev) => prev + 1);
    } else {
      setPagination((prev) => prev - 1);
    }
  };

  React.useEffect(() => {
    setQuery({
      type: 'all',
      url: pokeApiURL,
      limit: 5,
      offset: 5 * pagination,
    });

  }, [pagination, result]);

  if (status === 'loading') return <GridLoader />;
  if (status === 'error') return <div>An error has ocurred</div>;
  if (status === 'loaded')
    return (
      <>
        <h1 className="main-title">Pokedex Challenge!</h1>
        <div className="container">
          {pagination > 0 && (
            <Button handlePagination={handlePagination} direction="prev" />
          )}
          <Button handlePagination={handlePagination} direction="next" />
          {result.results.map((results, index) => (
            <Cards data={results} key={index} />
          ))}
        </div>
        <p>Página {pagination + 1}</p>
      </>
    );
  return null;
};

export default Pokedex;

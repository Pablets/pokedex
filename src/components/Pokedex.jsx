import React from 'react';
import useAsyncHook from '../hooks/useAsyncHook';
import Button from './Button';
import Cards from './Cards';
import GridLoader from './GridLoader';

export const LanguageContext = React.createContext();

const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';

const Pokedex = () => {
  const [query, setQuery] = React.useState('');
  const [pagination, setPagination] = React.useState(0);
  const [result, status] = useAsyncHook(query);
  const [language, setLanguage] = React.useState('es');

  const handlePagination = (direction) => {
    if (direction === 'next') {
      setPagination((prev) => prev + 1);
    } else {
      setPagination((prev) => prev - 1);
    }
  };

  const changeLanguage = () => {
    if (language === 'es') {
      setLanguage('en');
    } else {
      setLanguage('es');
    }
  };

  const UI_TEXT = {
    en: {
      mainTitle: 'Pokedex Challenge!',
      languageButton: 'change language',
      paginationText: 'Page:',
    },
    es: {
      mainTitle: 'Desafío Pokedex!',
      languageButton: 'cambiar idioma',
      paginationText: 'Página:',
    },
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
        <LanguageContext.Provider value={language}>
          <h1 className="main-title">{UI_TEXT[language].mainTitle}</h1>
          <button onClick={() => changeLanguage()}>
            {UI_TEXT[language].languageButton}
          </button>
          <div className="container">
            {pagination > 0 && (
              <Button handlePagination={handlePagination} direction="prev" />
            )}
            <Button handlePagination={handlePagination} direction="next" />
            {result.results.map((results, index) => (
              <Cards data={results} key={index} />
            ))}
          </div>
          <p>
            {UI_TEXT[language].paginationText} {pagination + 1}
          </p>
        </LanguageContext.Provider>
      </>
    );
  return null;
};

export default Pokedex;

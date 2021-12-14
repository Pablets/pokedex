import React from 'react';
import useAsyncHook from '../../hooks/useAsyncHook';
import Button from '../Button';
import Cards from '../Cards/Cards';
import GridLoader from '../GridLoader';
// import GridLoader from './GridLoader';

export const LanguageContext = React.createContext();

const pokeApiURL = 'https://pokeapi.co/api/v2/pokemon/';

const Pokedex = () => {
  const [pagination, setPagination] = React.useState(0);
  const { state, dispatch } = useAsyncHook();
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

  const { status, data } = state;

  const handleDispatch = React.useCallback(() => {
    dispatch({
      type: 'all',
      url: pokeApiURL,
      limit: 5,
      offset: 5 * pagination,
    });
  }, [dispatch, pagination]);

  React.useEffect(() => {
    handleDispatch();
  }, [handleDispatch]);

  return (
    <LanguageContext.Provider value={language}>
      <header className="container row">
        <h1 className="main-title">{UI_TEXT[language].mainTitle}</h1>
        <button className="main-button" onClick={() => changeLanguage()}>
          {UI_TEXT[language].languageButton}
        </button>
        <p>
          {UI_TEXT[language].paginationText} {pagination + 1}
        </p>
      </header>
      <main
        className="container"
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
      >
        {pagination > 0 && (
          <Button handlePagination={handlePagination} direction="prev" />
        )}
        <Button handlePagination={handlePagination} direction="next" />
        {status === 'finished' && data ? (
          data.results.map((pokemonData, index) => (
            <Cards pokemonData={pokemonData} key={index} />
          ))
        ) : (
          <GridLoader />
        )}
      </main>
    </LanguageContext.Provider>
  );
};

export default Pokedex;

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

  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 150) {
      // do your stuff here for left swipe
      setPagination((prev) => prev + 1);
    }

    if (touchStart - touchEnd < -150) {
      // do your stuff here for right swipe
      setPagination((prev) => prev - 1);
    }
  }

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
        {status === 'loading' ? (
          <GridLoader />
        ) : (
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
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {pagination > 0 && (
                <Button handlePagination={handlePagination} direction="prev" />
              )}
              <Button handlePagination={handlePagination} direction="next" />
              {result.results.map((results, index) => (
                <Cards data={results} key={index} />
              ))}
            </main>
          </LanguageContext.Provider>
        )}
      </>
    );
  return null;
};

export default Pokedex;

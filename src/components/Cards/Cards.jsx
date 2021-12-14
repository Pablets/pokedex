import React from 'react';
import useAsyncHook from '../../hooks/useAsyncHook';
import DetailsPopup from '../DetailsPopup/DetailsPopup';
import { LanguageContext } from '../Pokedex/Pokedex';

const Cards = ({ pokemonData }) => {
  const value = React.useContext(LanguageContext);
  const UI_TEXT = {
    en: {
      aditionalInfoButton: 'Show aditional info',
    },
    es: {
      aditionalInfoButton: 'Ver más información',
    },
  };

  const [showMore, setShowMore] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const { state, dispatch } = useAsyncHook();

  const { status, data, error } = state;

  const handleDispatch = React.useCallback(() => {
    dispatch({ type: 'card', url: pokemonData.url });
  }, [dispatch, pokemonData.url]);

  React.useEffect(() => {
    handleDispatch();
  }, [handleDispatch]);

  const showMoreCallback = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  return (
    <>
      {error && <div>Error</div>}
      <div
        role={'img'}
        data-testid={'card'}
        className="card-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setShowMore(!showMore)}
      >
        <div className="card">
          <>
            <div
              className={`overlay ${hover ? 'overlay-hovered' : null}`}
            ></div>
            {status === 'finished' && (
              <img
                className={`card-img ${hover ? 'img-hovered' : null}`}
                src={data?.sprites?.other['official-artwork'].front_default}
                alt={pokemonData.name}
              />
            )}
            <div className="card-description">
              <h1 className="card-description-title">{pokemonData.name}</h1>
              <button
                className={`card-description-button ${
                  hover ? 'button-hovered' : null
                }`}
                tabIndex={-1}
              >
                {UI_TEXT[value].aditionalInfoButton}
              </button>
            </div>
          </>
        </div>
      </div>
      {showMore && status === 'finished' && (
        <DetailsPopup
          className="popup"
          data={data}
          showMoreCallback={showMoreCallback}
          mainImgURL={data?.sprites?.other['official-artwork'].front_default}
        />
      )}
    </>
  );
};

export default Cards;

import React from 'react';
import useAsyncHook from '../hooks/useAsyncHook';
import DetailsPopup from './DetailsPopup';
import GridLoader from './GridLoader';
import { LanguageContext } from './Pokedex';

const Cards = ({ data }) => {
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

  const [query, setQuery] = React.useState({
    type: 'card',
    url: '',
  });
  const [result, status] = useAsyncHook({ type: query.type, url: query.url });
  const [mainImgURL, setMainImgURL] = React.useState('');

  React.useEffect(() => {
    setQuery({ type: 'card', url: data.url });
    if (status === 'loaded') {
      setMainImgURL(result?.sprites?.other['official-artwork'].front_default);
    }
    return () => {
      setQuery({ type: '', url: '' });
    };
  }, [data.url, result?.sprites?.other, status]);

  const showMoreCallback = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <div
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
            <img
              className={`card-img ${hover ? 'img-hovered' : null}`}
              src={mainImgURL}
              alt={data.name}
            />
            <div className="card-description">
              <h1 className="card-description-title">{data.name}</h1>
              <button
                className={`card-description-button ${
                  hover ? 'button-hovered' : null
                }`}
              >
                {UI_TEXT[value].aditionalInfoButton}
              </button>
            </div>
          </>
        </div>
      </div>
      {showMore && (
        <DetailsPopup
          className="popup"
          data={result}
          showMoreCallback={showMoreCallback}
          mainImgURL={mainImgURL}
        />
      )}
    </>
  );
};

export default Cards;

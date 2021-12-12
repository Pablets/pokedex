import React from 'react';
import useAsyncHook from '../hooks/useAsyncHook';
import DetailsPopup from './DetailsPopup';
import GridLoader from './GridLoader';

const Cards = ({ data }) => {
  const [showMore, setShowMore] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const [query, setQuery] = React.useState({
    type: 'card',
    url: '',
  });
  const [result, status] = useAsyncHook({ type: query.type, url: query.url });

  React.useEffect(() => {
    setQuery({ type: 'card', url: data.url });
    return () => {
      setQuery({ type: '', url: '' });
    };
  }, [data.url]);

  return (
    <>
      <div
        className="card-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="card">
          {status !== 'loaded' ? (
            <GridLoader />
          ) : (
            <>
              <div
                className={`overlay ${hover ? 'overlay-hovered' : null}`}
              ></div>
              <img
                className={`card-img ${hover ? 'img-hovered' : null}`}
                src={result?.sprites?.other['official-artwork'].front_default}
                alt={data.name}
              />
              <div
                className="card-description"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <h1 className="card-description-title">{data.name}</h1>
                <button
                  className="card-description-button"
                  onClick={() => setShowMore(!showMore)}
                >
                  Show aditional info
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {showMore && <DetailsPopup className="popup" data={result} />}
    </>
  );
};

export default Cards;

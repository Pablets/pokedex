import React from 'react';
import useAsyncHook from '../../hooks/useAsyncHook';
import { LanguageContext } from '../Pokedex/Pokedex';

const SpeciesDetail = ({ pokemonID }) => {
  const value = React.useContext(LanguageContext);

  const { state, dispatch } = useAsyncHook();
  const [dataToShow, setDataToShow] = React.useState(null);

  const { status, data } = state;

  const handleDispatch = React.useCallback(() => {
    dispatch({
      type: 'card-details-species',
      url: `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`,
    });
  }, [dispatch, pokemonID]);

  React.useEffect(() => {
    handleDispatch();
  }, [handleDispatch]);

  React.useEffect(() => {
    if (status === 'finished') {
      let [descData] = data.flavor_text_entries.filter(
        (entry) => entry.language.name === value
      );
      let [typeData] = data.genera.filter(
        (type) => type.language.name === value
      );
      let pokemonName = data.name;
      setDataToShow({
        description: descData.flavor_text,
        pokemonType: typeData.genus,
        pokemonName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <>
      <div className="popup-description-container">
        {status === 'finished' && dataToShow && (
          <>
            <h2 className="popup-description-subtitle">
              {dataToShow.pokemonType}
            </h2>
            <h1 className="popup-description-title">
              {dataToShow.pokemonName}
            </h1>
          </>
        )}
      </div>
      <div className="popup-description-container-50">
        {status === 'finished' && dataToShow && (
          <p className="popup-description-main-paragraph">
            {dataToShow.description}
          </p>
        )}
      </div>
    </>
  );
};

export default SpeciesDetail;

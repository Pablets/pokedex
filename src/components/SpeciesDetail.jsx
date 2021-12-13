import React from 'react';
import useAsyncHook from '../hooks/useAsyncHook';
import { LanguageContext } from './Pokedex';

const SpeciesDetail = ({ pokemonID }) => {
  const [query, setQuery] = React.useState({
    type: 'card-details',
    url: '',
  });

  const UI_TEXT = {
    en: {
      typeText: 'Type:',
      descText: 'Description:',
    },
    es: {
      typeText: 'Tipo:',
      descText: 'Descripción:',
    },
  };

  const value = React.useContext(LanguageContext);

  const [result, status] = useAsyncHook({ type: query.type, url: query.url });
  // const [languaje, setLanguaje] = React.useState('es');
  const [dataToShow, setDataToShow] = React.useState(null);

  React.useEffect(() => {
    if (status === 'idle') {
      setQuery({
        type: 'especies-details',
        url: `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`,
      });
    }
    if (status === 'loaded') {
      let [descData] = result.flavor_text_entries.filter(
        (entry) => entry.language.name === value
      );
      let [typeData] = result.genera.filter(
        (type) => type.language.name === value
      );
      let pokemonName = result.name;
      setDataToShow({
        description: descData.flavor_text,
        pokemonType: typeData.genus,
        pokemonName,
      });
    }
  }, [pokemonID, result, status, value]);

  return (
    status === 'loaded' &&
    dataToShow && (
      <>
        <div className="popup-description-container">
          <h2 className="popup-description-subtitle">
            {dataToShow.pokemonType}
          </h2>
          <h1 className="popup-description-title">{dataToShow.pokemonName}</h1>
        </div>
        <div className="popup-description-container-50">
          <p className="popup-description-main-paragraph">
            {dataToShow.description}
          </p>
        </div>
      </>
    )
  );
};

export default SpeciesDetail;

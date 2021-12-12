import React from 'react';
import useAsyncHook from '../hooks/useAsyncHook';

const AbilityDetail = ({ ability }) => {
  const [query, setQuery] = React.useState({
    type: 'card-details',
    url: '',
  });
  const [result, status] = useAsyncHook({ type: query.type, url: query.url });
  // const [languaje, setLanguaje] = React.useState('es');
  const [dataToShow, setDataToShow] = React.useState(null);

  React.useEffect(() => {
    if (status === 'idle') {
      setQuery({ type: 'card-details', url: ability });
    }

    if (status === 'loaded') {
      let [descData] = result.flavor_text_entries.filter(
        (entry) => entry.language.name === 'es'
      );
      let [nameData] = result.names.filter(
        (entry) => entry.language.name === 'es'
      );
      console.log('data =>', descData, nameData);
      setDataToShow({
        description: descData.flavor_text,
        name: nameData.name,
      });
    }
  }, [ability, result, status]);

  return (
    status === 'loaded' &&
    dataToShow && (
      <div>
        <h3>
          {dataToShow.name}: {dataToShow.description}
        </h3>
      </div>
    )
  );
};

const SpeciesDetail = ({ pokemonID }) => {
  const [query, setQuery] = React.useState({
    type: 'card-details',
    url: '',
  });
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
        (entry) => entry.language.name === 'es'
      );
      setDataToShow({
        description: descData.flavor_text,
      });
      console.log('pokemon description:', descData.flavor_text);
    }
  }, [pokemonID, result, status]);

  return (
    status === 'loaded' &&
    dataToShow && (
      <div>
        <h2>Descripcion del pokemon: {dataToShow.description}</h2>
      </div>
    )
  );
};

const DetailsPopup = ({ data }) => {
  console.log('data ====>', data);

  // * Ability detail:  https://pokeapi.co/api/v2/ability/{ability-id}/
  // * Species detail: https://pokeapi.co/api/v2/pokemon-species/{pokemon-id}

  return (
    <div className="popup">
      <SpeciesDetail pokemonID={data.id} />
      <h2>Habilidades</h2>
      {data &&
        data.abilities.map(({ ability }, index) => (
          <div key={index}>
            <AbilityDetail ability={ability.url} />
          </div>
        ))}
    </div>
  );
};

export default DetailsPopup;

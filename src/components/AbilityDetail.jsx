import React from 'react';
import useAsyncHook from '../hooks/useAsyncHook';
import { LanguageContext } from './Pokedex';

const AbilityDetail = ({ ability, liftState }) => {
  const [query, setQuery] = React.useState({
    type: 'card-details',
    url: '',
  });
  const value = React.useContext(LanguageContext);
  const [result, status] = useAsyncHook({ type: query.type, url: query.url });
  // const [languaje, setLanguaje] = React.useState('es');
  const [dataToShow, setDataToShow] = React.useState(null);

  React.useEffect(() => {
    if (status === 'idle') {
      setQuery({ type: 'card-details', url: ability });
    }

    if (status === 'loaded') {
      let [descData] = result.flavor_text_entries.filter(
        (entry) => entry.language.name === value
      );
      let [nameData] = result.names.filter(
        (entry) => entry.language.name === value
      );
      setDataToShow({
        description: descData.flavor_text,
        name: nameData.name,
      });
      liftState(status);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ability, result, status, value]);

  return (
    status === 'loaded' &&
    dataToShow && (
      <li>
        <p className="popup-description-paragraph">
          {dataToShow.name}: {dataToShow.description}
        </p>
      </li>
    )
  );
};

export default AbilityDetail;

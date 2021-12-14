import React from 'react';
import useAsyncHook from '../../hooks/useAsyncHook';
import { LanguageContext } from '../Pokedex/Pokedex';

const AbilityDetail = ({ ability, liftState }) => {
  const value = React.useContext(LanguageContext);
  const { state, dispatch } = useAsyncHook();
  const [dataToShow, setDataToShow] = React.useState(null);

  const { status, data, error } = state;

  const handleCallbacks = React.useCallback(() => {
    dispatch({ type: 'card-details-abilities', url: ability });
    liftState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ability, dispatch]);

  React.useEffect(() => {
    handleCallbacks();
  }, [handleCallbacks]);

  React.useEffect(() => {
    if (status === 'finished' && data) {
      let [descData] = data.flavor_text_entries.filter(
        (entry) => entry.language.name === value
      );
      let [nameData] = data.names.filter(
        (entry) => entry.language.name === value
      );

      setDataToShow({
        description: descData.flavor_text,
        name: nameData.name,
      });
    }
  }, [data, status, value]);

  if (error) return <h1 role={'status'}>{error}</h1>;
  return (
    status === 'finished' &&
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

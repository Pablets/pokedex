import React from 'react';
import AbilityDetail from '../AbilityDetail/AbilityDetail';
import GridLoader from '../GridLoader';
import { LanguageContext } from '../Pokedex/Pokedex';
import SpeciesDetail from '../SpeciesDetail/SpeciesDetail';

// * Ability detail:  https://pokeapi.co/api/v2/ability/{ability-id}/
// * Species detail: https://pokeapi.co/api/v2/pokemon-species/{pokemon-id}

const DetailsPopup = ({ data, showMoreCallback, mainImgURL }) => {
  const UI_TEXT = {
    en: {
      title: 'Abilities',
      backButtonText: 'Back',
    },
    es: {
      title: 'Habilidades',
      backButtonText: 'Atras',
    },
  };

  const value = React.useContext(LanguageContext);

  const [smothLoaderStatus, setsSmothLoaderStatus] = React.useState(null);

  React.useEffect(() => {
    if (smothLoaderStatus === null) {
      setsSmothLoaderStatus('fade-in');
    } else if (smothLoaderStatus === 'fade-out') {
      setTimeout(() => {
        setsSmothLoaderStatus('ended');
      }, 500);
    }
  }, [smothLoaderStatus]);

  const liftState = () => {
    setTimeout(() => {
      setsSmothLoaderStatus('fade-out');
    }, 1000);
  };

  return (
    <div className="popup">
      {smothLoaderStatus && smothLoaderStatus !== 'ended' && (
        <div className={`popup-loader-container ${smothLoaderStatus}`}>
          <GridLoader />
        </div>
      )}
      <div className="main-container">
        <div className="popup-container gradient-background">
          <div className=" popup-container-gradient">
            <img className="img" src={mainImgURL} alt="pokemon img" />
          </div>
        </div>
        <div className="popup-container">
          <div className="popup-description">
            <SpeciesDetail pokemonID={data.id} />
            <div className="popup-description-container-50">
              <h3 className="popup-description-h3">{UI_TEXT[value].title}</h3>
              <ul>
                {data &&
                  data.abilities.map(({ ability }, index) => (
                    <AbilityDetail
                      ability={ability.url}
                      liftState={liftState}
                      key={index}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="exit-button" onClick={showMoreCallback}>
          {UI_TEXT[value].backButtonText}
        </button>
      </div>
    </div>
  );
};

export default DetailsPopup;

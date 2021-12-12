import React from 'react';
import AbilityDetail from './AbilityDetail';
import GridLoader from './GridLoader';
import { LanguageContext } from './Pokedex';
import SpeciesDetail from './SpeciesDetail';

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
      console.log('fading out');
      setTimeout(() => {
        setsSmothLoaderStatus('ended');
        console.log('ended');
      }, 500);
    }
  }, [smothLoaderStatus]);

  const liftState = () => {
    console.log('lifting state up');
    setTimeout(() => {
      setsSmothLoaderStatus('fade-out');
    }, 1000);
  };

  return (
    <div
      className={`popup ${
        smothLoaderStatus !== 'fade-in' && 'gradient-background'
      }`}
    >
      {smothLoaderStatus && smothLoaderStatus !== 'ended' && (
        <div className={`popup-loader-container ${smothLoaderStatus}`}>
          <GridLoader />
        </div>
      )}
      {/* {smothLoaderStatus && smothLoaderStatus !== 'fade-in' && ( */}
      <>
        <div className="popup-container">
          <img className="img" src={mainImgURL} alt="" />
        </div>
        <div className="popup-container">
          <div className="popup-description">
            <SpeciesDetail pokemonID={data.id} />
            <h2>{UI_TEXT[value].title}</h2>
            {data &&
              data.abilities.map(({ ability }, index) => (
                <div key={index}>
                  <AbilityDetail ability={ability.url} liftState={liftState} />
                </div>
              ))}
            <div>
              <button onClick={showMoreCallback}>
                {UI_TEXT[value].backButtonText}
              </button>
            </div>
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default DetailsPopup;

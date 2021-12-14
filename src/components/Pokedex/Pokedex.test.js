import React from 'react';
import { render } from '@testing-library/react';
import Pokedex from './Pokedex';

describe('Pokedex', () => {
  it('should display UI elements', async () => {
    const { getByRole, getByText } = render(<Pokedex />);

    const button = getByRole('button-next');
    let languageButton = getByRole('button', {
      name: /(cambiar idioma|change language)/i,
    });

    const title = getByText(/(desafío pokedex!|pokedex challenge!)/i);

    expect(languageButton).toBeDefined();
    expect(button).toBeDefined();
    expect(title).toBeDefined();
  });
});

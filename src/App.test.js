import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Pokedex from './components/Pokedex/Pokedex';

Enzyme.configure({ adapter: new Adapter() });

describe('Parent Component', () => {
  it('renders Child component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Pokedex />)).toEqual(true);
  });
});

import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';

import CreateCard from './CreateCard';
import SearchBar from '../SearchBar';

const FAKE_DATA = {
  "coord":
  {"lon":145.77,"lat":-16.92},
  "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
  "base":"cmc stations",
  "main":{"temp":32.1,"pressure":1019,"humidity":83,"temp_min":289.82,"temp_max":295.37},
  "wind":{"speed":5.1,"deg":150},
  "clouds":{"all":75},
  "rain":{"3h":3},
  "dt":1435658272,
  "sys":{"type":1,"id":8166,"message":0.0166,"country":"AU","sunrise":1435610796,"sunset":1435650870},
  "id":2172797,
  "name":"Cairns",
  "cod":200
};

describe('CreateCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CreateCard/>,
      {attachTo: document.createElement('div')}
    );
  });

  it('renders create card', () => {
    expect(wrapper.find('.create-card').length).to.eq(1);
  })

  it('changes on click', () => {
    wrapper.find('.create-card').simulate('click');
    expect(wrapper.find(SearchBar).length).to.eq(1);
  });
});

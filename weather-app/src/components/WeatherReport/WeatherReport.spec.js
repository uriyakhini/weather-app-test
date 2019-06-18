import React from 'react';

import {shallow} from 'enzyme';
import {expect} from 'chai';

import WeatherReport from './WeatherReport';


describe('WeatherReport', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <WeatherReport/>,
      {attachTo: document.createElement('div')}
    );
  });

  it('renders weather report', () => {
    expect(wrapper.find('.weather-report').length).to.eq(1);
  })
});

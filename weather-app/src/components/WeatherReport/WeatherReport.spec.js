import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import WeatherReport from './WeatherReport';

describe('WeatherReport', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <WeatherReport location='Tel Aviv'/>,
      {attachTo: document.createElement('div')}
    );
  });

  it('renders weather report', () => {
    expect(wrapper.find('.weather-report').length).to.eq(1);
  })

  it('shows location', () => {
    expect(wrapper.find('.location').text()).to.eq('Tel Aviv');
  })
});

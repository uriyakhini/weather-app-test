import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';
import moxios from 'moxios';
import axios from 'axios';

import WeatherReport from './WeatherReport';
import WeatherCard from '../WeatherCard';

const FAKE_DATA = {"coord":
  {"lon":145.77,"lat":-16.92},
  "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
  "base":"cmc stations",
  "main":{"temp":293.25,"pressure":1019,"humidity":83,"temp_min":289.82,"temp_max":295.37},
  "wind":{"speed":5.1,"deg":150},
  "clouds":{"all":75},
  "rain":{"3h":3},
  "dt":1435658272,
  "sys":{"type":1,"id":8166,"message":0.0166,"country":"AU","sunrise":1435610796,"sunset":1435650870},
  "id":2172797,
  "name":"Cairns",
  "cod":200
};

describe('WeatherReport', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <WeatherReport/>,
      {attachTo: document.createElement('div')}
    );
  });

  afterEach(() => {
    wrapper.detach();
  });

  it('renders weather report', () => {
    expect(wrapper.find('.weather-report').length).to.eq(1);
  })

  it('creates a new card', async () => {
    moxios.install(axios);
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: FAKE_DATA
      });
    });

    await wrapper.instance().addCard('Cairns');

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: FAKE_DATA
      });
    });
    
    await wrapper.instance().addCard('Cairo');
    wrapper.update();
    expect(wrapper.find(WeatherCard).length).to.eq(2);
    moxios.uninstall();
  });
});

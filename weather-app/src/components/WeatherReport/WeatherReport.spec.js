import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';
import moxios from 'moxios';
import axios from 'axios';

import WeatherReport from './WeatherReport';


describe('WeatherReport', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <WeatherReport location='Tel Aviv'/>,
      {attachTo: document.createElement('div')}
    );
  });

  afterEach(() => {
    wrapper.detach();
  });

  it('renders weather report', () => {
    expect(wrapper.find('.weather-report').length).to.eq(1);
  })

  it('shows location', () => {
    expect(wrapper.find('.location').text()).to.eq('Tel Aviv');
  })

  it('querries weather data from openweather', async function () {
    moxios.install(axios);
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {"coord":
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
        "cod":200}
      });
    });

    await wrapper.instance().componentDidMount();
    expect(wrapper.state().data).to.exist;
    moxios.uninstall();
  });
});

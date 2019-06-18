import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';
import moxios from 'moxios';
import axios from 'axios';

import WeatherReport from './WeatherReport';
import WeatherCard from '../WeatherCard';
import Forecast from '../Forecast';

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

const FORECAST_FAKE_DATA = {
  "city":{"id":1851632,"name":"Shuzenji"},
  "coord":{"lon":138.933334,"lat":34.966671},
  "country":"JP",
  "cod":"200",
  "message":0.0045,
  "cnt":38,
  "list":[
    {"dt":1406106000,
     "main":{
     "temp":298.77,
     "temp_min":298.77,
     "temp_max":298.774,
     "pressure":1005.93,
     "sea_level":1018.18,
     "grnd_level":1005.93,
     "humidity":87,
     "temp_kf":0.26},
     "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
     "clouds":{"all":88},
     "wind":{"speed":5.71,"deg":229.501},
     "sys":{"pod":"d"},
     "dt_txt":"2014-07-23 09:00:00"},
    {"dt":1406194000,
    "main":{
    "temp":298.77,
    "temp_min":298.77,
    "temp_max":298.774,
    "pressure":1005.93,
    "sea_level":1018.18,
    "grnd_level":1005.93,
    "humidity":87,
    "temp_kf":0.26},
    "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
    "clouds":{"all":88},
    "wind":{"speed":5.71,"deg":229.501},
    "sys":{"pod":"d"},
    "dt_txt":"2014-07-23 09:00:00"},
    {"dt":1406286000,
    "main":{
    "temp":298.77,
    "temp_min":298.77,
    "temp_max":298.774,
    "pressure":1005.93,
    "sea_level":1018.18,
    "grnd_level":1005.93,
    "humidity":87,
    "temp_kf":0.26},
    "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
    "clouds":{"all":88},
    "wind":{"speed":5.71,"deg":229.501},
    "sys":{"pod":"d"},
    "dt_txt":"2014-07-23 09:00:00"},
    {"dt":1406366000,
    "main":{
    "temp":298.77,
    "temp_min":298.77,
    "temp_max":298.774,
    "pressure":1005.93,
    "sea_level":1018.18,
    "grnd_level":1005.93,
    "humidity":87,
    "temp_kf":0.26},
    "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
    "clouds":{"all":88},
    "wind":{"speed":5.71,"deg":229.501},
    "sys":{"pod":"d"},
    "dt_txt":"2014-07-23 09:00:00"},
    {"dt":1406466000,
    "main":{
    "temp":298.77,
    "temp_min":298.77,
    "temp_max":298.774,
    "pressure":1005.93,
    "sea_level":1018.18,
    "grnd_level":1005.93,
    "humidity":87,
    "temp_kf":0.26},
    "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],
    "clouds":{"all":88},
    "wind":{"speed":5.71,"deg":229.501},
    "sys":{"pod":"d"},
    "dt_txt":"2014-07-23 09:00:00"}]}
;

describe('WeatherReport', () => {
  let wrapper;

  beforeEach(() => {
    moxios.install(axios);
    wrapper = mount(
      <WeatherReport/>,
      {attachTo: document.createElement('div')}
    );
  });

  afterEach(() => {
    moxios.uninstall();
    wrapper.detach();
  });

  it('renders weather report', () => {
    expect(wrapper.find('.weather-report').length).to.eq(1);
  })

  it('creates a new card', async () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: FAKE_DATA
      });
    });

    await wrapper.instance().addCard('Cairns');  
    await wrapper.instance().addCard('Cairo');
    
    wrapper.update();
    expect(wrapper.find(WeatherCard).length).to.eq(2);
  });

  it('Parses and renders forecast', async () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: FORECAST_FAKE_DATA
      });
    });

    await wrapper.instance().getForecast('Cairns');
    wrapper.update();
    expect(wrapper.find(Forecast).length).to.eq(1);
  });
});

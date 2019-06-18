import React from 'react';

import {mount} from 'enzyme';
import {expect} from 'chai';

import Forecast from './Forecast';
import WeatherCard from '../WeatherCard';

const FAKE_DATA = {
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

describe('Forecast', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Forecast data={FAKE_DATA} tag='Shuzenji'/>,
      {attachTo: document.createElement('div')}
    );
  });

  afterEach(() => wrapper.detach());

  it('renders forecast', () => {
    expect(wrapper.find('.forecast').length).to.eq(1);
  });

  it('renders the forecast cards for the following days', () => {
    expect(wrapper.find(WeatherCard).length).to.eq(5);
  });
});

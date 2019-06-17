import axios from 'axios'
import moxios from 'moxios'
import {expect} from 'chai'

import getCurrentWeather from './weatherAPI'

describe('WeatherReport', () => {
  it('Skips weather query if another exists in cache', async function () {
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
    await getCurrentWeather('Cairns');

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          "coord":{"lon":145.77,"lat":-16.92},
          "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
          "base":"cmc stations",
          "main":{"temp":293.25,"pressure":1019,"humidity":83,"temp_min":289.82,"temp_max":295.37},
          "wind":{"speed":5.1,"deg":150},
          "clouds":{"all":75},
          "rain":{"3h":3},
          "dt":1435658272,
          "sys":{"type":1,"id":8166,"message":0.0166,"country":"AU","sunrise":1435610796,"sunset":1435650870},
          "id":2172797,
          "name":"Cairns2",
          "cod":200
        }
      });
    });
    let res = await getCurrentWeather('Cairns');
    expect(res.name).to.eq('Cairns');

    moxios.uninstall();
  });
});

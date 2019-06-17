import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import App from './App';

describe('App', () => {
  let wrapper;

  before(() => {
    wrapper = mount(
      <App/>,
      {attachTo: document.createElement('div')}
    );
  });

  it('renders weather report', () => {
    expect(wrapper.find('.weather-report').length).to.eq(1);
  });
});

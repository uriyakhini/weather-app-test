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

  it('sets location state on enter', () => {
    var input = wrapper.find('input');
    input.simulate('change', {target: {value: 'test'}});
    input.simulate('keypress', {key: 13});

    expect(wrapper.state().location).to.equal('test');
  });

  it('renders weather report', () => {
    expect(wrapper.find('.location').text()).to.eq('test');
  });
});
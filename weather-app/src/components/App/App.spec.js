import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import App from './App';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <App/>,
      {attachTo: document.createElement('div')}
    );
  });

  afterEach(() => wrapper.detach());

  it('sets location state on enter', () => {
    var input = wrapper.find('input');
    input.simulate('change', {target: {value: 'test'}});
    input.simulate('keypress', {key: 13});

    expect(wrapper.state().location).to.equal('test');
  });
});
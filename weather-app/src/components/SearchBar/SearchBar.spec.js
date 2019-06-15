import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import SearchBar from './SearchBar.js';

describe('SearchBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SearchBar/>,
      {attachTo: document.createElement('div')}
    );
  });

  it('renders the search input correctly', () => {
    expect(wrapper.find('input').length).to.eq(1);
  });
});

/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import Application from './Application';

describe('Application module', function () {
  it('should render hello react world', function () {
    const wrapper = shallow(<Application />);
    expect(wrapper).to.have.text('Hello React World');
  });
});

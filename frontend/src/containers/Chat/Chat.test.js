import React from 'react';
import { shallow } from 'enzyme';
import Chat from './Chat';

describe('<Chat />', () => {
  it('renders', () => {
    const wrapper = shallow(<Chat />);
    const component = wrapper.find('.test');
    expect(component.length).toBe(1);
  });
});

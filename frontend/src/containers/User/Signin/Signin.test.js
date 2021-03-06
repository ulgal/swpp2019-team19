/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Signin from './Signin';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as ActionCreators from '../../../store/actions/user';

const stubUserInitialState = {
  signinFail: false,
  signupFail: false,
};

const mockStore = getMockStore({}, stubUserInitialState, {}, {});

describe('<Signin />', () => {
  let signin;
  let spySignin;
  beforeEach(() => {
    signin = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Signin} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spySignin = jest
      .spyOn(ActionCreators, 'signin')
      .mockImplementation(() => (dispatch) => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mount(signin);
    const wrapper = component.find('.Signin');
    expect(wrapper.length).toBe(1);
  });

  it('input username and password, call Signin', () => {
    const wrapper = mount(signin);
    const usernameInput = wrapper.find('#username-input');
    const passwordInput = wrapper.find('#pw-input');
    const buttonInput = wrapper.find('#Signin-button').at(0);

    const testUsername = 'test_username';
    const passwordShort = 'short';

    usernameInput.instance().value = testUsername;
    usernameInput.simulate('change');

    passwordInput.instance().value = passwordShort;
    passwordInput.simulate('change');

    expect(spySignin).toHaveBeenCalledTimes(0);
    buttonInput.simulate('click');
    expect(spySignin).toHaveBeenCalledTimes(1);
    expect(spySignin).toHaveBeenCalledWith(testUsername, passwordShort);
  });

  it('goto signup page', () => {
    const wrapper = mount(signin);
    const buttonInput = wrapper.find('#direct-to-signup').at(0);

    buttonInput.simulate('click');
    expect(history.location.pathname).toBe('/signup');
  });
});

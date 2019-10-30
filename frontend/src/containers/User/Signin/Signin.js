import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../../store/actions/index';

class Signin extends Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  /* eslint-disable */


  render() {
    const SigninHandler = () => {
      this.props.Signin(this.state.username, this.state.password);
    };
    return (
      <div className="Signin">
        <Button id="direct-to-signup" onClick={() => this.props.history.push('/signup')}>
          go to signup page
        </Button>
        <h1>Need Signin!</h1>
        <label>username</label>
        <input
          id="username-input"
          type="text"
          value={this.state.username}
          onChange={(event) => this.setState({ username: event.target.value })}
        />
        <label>Password</label>
        <input
          id="pw-input"
          type="password"
          value={this.state.content}
          onChange={(event) => this.setState({ password: event.target.value })}
        />
        <Button id="Signin-button" onClick={() => SigninHandler()}>
          Signin
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  Signin: (username, password) => dispatch(actionCreators.signin(username, password)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Signin));

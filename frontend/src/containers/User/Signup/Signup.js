import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../../store/actions/index';

import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: sessionStorage.getItem('username'),
      username: '',
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      validNickname: false,
      validPassword: false,
      validPasswordConfirm: false,
    };
    const { loginUsername } = this.state;
    if (loginUsername !== null) {
      props.history.goBack();
    }
  }

  render() {
    const {
      username, nickname, email, password, passwordConfirm,
      validNickname, validPassword, validPasswordConfirm,
      loginUsername,
    } = this.state;
    const {
      createFail, submitFail, history, signup,
    } = this.props;

    const pushHandler = () => {
      // NOSONAR
      if (!createFail) {
        history.push('/signin');
      }
    };
    const SignupHandler = () => {
      if (nickname.length < 2) {
        this.setState({
          validNickname: false,
        });
      } else if (password.length < 8) {
        this.setState({
          validNickname: true,
          validPassword: false,
          validPasswordConfirm: true,
          password: '',
          passwordConfirm: '',
        });
      } else if (password !== passwordConfirm) {
        this.setState({
          validNickname: true,
          validPassword: true,
          validPasswordConfirm: false,
          passwordConfirm: '',
        });
      } else {
        this.setState({
          validNickname: true,
          validPassword: true,
          validPasswordConfirm: true,
        });
        signup(email, username, nickname, password).then(() => pushHandler());
      }
    };
    const errorToAlert = () => {
      let message = null;
      if (submitFail) {
        message = 'all field must be filled';
      } else if (createFail) {
        message = 'email, username or nickname already exists';
      } else if (!validNickname) {
        message = 'Nickname should be at least 2 characters';
      } else if (!validPassword) {
        message = 'Password should be at least 8 characters';
      } else if (!validPasswordConfirm) {
        message = 'Password and Password Confirm are different';
      }
      if (message === null) {
        return (<div />);
      }
      return (
        <Alert variant="warning">{message}</Alert>
      );
    };

    return (
      loginUsername !== null ? <div /> : (
        <div className="Signup">
          {errorToAlert()}
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="card card-signup flex-row my-4">
                  <div className="card-img-left d-none d-md-flex" />
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      Create Your Account!
                    </h5>
                    <form className="form-signup">
                      <div className="form-label-group-signup">
                        <input
                          id="username-input"
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          value={username}
                          onChange={(event) => this.setState({
                            username: event.target.value,
                          })}
                          required
                          // eslint-disable-next-line jsx-a11y/no-autofocus
                          autoFocus
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Username</label>
                      </div>
                      <hr />
                      <div className="form-label-group-signup">
                        <input
                          id="nickname-input"
                          type="text"
                          className="form-control"
                          placeholder="Nickname"
                          value={nickname}
                          onChange={(event) => this.setState({
                            nickname: event.target.value,
                          })}
                          required
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Nickname</label>
                      </div>
                      <hr />
                      <div className="form-label-group-signup">
                        <input
                          type="text"
                          id="email-input"
                          className="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={(event) => this.setState({
                            email: event.target.value,
                          })}
                          required
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Email address</label>
                      </div>
                      <hr />
                      <div className="form-label-group-signup">
                        <input
                          type="password"
                          id="pw-input"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(event) => this.setState({
                            password: event.target.value,
                          })}
                          required
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Password</label>
                      </div>
                      <div className="form-label-group-signup">
                        <input
                          type="password"
                          id="pw-confirm-input"
                          className="form-control"
                          placeholder="Password"
                          value={passwordConfirm}
                          onChange={(event) => this.setState({
                            passwordConfirm: event.target.value,
                          })}
                          required
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label>Confirm password</label>
                      </div>
                      <hr />
                      <br />
                      <br />
                      <Button
                        id="Signup-button"
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        onClick={() => SignupHandler()}
                        disabled={!username || !password}
                      >
                        Signup
                      </Button>
                      <Button
                        id="direct-to-signin"
                        className="btn btn-lg btn-primary btn-block text-uppercase"
                        type="submit"
                        onClick={() => history.push('/signin')}
                      >
                        Already member of SNUBot?
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  createFail: state.user.signupCreateFail,
  submitFail: state.user.signupSubmitFail,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (email, username, nickname, password) => dispatch(
    actionCreators.signup(email, username, nickname, password),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

Signup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
  createFail: PropTypes.bool.isRequired,
  submitFail: PropTypes.bool.isRequired,
};

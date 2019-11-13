import React, { Component } from 'react';
import { Button, Alert } from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Signup.css';
import * as actionCreators from '../../../store/actions/index';

class Signup extends Component {
  /* eslint-disable */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      validPassword: true,
      validPasswordConfirm: true
    };
  }
  /* eslint-disable */

  render() {
    const SignupHandler = () => {
      const email = this.state.email;
      const username = this.state.username;
      const password = this.state.password;
      const passwordConfirm = this.state.passwordConfirm;
      this.setState({ password: '', passwordConfirm: '' });
      if (password.length < 8) {
        this.setState({ validPassword: false, validPasswordConfirm: true });
      } else if (password !== passwordConfirm) {
        this.setState({ validPasswordConfirm: false, validPassword: true })
      } else {
        this.setState({ validPassword: true, validPasswordConfirm: true })
        this.props.signup(email, username, password);
        //this.props.history.push('/signin')
        //signup 이후에 로그인페이지로 넘어갈지 로그인 시킨채로 가려고하는 페이지로 가야할지 결정해야함
      }
    };

    return (
      <div className='Signup' >
        {
          this.props.fail ?
            <Alert
              variant={'warning'}
            >email or username already exists</Alert> :
            !this.state.validPassword ?
              <Alert
                variant={'warning'}
              >Password should be at least 8 characters</Alert> :
              !this.state.validPasswordConfirm ?
                <Alert
                  variant={'warning'}
                >Password and Password Confirm are different</Alert> :
                <p></p>
        }
        < div className='container' >
          <div className='row'>
            <div className='col-lg-10 col-xl-9 mx-auto'>
              <div className='card card-signup flex-row my-5'>
                <div className='card-img-left d-none d-md-flex'>
                  Image Here
              </div>
                <div className='card-body'>
                  <h5 className='card-title text-center'>Create Your Account!</h5>
                  <form className='form-signup'>
                    <div className='form-label-group-signup'>
                      <input
                        id='username-input'
                        type='text'
                        className='form-control'
                        placeholder='Username'
                        value={this.state.username}
                        onChange={(event) => this.setState({ username: event.target.value })}
                        required autoFocus
                      />
                      <label>Username</label>
                    </div>
                    <hr></hr>
                    <div className='form-label-group-signup'>
                      <input
                        type='text'
                        id='email-input'
                        className='form-control'
                        placeholder='Email address'
                        value={this.state.email}
                        onChange={(event) => this.setState({ email: event.target.value })}
                        required />
                      <label>Email address</label>
                    </div>
                    <hr></hr>
                    <div className='form-label-group-signup'>
                      <input
                        type='password'
                        id='pw-input'
                        className='form-control'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={(event) => this.setState({ password: event.target.value })}
                        required
                      />
                      <label>Password</label>
                    </div>
                    <div className='form-label-group-signup'>
                      <input
                        type='password'
                        id='pw-confirm-input'
                        className='form-control'
                        placeholder='Password'
                        value={this.state.passwordConfirm}
                        onChange={(event) => this.setState({
                          passwordConfirm: event.target.value
                        })}
                        required />
                      <label>Confirm password</label>
                    </div>
                    <hr>
                    </hr>
                    <br />
                    <br />
                    <Button
                      id='Signup-button'
                      className='btn btn-lg btn-primary btn-block text-uppercase'
                      type='submit'
                      onClick={() => SignupHandler()}
                      disabled={!this.state.username || !this.state.password}
                    >Signup</Button>
                    <Button
                      id='direct-to-signin'
                      className='btn btn-lg btn-primary btn-block text-uppercase'
                      type='submit'
                      onClick={() => this.props.history.push('/signin')}>
                      Already member of SNUBot?
                  </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fail: state.user.signupFail,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (email, username, password) =>
    dispatch(actionCreators.signup(email, username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Signup));

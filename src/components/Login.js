import firebase from 'firebase';
import { connect } from 'react-redux';
import React, { Component } from 'react';

firebase.initializeApp(
    {
        apiKey: "AIzaSyCQS1PQ2laBHPWJlZRZfjV8CkM4GiSdbl0",
        authDomain: "fir-redux-auth-poc.firebaseapp.com",
        databaseURL: "https://fir-redux-auth-poc.firebaseio.com",
        projectId: "fir-redux-auth-poc",
        storageBucket: "fir-redux-auth-poc.appspot.com",
        messagingSenderId: "718478334665"
    });

const loginAsync = () =>
    (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword("123@gmail.com", "123123")
        .then(function(success)
            {
                console.log(success);
                dispatch({type: 'login_succeed', id: 'yay'});
            }
        )   .catch(error=> {
        //dispatch({type: 'login_error', id: 'error'});
    });
};

const mapDispatchToProps = (dispatch, props) => ({
    loginAsync: () => dispatch(loginAsync())
});

const mapStateToProps = (s) => ({
    UserInfo: s.UserInfo
})

class Login extends Component {
    state = {
        email: "",
        password: "",
        error: {
            message: ""
        }
    };

    login = e  => {
    e.preventDefault();
    this.props.loginAsync();
};
    
    render() {
        return(
            <form>
                <div className="form-group">
                    <p>{this.props.UserInfo.UserId}</p>
                    
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Email*"
                        onChange={event=> this.setState({email: event.target.value})}
                    />
                </div>
                <div className="form-group">
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password*"
                        onChange={event=> this.setState({password: event.target.value})}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <button
                            name="submit"
                            className="btn btn-primary"
                            onClick={ e => this.login(e)}
                        >
                            Login
                        </button>
                    </p>
                </div>
            </form>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

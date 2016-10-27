import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';






class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      lock:null
    }


  }

  componentWillMount(){

    const options = {
  allowedConnections: ['twitter', 'facebook'],
  auth: {
     redirectUrl: 'https://nightlife-rustic.herokuapp.com/',
     responseType: 'token'
}
};



    const lock = new Auth0Lock( //initiates new lock. Passed down to header
        process.env.AUTH0_ID,
        process.env.AUTH0_DOMAIN,
        options
    );
     this.lock = lock;

    lock.on("authenticated", function(authResult) {

  // Use the token in authResult to getProfile() and save it to localStorage
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
    return console.log('problem authenticating user')
  }
      this.props.authSignin(profile.user_id,profile.name,profile.identities[0].provider)
      sessionStorage.setItem('name', profile.name.split(' ')[0]);
      const lastSearch = localStorage.getItem('searchValue');
      if(lastSearch){
        this.props.getSearchData(lastSearch);//this reactivates search query before login
              }

 }.bind(this));
}.bind(this));

this.setState({lock:this.lock})
  }


showLock(){
  this.state.lock.show();
}

signout(){
  this.props.signoutUser()
}

  render() {

if(this.props.auth){

  return(
    <div className="loginWrapper">
      <a id="lockLink" onClick={this.signout.bind(this)}>Log out</a>
      <img className="lockedImg" src="../../../style/img/padlock_locked.png" />
    </div>

  )
}
    return (
      <div className="loginWrapper">
        <a id="lockLink" onClick={this.showLock.bind(this)}>Login</a>
        <img className="unlockedImg" src="../../../style/img/padlock_unlocked.png" />
      </div>
    );
  }
}

export default connect(null,actions)(Login);

import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions';
import {connect} from 'react-redux';
import Footer from './footer';
import axios from 'axios';


class App extends Component {

  componentWillMount(){
  axios.get(`https://nightlife-server-rustic.herokuapp.com/visitvenue/array`)
  .then(response => {
    console.log('success')
  })
  .catch(() => {
    console.log('error firing server')
  })
  }


  render() {
    return (
      <div className="appContainer2">
        <div className="page-wrap">
      {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null,actions)(App);

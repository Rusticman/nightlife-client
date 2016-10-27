import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Homepage from '../components/homepage';
import SearchBar from '../components/search_bar';
import SearchResults from '../components/search_results';


class HomepageContainer extends Component{

componentWillMount(){
  this.props.moonChangeAction();//moves moon up to the heading
}

render(){

  return(
    <div className="homepageContainer">
    <Homepage moonChange={this.props.moonChange}
              moonColour={this.props.moonColour}
              auth={this.props.auth}
              loading={this.props.loading}
              searchData={this.props.searchData}
              getSearchData={this.props.getSearchData}
              moonColourBack={this.props.moonColourBack}
              moonColourForth={this.props.moonColourForth}
              yellowMoonChange={this.props.yellowMoonChange}
               />
    <SearchResults searchData={this.props.searchData}
                   venues={this.props.venues}
                   attendingArray={this.props.attendingArray}
                   auth={this.props.auth}
                   userConfirmingAttendance={this.props.userConfirmingAttendance}
                   error={this.props.error}
                    />
    </div>

  )
}


}

function mapStateToProps(state){
  return{
    moonChange:state.style.moonChange,
    auth:state.auth.authenticated,
    loading:state.style.loading,
    searchData:state.data.searchData,
    attendingArray:state.data.attendingArray,
    venues:state.data.venues,
    moonColour:state.style.moonColour,
    error:state.data.error,
    yellowMoonChange:state.style.yellowMoonChange
  }
}

export default connect(mapStateToProps,actions)(HomepageContainer);

import React, {Component} from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../actions';



class SearchBar extends Component{

handlePlaceSubmit(values){
 this.props.getSearchData(values.place);
 localStorage.setItem('searchValue',values.place);//so can reactivate search after login
 
 this.props.moonColourForth();


 setTimeout(() => this.props.moonColourBack(),2000);
}

render(){
const {handleSubmit} = this.props;

  return(
      <form className="searchForm" autoComplete="off" onSubmit={handleSubmit(this.handlePlaceSubmit.bind(this))}>
        <Field name="place" placeholder="find a place to howl tonight" type="text"  component="input" label="Place"/>
        <button action="submit" className="submitButton">submit</button>
      </form>
  )
}


}


export default reduxForm({
  form: 'searchBarForm'  // a unique identifier for this form
})(SearchBar)

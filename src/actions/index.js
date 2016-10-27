import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    MOON_CHANGE,
    MOON_COLOUR,
    AUTH_USER,
    UNAUTH_USER,
    LOADING,
    SEARCH_DATA,
    VENUES,
    ATTENDING_ARRAY,
    ERROR,
    YELLOW_MOON_CHANGE
} from './type';

const ROOT_URL = 'https://nightlife-server-rustic.herokuapp.com';

export function moonChangeAction() {
  return function(dispatch) {

  setTimeout(() => dispatch({
      type:MOON_CHANGE,
      payload:'moonUp'
  }),1500)
  }
}

export function authSignin(userID,name,provider){
  return function(dispatch){
    axios.post(`${ROOT_URL}/auth/signin`,{userID,name,provider})
    .then(response => {
      dispatch({type:AUTH_USER})
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('id',response.data.id);

    })
    .catch(error => {
      console.log(error)

    });
}
}

export function signoutUser() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('id');
  sessionStorage.removeItem('name');
  console.log('signed out!')
  return { type: UNAUTH_USER };
}


export function getSearchData(location){
return function(dispatch){
  axios.get(`${ROOT_URL}/yelp/${location}`)
  .then(response => {

    if(response.data.error){//if no search data, show user
     return dispatch({
       type:ERROR,
       payload:'There are no locations that match your search query. Please try again.'
     })
    }
    const attendingArray = response.data.venuesArray;
    const arrayOfVenues = response.data.data.businesses.map((business) => {
      return business.id
    })

    const newArray = [];
//need to create new array which compares the two arrats and finds attendance for each venue
arrayOfVenues.map((venue,i) => {//just names
newArray.push({venue:venue,attendance:0,visitors:[]})
return attendingArray.map((item) => {//array of objects from db
  if(item.venue === venue){
          newArray[i].visitors.push(item.user);
    return newArray[i].attendance = newArray[i].attendance + 1;
  }
})
})
    dispatch({
      type:ATTENDING_ARRAY,
      payload:newArray//new data holding who is visiting where
    })
    dispatch({
      type:SEARCH_DATA,
      payload:response.data.data.businesses
    })
    dispatch({
      type:VENUES,
      payload:arrayOfVenues
    })
    dispatch({
      type:ERROR,
      payload:''
    })

  })
  .catch(error => {
    console.log('yelp not working')
  })
}

}

export function loading(boolean){

  return{
    type:LOADING,
    payload:boolean
  }
}

export function moonColourBack(){
return function(dispatch){
  dispatch({
    type:MOON_COLOUR,
    payload:''
  })

  dispatch({
  type:YELLOW_MOON_CHANGE,
  payload:'noYellowMoon'
})
}

}


export function moonColourForth(){
  return function(dispatch){

    dispatch({
      type:MOON_COLOUR,
      payload:'moonOpaque'
    })
    dispatch({
    type:YELLOW_MOON_CHANGE,
    payload:'brightYellowMoon'
  })
  }
}

export function userConfirmingAttendance(boolean, attendingArray,index){
return function(dispatch){
  const i = Number(index);//change from string to number
  const id = sessionStorage.getItem('id');

  if(boolean){
      axios.post(`${ROOT_URL}/visitvenue`,{attendingArray:attendingArray,venue:attendingArray[i].venue,id:id},
        { headers: { authorization: sessionStorage.getItem('token') }})
      .then(response => {
        dispatch({
          type:ATTENDING_ARRAY,
          payload:response.data.data
        })
      })
      .catch(() => {
        console.error('failed to confirm attendance')
      })
  }
  else{
      axios.put(`${ROOT_URL}/deleteattendance`,{attendingArray:attendingArray,venue:attendingArray[i].venue,id:id},
      { headers: { authorization: sessionStorage.getItem('token') }})
      .then(response => {
          dispatch({
          type:ATTENDING_ARRAY,
          payload:response.data.data
        })
      })
      .catch(() => {
        console.error('failed to delete your attendance')
      })
  }


}


}

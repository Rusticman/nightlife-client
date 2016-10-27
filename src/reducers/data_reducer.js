import {
SEARCH_DATA,
VENUES,
ATTENDING_ARRAY,
ERROR
} from '../actions/type';

const INITIAL_STATE ={
  searchData:[],
  venues:[],
  attendingArray:[],
  error:''
}

export default function(state = INITIAL_STATE,action){
  switch(action.type){
    case SEARCH_DATA:
        return { ...state, searchData:action.payload}
    case VENUES:
        return {...state, venues:action.payload}
    case ATTENDING_ARRAY:
        return {...state, attendingArray:action.payload}
    case ERROR:
        return {...state, error:action.payload}
  }
 return state;
}

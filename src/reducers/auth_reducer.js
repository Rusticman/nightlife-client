import {
  AUTH_USER,
  UNAUTH_USER
} from '../actions/type';

const INITIAL_STATE ={
  authenticated:false
}

export default function(state = INITIAL_STATE,action){
  switch(action.type){
    case AUTH_USER:
        return { ...state, authenticated:true}

    case UNAUTH_USER:
        return { ...state, authenticated:false }

  }
 return state;
}

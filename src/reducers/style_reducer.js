import {
MOON_CHANGE,
LOADING,
MOON_COLOUR,
YELLOW_MOON_CHANGE
} from '../actions/type';

const INITIAL_STATE = {
                      moonChange:'moonDown',
                      loading:'false',
                      moonColour:'',
                      yellowMoonChange:'noYellowMoon'
                    };
export default function(state = INITIAL_STATE,action){
  switch(action.type){
    case MOON_CHANGE:
        return { ...state,moonChange:action.payload}

    case LOADING:
        return {...state, loading:action.payload}

    case MOON_COLOUR:
        return {...state, moonColour:action.payload}

    case YELLOW_MOON_CHANGE:
        return {...state, yellowMoonChange:action.payload}

      }
 return state;
}

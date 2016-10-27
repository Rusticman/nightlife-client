import { combineReducers } from 'redux';
import styleReducer from './style_reducer';
import authReducer from './auth_reducer';
import dataReducer from './data_reducer';
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
style:styleReducer,
form:formReducer,
auth:authReducer,
data:dataReducer
});

export default rootReducer;

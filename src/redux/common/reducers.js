import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  form: formReducer // Mounted at 'form'
};

const rootReducer = combineReducers(reducers);

export default rootReducer
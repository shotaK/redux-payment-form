import {combineReducers} from 'redux';
import articles from '../article/article.reducer';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  articles,
  form: formReducer // Mounted at 'form'
};

const rootReducer = combineReducers(reducers);

export default rootReducer
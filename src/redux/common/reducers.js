import {combineReducers} from 'redux';
import articles from '../article/article.reducer';

const rootReducer = combineReducers({
  articles
});

export default rootReducer
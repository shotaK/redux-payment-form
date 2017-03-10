import { ADD_ARTICLE, REMOVE_ARTICLE } from './article.actions';

const articles = (state = {wasAdded: false, text: ''}, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return {
        ...state,
        wasAdded: true,
        text: action.text
      };
    case REMOVE_ARTICLE:
      return {
        ...state,
        wasAdded: false,
        text: ''
      };
    default:
      return state
  }
};

export default articles;
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

export const addArticle = text => ({
  type: ADD_ARTICLE,
  text
});

export const removeArticle = text => ({
  type: REMOVE_ARTICLE,
});